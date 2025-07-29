"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Editor from "@monaco-editor/react";
import { Play, RotateCcw, Save, Share2, BookOpen, Clock, Target, CheckCircle, XCircle, ArrowLeft, Monitor, Smartphone, Tablet, Settings, ZoomIn, ZoomOut, Copy, Download, Upload, Maximize, Minimize, Eye, EyeOff, } from "lucide-react";
export default function QuestionPage() {
    var _this = this;
    var _a = useState(null), question = _a[0], setQuestion = _a[1];
    var _b = useState("/* Write your CSS here */\n\n/* Example: Center a div */\n.centered {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  background-color: #f0f0f0;\n  font-family: Arial, sans-serif;\n  color: #333;\n}"), code = _b[0], setCode = _b[1];
    var _c = useState(false), isRunning = _c[0], setIsRunning = _c[1];
    var _d = useState("desktop"), viewMode = _d[0], setViewMode = _d[1];
    var _e = useState("dark"), theme = _e[0], setTheme = _e[1];
    var _f = useState(false), isFullscreen = _f[0], setIsFullscreen = _f[1];
    var _g = useState(false), showSettings = _g[0], setShowSettings = _g[1];
    var _h = useState(true), showPreview = _h[0], setShowPreview = _h[1];
    var _j = useState({
        fontSize: 14,
        tabSize: 2,
        wordWrap: true,
        minimap: false,
        lineNumbers: true,
        autoComplete: true,
        formatOnType: true,
        formatOnPaste: true,
    }), editorSettings = _j[0], setEditorSettings = _j[1];
    var _k = useState([]), errors = _k[0], setErrors = _k[1];
    var _l = useState(false), isEditorReady = _l[0], setIsEditorReady = _l[1];
    var _m = useState(null), aiFeedback = _m[0], setAiFeedback = _m[1];
    var _o = useState(false), isAiLoading = _o[0], setIsAiLoading = _o[1];
    var _p = useState("css"), language = _p[0], setLanguage = _p[1];
    var editorRef = useRef(null);
    var iframeRef = useRef(null);
    var params = useParams();
    var id = params.id;
    // Auto-save functionality
    useEffect(function () {
        var savedCode = localStorage.getItem("css-editor-".concat(id));
        if (savedCode) {
            setCode(savedCode);
        }
    }, [id]);
    useEffect(function () {
        if (code && id) {
            var timeoutId_1 = setTimeout(function () {
                localStorage.setItem("css-editor-".concat(id), code);
            }, 1000);
            return function () { return clearTimeout(timeoutId_1); };
        }
    }, [code, id]);
    // Fetch question data
    useEffect(function () {
        if (id) {
            var fetchQuestion = function () { return __awaiter(_this, void 0, void 0, function () {
                var res, data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, fetch("http://localhost:5000/questions/id/".concat(id))];
                        case 1:
                            res = _a.sent();
                            return [4 /*yield*/, res.json()];
                        case 2:
                            data = _a.sent();
                            setQuestion(data);
                            if (data.baseCode) {
                                setCode(data.baseCode);
                            }
                            if (data.category) {
                                setLanguage(data.category);
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            console.error("Error fetching question:", error_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); };
            fetchQuestion();
        }
    }, [id]);
    // Enhanced Monaco Editor setup
    var handleEditorDidMount = function (editor, monaco) {
        editorRef.current = editor;
        setIsEditorReady(true);
    };
    var runCode = useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var iframe, document_1, htmlTemplate, res, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsRunning(true);
                    setAiFeedback(null);
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 300); })];
                case 1:
                    _a.sent();
                    if (iframeRef.current) {
                        iframe = iframeRef.current;
                        document_1 = iframe.contentDocument;
                        if (document_1) {
                            htmlTemplate = "\n\t\t\t\t\t<!DOCTYPE html>\n\t\t\t\t\t<html lang=\"en\">\n\t\t\t\t\t<head>\n\t\t\t\t\t\t<meta charset=\"UTF-8\">\n\t\t\t\t\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n\t\t\t\t\t\t<title>CSS Preview</title>\n\t\t\t\t\t\t<style>\n\t\t\t\t\t\t\t* { margin: 0; padding: 0; box-sizing: border-box; }\n\t\t\t\t\t\t\tbody { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }\n\t\t\t\t\t\t\t".concat(code, "\n\t\t\t\t\t\t</style>\n\t\t\t\t\t</head>\n\t\t\t\t\t<body>\n\t\t\t\t\t\t<div class=\"centered\">\n\t\t\t\t\t\t\t<h2>Centered Content</h2>\n\t\t\t\t\t\t\t<p>This content should be centered based on your CSS.</p>\n\t\t\t\t\t\t\t<div class=\"sample-box\" style=\"width: 100px; height: 100px; background: #3b82f6; margin: 20px auto; border-radius: 8px;\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</body>\n\t\t\t\t\t</html>\n\t\t\t\t");
                            document_1.open();
                            document_1.write(htmlTemplate);
                            document_1.close();
                        }
                    }
                    if (!question) return [3 /*break*/, 7];
                    setIsAiLoading(true);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, 6, 7]);
                    return [4 /*yield*/, fetch("http://localhost:5000/questions/api/analyze", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                title: question.title,
                                description: question.description,
                                code: code,
                            }),
                        })];
                case 3:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 4:
                    data = _a.sent();
                    setAiFeedback(data.analysis);
                    return [3 /*break*/, 7];
                case 5:
                    error_2 = _a.sent();
                    console.error("Error getting AI feedback:", error_2);
                    setAiFeedback("An error occurred while analyzing the code.");
                    return [3 /*break*/, 7];
                case 6:
                    setIsAiLoading(false);
                    return [7 /*endfinally*/];
                case 7:
                    setIsRunning(false);
                    return [2 /*return*/];
            }
        });
    }); }, [code, question]);
    var resetCode = function () {
        var defaultCode = "/* Write your CSS here */\n\n/* Example: Center a div */\n.centered {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  background-color: #f0f0f0;\n  font-family: Arial, sans-serif;\n  color: #333;\n}";
        setCode(defaultCode);
    };
    var formatCode = function () {
        if (editorRef.current) {
            editorRef.current.getAction("editor.action.formatDocument").run();
        }
    };
    var copyCode = function () { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, navigator.clipboard.writeText(code)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error("Failed to copy code:", err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var downloadCode = function () {
        var blob = new Blob([code], { type: "text/css" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "".concat((question === null || question === void 0 ? void 0 : question.title) || "styles", ".css");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    var handleFileUpload = function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file && file.type === "text/css") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                var content = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                setCode(content);
            };
            reader.readAsText(file);
        }
    };
    var changeFontSize = function (delta) {
        setEditorSettings(function (prev) { return (__assign(__assign({}, prev), { fontSize: Math.max(10, Math.min(24, prev.fontSize + delta)) })); });
    };
    var updateSetting = function (key, value) {
        setEditorSettings(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[key] = value, _a)));
        });
    };
    var getDifficultyColor = function (difficulty) {
        switch (difficulty === null || difficulty === void 0 ? void 0 : difficulty.toLowerCase()) {
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
    var getViewModeWidth = function () {
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
        return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading question...</p>
				</div>
			</div>);
    }
    var editorLayout = isFullscreen ? "fixed inset-0 z-50 bg-white" : "";
    var gridLayout = isFullscreen
        ? "h-screen"
        : showPreview
            ? "grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]"
            : "flex flex-col h-[calc(100vh-200px)]";
    return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
			{/* Header */}
			<div className="bg-white shadow-sm border-b border-gray-200">
				<div className="container mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
								<ArrowLeft className="w-5 h-5 text-gray-600"/>
							</button>
							<div className="flex items-center space-x-3">
								<div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
									<BookOpen className="w-5 h-5 text-white"/>
								</div>
								<div>
									<h1 className="text-2xl font-bold text-gray-900">
										{question.title}
									</h1>
									<div className="flex items-center space-x-3 mt-1">
										{question.difficulty && (<span className={"px-2 py-1 rounded-full text-xs font-medium border ".concat(getDifficultyColor(question.difficulty))}>
												{question.difficulty}
											</span>)}
										<div className="flex items-center space-x-1 text-xs text-gray-500">
											<Clock className="w-3 h-3"/>
											<span>Est. 15 min</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="flex items-center space-x-2">
							<button onClick={function () { return setShowPreview(!showPreview); }} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title={showPreview
            ? "Hide Preview"
            : "Show Preview"}>
								{showPreview ? (<EyeOff className="w-5 h-5 text-gray-600"/>) : (<Eye className="w-5 h-5 text-gray-600"/>)}
							</button>
							<button onClick={function () { return setIsFullscreen(!isFullscreen); }} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title={isFullscreen
            ? "Exit Fullscreen"
            : "Enter Fullscreen"}>
								{isFullscreen ? (<Minimize className="w-5 h-5 text-gray-600"/>) : (<Maximize className="w-5 h-5 text-gray-600"/>)}
							</button>
							<button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
								<Save className="w-5 h-5 text-gray-600"/>
							</button>
							<button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
								<Share2 className="w-5 h-5 text-gray-600"/>
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className={"container mx-auto px-6 py-6 ".concat(editorLayout)}>
				<div className={gridLayout}>
					{/* Left Panel - Problem Description & Editor */}
					<div className={"bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ".concat(!showPreview && !isFullscreen ? "col-span-2" : "")}>
						{!isFullscreen && (<div className="p-6 border-b border-gray-200">
								<h2 className="text-lg font-semibold text-gray-900 mb-4">
									Problem Description
								</h2>
								<div className="prose prose-sm max-w-none">
									<p className="text-gray-700 leading-relaxed">
										{question.description}
									</p>
								</div>
							</div>)}

						{/* Enhanced Code Editor */}
						<div className="flex-1 flex flex-col">
							<div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
								<div className="flex items-center justify-between flex-wrap gap-2">
									<div className="flex items-center space-x-4">
										<h3 className="font-semibold text-gray-900">
											{language.toUpperCase()} Editor
										</h3>
										{errors.length > 0 && (<span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
												{errors.length} error
												{errors.length > 1 ? "s" : ""}
											</span>)}
									</div>
									<div className="flex items-center space-x-2 flex-wrap">
										<button onClick={function () { return changeFontSize(-1); }} className="p-1 hover:bg-gray-200 rounded transition-colors" title="Decrease Font Size">
											<ZoomOut className="w-4 h-4 text-gray-600"/>
										</button>
										<span className="text-xs text-gray-600 min-w-[2rem] text-center">
											{editorSettings.fontSize}px
										</span>
										<button onClick={function () { return changeFontSize(1); }} className="p-1 hover:bg-gray-200 rounded transition-colors" title="Increase Font Size">
											<ZoomIn className="w-4 h-4 text-gray-600"/>
										</button>
										<div className="w-px h-4 bg-gray-300 mx-2"></div>
										<button onClick={formatCode} className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors" title="Format Code (Ctrl+Shift+F)">
											Format
										</button>
										<button onClick={copyCode} className="p-1 hover:bg-gray-200 rounded transition-colors" title="Copy Code">
											<Copy className="w-4 h-4 text-gray-600"/>
										</button>
										<button onClick={downloadCode} className="p-1 hover:bg-gray-200 rounded transition-colors" title="Download CSS">
											<Download className="w-4 h-4 text-gray-600"/>
										</button>
										<label className="p-1 hover:bg-gray-200 rounded transition-colors cursor-pointer" title="Upload CSS">
											<Upload className="w-4 h-4 text-gray-600"/>
											<input type="file" accept=".css" onChange={handleFileUpload} className="hidden"/>
										</label>
										<button onClick={function () {
            return setShowSettings(!showSettings);
        }} className="p-1 hover:bg-gray-200 rounded transition-colors" title="Editor Settings">
											<Settings className="w-4 h-4 text-gray-600"/>
										</button>
										<button onClick={function () {
            return setTheme(theme === "light"
                ? "dark"
                : "light");
        }} className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors">
											{theme === "light"
            ? "Dark"
            : "Light"}
										</button>
										<button onClick={resetCode} className="p-1 hover:bg-gray-200 rounded transition-colors" title="Reset Code">
											<RotateCcw className="w-4 h-4 text-gray-600"/>
										</button>
									</div>
								</div>

								{/* Settings Panel */}
								{showSettings && (<div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
										<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
											<label className="flex items-center space-x-2">
												<input type="checkbox" checked={editorSettings.wordWrap} onChange={function (e) {
                return updateSetting("wordWrap", e.target.checked);
            }}/>
												<span>Word Wrap</span>
											</label>
											<label className="flex items-center space-x-2">
												<input type="checkbox" checked={editorSettings.minimap} onChange={function (e) {
                return updateSetting("minimap", e.target.checked);
            }}/>
												<span>Minimap</span>
											</label>
											<label className="flex items-center space-x-2">
												<input type="checkbox" checked={editorSettings.lineNumbers} onChange={function (e) {
                return updateSetting("lineNumbers", e.target.checked);
            }}/>
												<span>Line Numbers</span>
											</label>
											<label className="flex items-center space-x-2">
												<input type="checkbox" checked={editorSettings.formatOnType} onChange={function (e) {
                return updateSetting("formatOnType", e.target.checked);
            }}/>
												<span>Format on Type</span>
											</label>
											<label className="flex items-center space-x-2">
												<span>Tab Size:</span>
												<select value={editorSettings.tabSize} onChange={function (e) {
                return updateSetting("tabSize", parseInt(e.target.value));
            }} className="border border-gray-300 rounded px-2 py-1">
													<option value={2}>2</option>
													<option value={4}>4</option>
													<option value={8}>8</option>
												</select>
											</label>
										</div>
									</div>)}

								
							</div>

				<div className="w-full" style={{ minHeight: isFullscreen ? "500px" : "400px", height: isFullscreen ? "500px" : "400px" }}>
					<Editor height={isFullscreen ? "500px" : "400px"} language={language} value={code} onChange={function (value) { return setCode(value || ""); }} onMount={handleEditorDidMount} theme={theme === "dark" ? "vs-dark" : "light"} options={{
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
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            wordWrap: editorSettings.wordWrap
                ? "on"
                : "off",
            tabSize: editorSettings.tabSize,
            insertSpaces: true,
            selectOnLineNumbers: true,
            readOnly: false,
            suggestOnTriggerCharacters: editorSettings.autoComplete,
            quickSuggestions: editorSettings.autoComplete,
            formatOnType: editorSettings.formatOnType,
            formatOnPaste: editorSettings.formatOnPaste,
            mouseWheelZoom: true,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
        }}/>
							</div>
						</div>
					</div>

					{/* Right Panel - Output */}
					{showPreview && (<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
							<div className="p-6 border-b border-gray-200">
								<div className="flex items-center justify-between">
									<h2 className="text-lg font-semibold text-gray-900">
										Preview
									</h2>
									<div className="flex items-center space-x-2">
										<div className="flex items-center bg-gray-100 rounded-lg p-1">
											<button onClick={function () {
                return setViewMode("desktop");
            }} className={"p-2 rounded-md transition-colors ".concat(viewMode === "desktop"
                ? "bg-white shadow-sm"
                : "hover:bg-gray-200")} title="Desktop View">
												<Monitor className="w-4 h-4 text-gray-600"/>
											</button>
											<button onClick={function () {
                return setViewMode("tablet");
            }} className={"p-2 rounded-md transition-colors ".concat(viewMode === "tablet"
                ? "bg-white shadow-sm"
                : "hover:bg-gray-200")} title="Tablet View">
												<Tablet className="w-4 h-4 text-gray-600"/>
											</button>
											<button onClick={function () {
                return setViewMode("mobile");
            }} className={"p-2 rounded-md transition-colors ".concat(viewMode === "mobile"
                ? "bg-white shadow-sm"
                : "hover:bg-gray-200")} title="Mobile View">
												<Smartphone className="w-4 h-4 text-gray-600"/>
											</button>
										</div>
									</div>
								</div>
							</div>

							<div className="flex-1 p-6 bg-gray-50 flex items-center justify-center overflow-auto">
								<div className={"bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 ".concat(getViewModeWidth())}>
									<iframe ref={iframeRef} className="w-full h-96 rounded-lg" title="CSS Preview"/>
								</div>
							</div>
						</div>)}
				</div>

				{/* Enhanced Action Bar */}
				{!isFullscreen && (<div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
						<div className="flex items-center justify-between flex-wrap gap-4">
							<div className="flex items-center space-x-4">
								<button onClick={runCode} disabled={isRunning} className={"flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ".concat(isRunning || isAiLoading
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl")} title="Run Code (Ctrl+Enter)">
									{isAiLoading ? (<>
											<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
											<span>Analyzing...</span>
										</>) : isRunning ? (<>
											<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
											<span>Running...</span>
										</>) : (<>
											<Play className="w-4 h-4"/>
											<span>Run Code</span>
										</>)}
								</button>
								<button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
									<Target className="w-4 h-4 text-gray-600"/>
									<span className="text-gray-700">
										Submit
									</span>
								</button>
								
							</div>

							<div className="flex items-center space-x-4 text-sm text-gray-500">
								<div className="flex items-center space-x-2">
									{errors.length > 0 ? (<XCircle className="w-4 h-4 text-red-500"/>) : (<CheckCircle className="w-4 h-4 text-emerald-500"/>)}
									<span>
										{errors.length > 0
                ? "".concat(errors.length, " error").concat(errors.length > 1 ? "s" : "")
                : "No errors"}
									</span>
								</div>
								<div className="flex items-center space-x-2">
									<Clock className="w-4 h-4"/>
									<span>Auto-saved</span>
								</div>
							</div>
						</div>
					</div>)}

				{aiFeedback && (<div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
						<h3 className="text-lg font-semibold text-gray-900 mb-2">AI Feedback</h3>
						<div className="prose prose-sm max-w-none text-gray-700">
							{aiFeedback}
						</div>
					</div>)}
			</div>
		</div>);
}
