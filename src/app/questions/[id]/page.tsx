"use client";

import { useEffect, useState, useRef } from "react";
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
} from "lucide-react";

interface Question {
	_id: string;
	title: string;
	description: string;
	difficulty?: string;
}

export default function QuestionPage() {
	const [question, setQuestion] = useState<Question | null>(null);
	const [code, setCode] = useState("/* Write your CSS here */\n\n");
	const [isRunning, setIsRunning] = useState(false);
	const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
		"desktop"
	);
	const [theme, setTheme] = useState<"light" | "dark">("dark");
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const params = useParams();
	const { id } = params;

	useEffect(() => {
		if (id) {
			const fetchQuestion = async () => {
				try {
					const res = await fetch(
						`http://localhost:5000/questions/id/${id}`
					);
					const data = await res.json();
					setQuestion(data);
				} catch (error) {
					console.error("Error fetching question:", error);
				}
			};

			fetchQuestion();
		}
	}, [id]);

	const runCode = async () => {
		setIsRunning(true);

		// Simulate loading time for better UX
		await new Promise((resolve) => setTimeout(resolve, 500));

		if (iframeRef.current) {
			const iframe = iframeRef.current;
			const document = iframe.contentDocument;
			if (document) {
				const styleElement = document.createElement("style");
				styleElement.innerHTML = code;
				document.head.innerHTML = "";
				document.head.appendChild(styleElement);
				document.body.innerHTML =
					'<div class="centered">Centered Div</div>';
			}
		}

		setIsRunning(false);
	};

	const resetCode = () => {
		setCode("/* Write your CSS here */\n\n");
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
			<div className="container mx-auto px-6 py-6">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
					{/* Left Panel - Problem Description */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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

						{/* Code Editor */}
						<div className="flex-1 flex flex-col">
							<div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-4">
										<h3 className="font-semibold text-gray-900">
											CSS Editor
										</h3>
										<div className="flex items-center space-x-2">
											<button
												onClick={() =>
													setTheme(
														theme === "light"
															? "dark"
															: "light"
													)
												}
												className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded-md transition-colors">
												{theme === "light"
													? "Dark"
													: "Light"}{" "}
												Mode
											</button>
										</div>
									</div>
									<div className="flex items-center space-x-2">
										<button
											onClick={resetCode}
											className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
											title="Reset Code">
											<RotateCcw className="w-4 h-4 text-gray-600" />
										</button>
									</div>
								</div>
							</div>
							<div
								className="flex-1 min-h-0"
								style={{
									minHeight: 0,
									display: "flex",
									flexDirection: "column",
								}}>
								<Editor
									height="350px"
									language="css"
									value={code}
									onChange={(value) => setCode(value || "")}
									theme={
										theme === "dark" ? "vs-dark" : "light"
									}
									options={{
										minimap: { enabled: false },
										fontSize: 14,
										lineNumbers: "on",
										roundedSelection: false,
										scrollBeyondLastLine: false,
										automaticLayout: true,
										padding: { top: 16, bottom: 16 },
										fontFamily:
											'Monaco, Menlo, "Ubuntu Mono", monospace',
										wordWrap: "on",
										tabSize: 2,
										insertSpaces: true,
										selectOnLineNumbers: true,
										readOnly: false,
									}}
								/>
							</div>
						</div>
					</div>

					{/* Right Panel - Output */}
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

						<div className="flex-1 p-6 bg-gray-50 flex items-center justify-center">
							<div
								className={`bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 ${getViewModeWidth()}`}>
								<iframe
									ref={iframeRef}
									className="w-full h-96 rounded-lg"
									title="output"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Action Bar */}
				<div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<button
								onClick={runCode}
								disabled={isRunning}
								className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
									isRunning
										? "bg-gray-100 text-gray-400 cursor-not-allowed"
										: "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
								}`}>
								{isRunning ? (
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
								<span className="text-gray-700">Submit</span>
							</button>
						</div>

						<div className="flex items-center space-x-4 text-sm text-gray-500">
							<div className="flex items-center space-x-2">
								<CheckCircle className="w-4 h-4 text-emerald-500" />
								<span>Tests: 0 / 3</span>
							</div>
							<div className="flex items-center space-x-2">
								<Clock className="w-4 h-4" />
								<span>Runtime: --</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
