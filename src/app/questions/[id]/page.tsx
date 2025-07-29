"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Editor from "@monaco-editor/react";
import {
	Play,
	RotateCcw,
	Save,
	Share2,
	BookOpen,
	Clock,
	Target,
	CheckCircle,
	XCircle,
	ArrowLeft,
	Monitor,
	Smartphone,
	Tablet,
	Settings,
	ZoomIn,
	ZoomOut,
	Copy,
	Download,
	Upload,
	Maximize,
	Minimize,
	Eye,
	EyeOff,
	Sparkles,
} from "lucide-react";

interface Question {
	_id: string;
	title: string;
	description: string;
	difficulty?: string;
	baseCode?: string;
	category?: string;
}

interface EditorSettings {
	fontSize: number;
	tabSize: number;
	wordWrap: boolean;
	minimap: boolean;
	lineNumbers: boolean;
	autoComplete: boolean;
	formatOnType: boolean;
	formatOnPaste: boolean;
}

export default function QuestionPage() {
	const [question, setQuestion] = useState<Question | null>(null);
	const [code, setCode] = useState(`/* Write your CSS here */

/* Example: Center a div */
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
  color: #333;
}`);
	const [isRunning, setIsRunning] = useState(false);
	const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
		"desktop"
	);
	const [theme, setTheme] = useState<"light" | "dark">("dark");
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const [showPreview, setShowPreview] = useState(true);
	const [editorSettings, setEditorSettings] = useState<EditorSettings>({
		fontSize: 14,
		tabSize: 2,
		wordWrap: true,
		minimap: false,
		lineNumbers: true,
		autoComplete: true,
		formatOnType: true,
		formatOnPaste: true,
	});

	const [errors, setErrors] = useState<string[]>([]);
	const [isEditorReady, setIsEditorReady] = useState(false);
	const [aiFeedback, setAiFeedback] = useState<string | null>(null);
	const [isAiLoading, setIsAiLoading] = useState(false);
	const [language, setLanguage] = useState("css");
	const editorRef = useRef<any>(null);
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const params = useParams();
	const { id } = params;

	// Auto-save functionality
	useEffect(() => {
		const savedCode = localStorage.getItem(`css-editor-${id}`);
		if (savedCode) {
			setCode(savedCode);
		}
	}, [id]);

	useEffect(() => {
		if (code && id) {
			const timeoutId = setTimeout(() => {
				localStorage.setItem(`css-editor-${id}`, code);
			}, 1000);
			return () => clearTimeout(timeoutId);
		}
	}, [code, id]);

	// Fetch question data
	useEffect(() => {
		if (id) {
			const fetchQuestion = async () => {
				try {
					const res = await fetch(`/api/questions/${id}`);
					const data = await res.json();
					setQuestion(data);
					if (data.baseCode) {
						setCode(data.baseCode);
					}
					if (data.category) {
						setLanguage(data.category);
					}
				} catch (error) {
					console.error("Error fetching question:", error);
				}
			};
			fetchQuestion();
		}
	}, [id]);

	// Enhanced Monaco Editor setup
	const handleEditorDidMount = (editor: any, monaco: any) => {
		editorRef.current = editor;
		setIsEditorReady(true);
	};

	

	const runCode = useCallback(async () => {
		setIsRunning(true);
		setAiFeedback(null);
		await new Promise((resolve) => setTimeout(resolve, 300));

		if (iframeRef.current) {
			const iframe = iframeRef.current;
			const document = iframe.contentDocument;
			if (document) {
				// Enhanced HTML template
				const htmlTemplate = `
					<!DOCTYPE html>
					<html lang="en">
					<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<title>CSS Preview</title>
						<style>
							* { margin: 0; padding: 0; box-sizing: border-box; }
							body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
							${code}
						</style>
					</head>
					<body>
						<div class="centered">
							<h2>Centered Content</h2>
							<p>This content should be centered based on your CSS.</p>
							<div class="sample-box" style="width: 100px; height: 100px; background: #3b82f6; margin: 20px auto; border-radius: 8px;"></div>
						</div>
					</body>
					</html>
				`;

				document.open();
				document.write(htmlTemplate);
				document.close();
			}
		}

		if (question) {
			setIsAiLoading(true);
			try {
				const res = await fetch(
					"http://localhost:5000/questions/api/analyze",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							title: question.title,
							description: question.description,
							code,
						}),
					}
				);
				const data = await res.json();
				setAiFeedback(data.analysis);
			} catch (error) {
				console.error("Error getting AI feedback:", error);
				setAiFeedback(
					"An error occurred while analyzing the code."
				);
			} finally {
				setIsAiLoading(false);
			}
		}

		setIsRunning(false);
	}, [code, question]);

	const resetCode = () => {
		const defaultCode = `/* Write your CSS here */

/* Example: Center a div */
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
  color: #333;
}`;
		setCode(defaultCode);
	};

	const formatCode = () => {
		if (editorRef.current) {
			editorRef.current.getAction("editor.action.formatDocument").run();
		}
	};

	const copyCode = async () => {
		try {
			await navigator.clipboard.writeText(code);
			// You could add a toast notification here
		} catch (err) {
			console.error("Failed to copy code:", err);
		}
	};

	const downloadCode = () => {
		const blob = new Blob([code], { type: "text/css" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${question?.title || "styles"}.css`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file && file.type === "text/css") {
			const reader = new FileReader();
			reader.onload = (e) => {
				const content = e.target?.result as string;
				setCode(content);
			};
			reader.readAsText(file);
		}
	};

	const changeFontSize = (delta: number) => {
		setEditorSettings((prev) => ({
			...prev,
			fontSize: Math.max(10, Math.min(24, prev.fontSize + delta)),
		}));
	};

	const updateSetting = <K extends keyof EditorSettings>(
		key: K,
		value: EditorSettings[K]
	) => {
		setEditorSettings((prev) => ({ ...prev, [key]: value }));
	};

	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty?.toLowerCase()) {
			case "easy":
				return "text-emerald-600 bg-emerald-50 border-emerald-200";
			case "medium":
				return "text-amber-600 bg-amber-50 border-amber-200";
			case "hard":
				return "text-red-600 bg-red-50 border-red-200";
			default:
				return "text-gray-600 bg-gray-50 border-gray-200";
		}
	};

	const getViewModeWidth = () => {
		switch (viewMode) {
			case "mobile":
				return "w-80";
			case "tablet":
				return "w-[768px]";
			case "desktop":
			default:
				return "w-full";
		}
	};

	if (!question) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading question...</p>
				</div>
			</div>
		);
	}

	const editorLayout = isFullscreen ? "fixed inset-0 z-50 bg-white" : "";
	const gridLayout = isFullscreen
		? "h-screen"
		: showPreview
		? "grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]"
		: "flex flex-col h-[calc(100vh-200px)]";

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
			{/* Header */}
			<div className="bg-white shadow-sm border-b border-gray-200">
				<div className="container mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
								<ArrowLeft className="w-5 h-5 text-gray-600" />
							</button>
							<div className="flex items-center space-x-3">
								<div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
									<BookOpen className="w-5 h-5 text-white" />
								</div>
								<div>
									<h1 className="text-2xl font-bold text-gray-900">
										{question.title}
									</h1>
									<div className="flex items-center space-x-3 mt-1">
										{question.difficulty && (
											<span
												className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
													question.difficulty
												)}`}>
												{question.difficulty}
											</span>
										)}
										<div className="flex items-center space-x-1 text-xs text-gray-500">
											<Clock className="w-3 h-3" />
											<span>Est. 15 min</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="flex items-center space-x-2">
							<button
								onClick={() => setShowPreview(!showPreview)}
								className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
								title={
									showPreview
										? "Hide Preview"
										: "Show Preview"
								}>
								{showPreview ? (
									<EyeOff className="w-5 h-5 text-gray-600" />
								) : (
									<Eye className="w-5 h-5 text-gray-600" />
								)}
							</button>
							<button
								onClick={() => setIsFullscreen(!isFullscreen)}
								className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
								title={
									isFullscreen
										? "Exit Fullscreen"
										: "Enter Fullscreen"
								}>
								{isFullscreen ? (
									<Minimize className="w-5 h-5 text-gray-600" />
								) : (
									<Maximize className="w-5 h-5 text-gray-600" />
								)}
							</button>
							<button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
								<Save className="w-5 h-5 text-gray-600" />
							</button>
							<button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
								<Share2 className="w-5 h-5 text-gray-600" />
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className={`container mx-auto px-6 py-6 ${editorLayout}`}>
				<div className={gridLayout}>
					{/* Left Panel - Problem Description & Editor */}
					<div
						className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${
							!showPreview && !isFullscreen ? "col-span-2" : ""
						}`}>
						{!isFullscreen && (
							<div className="p-6 border-b border-gray-200">
								<h2 className="text-lg font-semibold text-gray-900 mb-4">
									Problem Description
								</h2>
								<div className="prose prose-sm max-w-none">
									<p className="text-gray-700 leading-relaxed">
										{question.description}
									</p>
								</div>
							</div>
						)}

						{/* Enhanced Code Editor */}
						<div className="flex-1 flex flex-col">
							<div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
								<div className="flex items-center justify-between flex-wrap gap-2">
									<div className="flex items-center space-x-4">
										<h3 className="font-semibold text-gray-900">
											{language.toUpperCase()} Editor
										</h3>
										{errors.length > 0 && (
											<span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
												{errors.length} error
												{errors.length > 1 ? "s" : ""}
											</span>
										)}
									</div>
									<div className="flex items-center space-x-2 flex-wrap">
										<button
											onClick={() => changeFontSize(-1)}
											className="p-1 hover:bg-gray-200 rounded transition-colors"
											title="Decrease Font Size">
											<ZoomOut className="w-4 h-4 text-gray-600" />
										</button>
										<span className="text-xs text-gray-600 min-w-[2rem] text-center">
											{editorSettings.fontSize}px
										</span>
										<button
											onClick={() => changeFontSize(1)}
											className="p-1 hover:bg-gray-200 rounded transition-colors"
											title="Increase Font Size">
											<ZoomIn className="w-4 h-4 text-gray-600" />
										</button>
										<div className="w-px h-4 bg-gray-300 mx-2"></div>
										<button
											onClick={formatCode}
											className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
											title="Format Code (Ctrl+Shift+F)">
											Format
										</button>
										<button
											onClick={copyCode}
											className="p-1 hover:bg-gray-200 rounded transition-colors"
											title="Copy Code">
											<Copy className="w-4 h-4 text-gray-600" />
										</button>
										<button
											onClick={downloadCode}
											className="p-1 hover:bg-gray-200 rounded transition-colors"
											title="Download CSS">
											<Download className="w-4 h-4 text-gray-600" />
										</button>
										<label
											className="p-1 hover:bg-gray-200 rounded transition-colors cursor-pointer"
											title="Upload CSS">
											<Upload className="w-4 h-4 text-gray-600" />
											<input
												type="file"
												accept=".css"
												onChange={handleFileUpload}
												className="hidden"
											/>
										</label>
										<button
											onClick={() =>
												setShowSettings(!showSettings)
											}
											className="p-1 hover:bg-gray-200 rounded transition-colors"
											title="Editor Settings">
											<Settings className="w-4 h-4 text-gray-600" />
										</button>
										<button
											onClick={() =>
												setTheme(
													theme === "light"
														? "dark"
														: "light"
												)
											}
											className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors">
											{theme === "light"
												? "Dark"
												: "Light"}
										</button>
										<button
											onClick={resetCode}
											className="p-1 hover:bg-gray-200 rounded transition-colors"
											title="Reset Code">
											<RotateCcw className="w-4 h-4 text-gray-600" />
										</button>
									</div>
								</div>

								{/* Settings Panel */}
								{showSettings && (
									<div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
										<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
											<label className="flex items-center space-x-2">
												<input
													type="checkbox"
													checked={
														editorSettings.wordWrap
													}
													onChange={(e) =>
														updateSetting(
															"wordWrap",
															e.target.checked
														)
													}
												/>
												<span>Word Wrap</span>
											</label>
											<label className="flex items-center space-x-2">
												<input
													type="checkbox"
													checked={
														editorSettings.minimap
													}
													onChange={(e) =>
														updateSetting(
															"minimap",
															e.target.checked
														)
													}
												/>
												<span>Minimap</span>
											</label>
											<label className="flex items-center space-x-2">
												<input
													type="checkbox"
													checked={
														editorSettings.lineNumbers
													}
													onChange={(e) =>
														updateSetting(
															"lineNumbers",
															e.target.checked
														)
													}
												/>
												<span>Line Numbers</span>
											</label>
											<label className="flex items-center space-x-2">
												<input
													type="checkbox"
													checked={
														editorSettings.formatOnType
													}
													onChange={(e) =>
														updateSetting(
															"formatOnType",
															e.target.checked
														)
													}
												/>
												<span>Format on Type</span>
											</label>
											<label className="flex items-center space-x-2">
												<span>Tab Size:</span>
												<select
													value={
														editorSettings.tabSize
													}
													onChange={(e) =>
														updateSetting(
															"tabSize",
															parseInt(
																e.target.value
															)
														)
													}
													className="border border-gray-300 rounded px-2 py-1">
													<option value={2}>2</option>
													<option value={4}>4</option>
													<option value={8}>8</option>
												</select>
											</label>
										</div>
									</div>
								)}

								
							</div>

				<div
					className="w-full"
					style={{ minHeight: isFullscreen ? "500px" : "400px", height: isFullscreen ? "500px" : "400px" }}>
					<Editor
						height={isFullscreen ? "500px" : "400px"}
						language={language}
						value={code}
						onChange={(value) => setCode(value || "")}
						onMount={handleEditorDidMount}
						theme={theme === "dark" ? "vs-dark" : "light"}
									options={{
										minimap: {
											enabled: editorSettings.minimap,
										},
										fontSize: editorSettings.fontSize,
										lineNumbers: editorSettings.lineNumbers
											? "on"
											: "off",
										roundedSelection: false,
										scrollBeyondLastLine: false,
										automaticLayout: true,
										padding: { top: 16, bottom: 16 },
										fontFamily:
											'Monaco, Menlo, "Ubuntu Mono", monospace',
										wordWrap: editorSettings.wordWrap
											? "on"
											: "off",
										tabSize: editorSettings.tabSize,
										insertSpaces: true,
										selectOnLineNumbers: true,
										readOnly: false,
										suggestOnTriggerCharacters:
											editorSettings.autoComplete,
										quickSuggestions:
											editorSettings.autoComplete,
										formatOnType:
											editorSettings.formatOnType,
										formatOnPaste:
											editorSettings.formatOnPaste,
										mouseWheelZoom: true,
										smoothScrolling: true,
										cursorBlinking: "smooth",
										cursorSmoothCaretAnimation: "on",
									}}
								/>
							</div>
						</div>
					</div>

					{/* Right Panel - Output */}
					{showPreview && (
						<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
							<div className="p-6 border-b border-gray-200">
								<div className="flex items-center justify-between">
									<h2 className="text-lg font-semibold text-gray-900">
										Preview
									</h2>
									<div className="flex items-center space-x-2">
										<div className="flex items-center bg-gray-100 rounded-lg p-1">
											<button
												onClick={() =>
													setViewMode("desktop")
												}
												className={`p-2 rounded-md transition-colors ${
													viewMode === "desktop"
														? "bg-white shadow-sm"
														: "hover:bg-gray-200"
												}`}
												title="Desktop View">
												<Monitor className="w-4 h-4 text-gray-600" />
											</button>
											<button
												onClick={() =>
													setViewMode("tablet")
												}
												className={`p-2 rounded-md transition-colors ${
													viewMode === "tablet"
														? "bg-white shadow-sm"
														: "hover:bg-gray-200"
												}`}
												title="Tablet View">
												<Tablet className="w-4 h-4 text-gray-600" />
											</button>
											<button
												onClick={() =>
													setViewMode("mobile")
												}
												className={`p-2 rounded-md transition-colors ${
													viewMode === "mobile"
														? "bg-white shadow-sm"
														: "hover:bg-gray-200"
												}`}
												title="Mobile View">
												<Smartphone className="w-4 h-4 text-gray-600" />
											</button>
										</div>
									</div>
								</div>
							</div>

							<div className="flex-1 p-6 bg-gray-50 flex items-center justify-center overflow-auto">
								<div
									className={`bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 ${getViewModeWidth()}`}>
									<iframe
										ref={iframeRef}
										className="w-full h-96 rounded-lg"
										title="CSS Preview"
									/>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Enhanced Action Bar */}
				{!isFullscreen && (
					<div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
						<div className="flex items-center justify-between flex-wrap gap-4">
							<div className="flex items-center space-x-4">
								<button
									onClick={runCode}
									disabled={isRunning}
									className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
										isRunning || isAiLoading
											? "bg-gray-100 text-gray-400 cursor-not-allowed"
											: "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
									}`}
									title="Run Code (Ctrl+Enter)">
									{isAiLoading ? (
										<>
											<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
											<span>Analyzing...</span>
										</>
									) : isRunning ? (
										<>
											<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
											<span>Running...</span>
										</>
									) : (
										<>
											<Play className="w-4 h-4" />
											<span>Run Code</span>
										</>
									)}
								</button>
								<button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
									<Target className="w-4 h-4 text-gray-600" />
									<span className="text-gray-700">
										Submit
									</span>
								</button>
								
							</div>

							<div className="flex items-center space-x-4 text-sm text-gray-500">
								<div className="flex items-center space-x-2">
									{errors.length > 0 ? (
										<XCircle className="w-4 h-4 text-red-500" />
									) : (
										<CheckCircle className="w-4 h-4 text-emerald-500" />
									)}
									<span>
										{errors.length > 0
											? `${errors.length} error${
													errors.length > 1 ? "s" : ""
											  }`
											: "No errors"}
									</span>
								</div>
								<div className="flex items-center space-x-2">
									<Clock className="w-4 h-4" />
									<span>Auto-saved</span>
								</div>
							</div>
						</div>
					</div>
				)}

				{aiFeedback && (
					<div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
						<h3 className="text-lg font-semibold text-gray-900 mb-2">AI Feedback</h3>
						<div className="prose prose-sm max-w-none text-gray-700">
							{aiFeedback}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
