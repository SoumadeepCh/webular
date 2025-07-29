"use client";
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
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Star, BookOpen, Target, Search, Filter, Lightbulb, Code, ChevronRight, Zap, Trophy, } from "lucide-react";
export default function EnhancedHtmlQuestionsPage() {
    var _this = this;
    var _a = useState([]), questions = _a[0], setQuestions = _a[1];
    var _b = useState([]), filteredQuestions = _b[0], setFilteredQuestions = _b[1];
    var _c = useState(null), hoveredCard = _c[0], setHoveredCard = _c[1];
    var _d = useState(""), searchTerm = _d[0], setSearchTerm = _d[1];
    var _e = useState("all"), selectedDifficulty = _e[0], setSelectedDifficulty = _e[1];
    var _f = useState(false), showSuggestions = _f[0], setShowSuggestions = _f[1];
    var _g = useState(null), selectedQuestion = _g[0], setSelectedQuestion = _g[1];
    useEffect(function () {
        var fetchQuestions = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("/api/questions?category=html")];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        setQuestions(data);
                        setFilteredQuestions(data);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error fetching questions:", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchQuestions();
    }, []);
    // HTML property suggestions based on difficulty
    var getHtmlSuggestions = function (difficulty) {
        var suggestions = {
            easy: [
                "<div>",
                "<span>",
                "<p>",
                "<a>",
                "<img>",
                "<h1>-<h6>",
                "<ul>",
                "<ol>",
                "<li>",
                "<br>",
                "<hr>",
            ],
            medium: [
                "<form>",
                "<input>",
                "<textarea>",
                "<select>",
                "<option>",
                "<table>",
                "<tr>",
                "<td>",
                "<th>",
                "<video>",
                "<audio>",
                "<source>",
            ],
            hard: [
                "<header>",
                "<nav>",
                "<main>",
                "<article>",
                "<section>",
                "<aside>",
                "<footer>",
                "<canvas>",
                "<svg>",
                "<template>",
                "<slot>",
                "aria-*",
            ],
        };
        var key = difficulty.toLowerCase();
        return suggestions[key] || suggestions.easy;
    };
    useEffect(function () {
        var filtered = questions;
        if (searchTerm) {
            filtered = filtered.filter(function (q) {
                var _a;
                return q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    q.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    ((_a = q.tags) === null || _a === void 0 ? void 0 : _a.some(function (tag) {
                        return tag.toLowerCase().includes(searchTerm.toLowerCase());
                    }));
            });
        }
        if (selectedDifficulty !== "all") {
            filtered = filtered.filter(function (q) { return q.difficulty.toLowerCase() === selectedDifficulty; });
        }
        setFilteredQuestions(filtered);
    }, [searchTerm, selectedDifficulty, questions]);
    var getDifficultyColor = function (difficulty) {
        switch (difficulty.toLowerCase()) {
            case "easy":
                return "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200";
            case "medium":
                return "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200";
            case "hard":
                return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200";
        }
    };
    var getDifficultyIcon = function (difficulty) {
        switch (difficulty.toLowerCase()) {
            case "easy":
                return (<div className="w-2 h-2 rounded-full bg-emerald-500"></div>);
            case "medium":
                return (<div className="w-2 h-2 rounded-full bg-amber-500"></div>);
            case "hard":
                return <div className="w-2 h-2 rounded-full bg-red-500"></div>;
            default:
                return <div className="w-2 h-2 rounded-full bg-gray-500"></div>;
        }
    };
    return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
			{/* Header Section */}
			<div className="bg-white shadow-sm border-b border-gray-200">
				<div className="container mx-auto px-6 py-8">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-lg">
								<BookOpen className="w-8 h-8 text-white"/>
							</div>
							<div>
								<h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
									HTML Questions
								</h1>
								<p className="text-gray-600 mt-1">
									Master HTML with curated coding challenges &
									smart suggestions
								</p>
							</div>
						</div>
						<div className="flex items-center space-x-6 text-sm text-gray-600">
							<div className="flex items-center space-x-2">
								<Target className="w-4 h-4 text-blue-500"/>
								<span>{questions.length} Questions</span>
							</div>
							<button onClick={function () {
            return setShowSuggestions(!showSuggestions);
        }} className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200">
								<Lightbulb className="w-4 h-4"/>
								<span>HTML Helper</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Search and Filter Section */}
			<div className="bg-white border-b border-gray-200">
				<div className="container mx-auto px-6 py-6">
					<div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
						<div className="flex-1 max-w-md relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
							<input type="text" placeholder="Search questions, tags, or HTML properties..." value={searchTerm} onChange={function (e) { return setSearchTerm(e.target.value); }} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"/>
						</div>

						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-2">
								<Filter className="w-4 h-4 text-gray-500"/>
								<select value={selectedDifficulty} onChange={function (e) {
            return setSelectedDifficulty(e.target.value);
        }} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
									<option value="all">All Levels</option>
									<option value="easy">Easy</option>
									<option value="medium">Medium</option>
									<option value="hard">Hard</option>
								</select>
							</div>

							<div className="flex items-center space-x-8">
								<div className="flex items-center space-x-2">
									<div className="w-3 h-3 rounded-full bg-emerald-500"></div>
									<span className="text-sm text-gray-600">
										Easy
									</span>
									<span className="text-sm font-semibold text-emerald-600">
										{questions.filter(function (q) {
            return q.difficulty.toLowerCase() ===
                "easy";
        }).length}
									</span>
								</div>
								<div className="flex items-center space-x-2">
									<div className="w-3 h-3 rounded-full bg-amber-500"></div>
									<span className="text-sm text-gray-600">
										Medium
									</span>
									<span className="text-sm font-semibold text-amber-600">
										{questions.filter(function (q) {
            return q.difficulty.toLowerCase() ===
                "medium";
        }).length}
									</span>
								</div>
								<div className="flex items-center space-x-2">
									<div className="w-3 h-3 rounded-full bg-red-500"></div>
									<span className="text-sm text-gray-600">
										Hard
									</span>
									<span className="text-sm font-semibold text-red-600">
										{questions.filter(function (q) {
            return q.difficulty.toLowerCase() ===
                "hard";
        }).length}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* HTML Suggestions Sidebar */}
			{showSuggestions && (<div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300">
					<div className="p-6 border-b border-gray-200">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-semibold text-gray-900">
								HTML Helper
							</h3>
							<button onClick={function () { return setShowSuggestions(false); }} className="text-gray-400 hover:text-gray-600">
								×
							</button>
						</div>
						<p className="text-sm text-gray-600 mt-1">
							Smart suggestions for your HTML journey
						</p>
					</div>

					<div className="p-6 space-y-6 overflow-y-auto h-full pb-20">
						{["easy", "medium", "hard"].map(function (level) { return (<div key={level} className="space-y-3">
								<h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center space-x-2">
									<div className={"w-2 h-2 rounded-full ".concat(level === "easy"
                    ? "bg-emerald-500"
                    : level === "medium"
                        ? "bg-amber-500"
                        : "bg-red-500")}></div>
									<span>{level} Level Properties</span>
								</h4>
								<div className="grid grid-cols-1 gap-2">
									{getHtmlSuggestions(level).map(function (property, index) { return (<div key={index} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors duration-200 cursor-pointer group">
												<code className="text-sm font-mono text-blue-600 group-hover:text-blue-700">
													{property}
												</code>
											</div>); })}
								</div>
							</div>); })}
					</div>
				</div>)}

			{/* Questions Grid */}
			<div className="container mx-auto px-6 py-8">
				<div className="grid grid-cols-1 gap-6">
					{filteredQuestions.map(function (question, index) { return (<Link href={"/questions/".concat(question._id)} key={question._id}>
							<Card className={"group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-100 border-0 shadow-md bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-[1.02] ".concat(hoveredCard === question._id
                ? "ring-2 ring-blue-500 ring-opacity-50"
                : "")} onMouseEnter={function () { return setHoveredCard(question._id); }} onMouseLeave={function () { return setHoveredCard(null); }}>
								<CardHeader className="pb-3">
									<div className="flex items-start justify-between">
										<div className="flex items-center space-x-3">
											<div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-bold">
												{index + 1}
											</div>
											<div className="flex-1">
												<CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
													{question.title}
												</CardTitle>
											</div>
										</div>
										<div className="flex items-center space-x-2 ml-4">
											{getDifficultyIcon(question.difficulty)}
											<Badge variant="secondary" className={"text-xs font-medium transition-colors duration-200 ".concat(getDifficultyColor(question.difficulty))}>
												{question.difficulty}
											</Badge>
										</div>
									</div>
								</CardHeader>

								<CardContent className="pt-0">
									<p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
										{question.description}
									</p>

									{/* Tags */}
									{question.tags && (<div className="flex flex-wrap gap-2 mb-4">
											{question.tags.map(function (tag) { return (<span key={tag} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
													{tag}
												</span>); })}
										</div>)}

									{/* HTML Properties Preview */}
									{question.htmlProperties &&
                hoveredCard === question._id && (<div className="mb-4 p-3 bg-gray-50 rounded-lg border">
												<div className="flex items-center space-x-2 mb-2">
													<Code className="w-4 h-4 text-blue-500"/>
													<span className="text-sm font-medium text-gray-700">
														Key Properties
													</span>
												</div>
												<div className="grid grid-cols-2 gap-2">
													{question.htmlProperties
                    .slice(0, 4)
                    .map(function (prop, idx) { return (<code key={idx} className="text-xs bg-white px-2 py-1 rounded border text-blue-600">
															{prop}
														</code>); })}
												</div>
											</div>)}

									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-4 text-xs text-gray-500">
											{question.estimatedTime && (<div className="flex items-center space-x-1">
													<Clock className="w-3 h-3"/>
													<span>
														{question.estimatedTime} min
													</span>
												</div>)}
											<div className="flex items-center space-x-1">
												<User className="w-3 h-3"/>
												<span>73% success</span>
											</div>
											<div className="flex items-center space-x-1">
												<Star className="w-3 h-3"/>
												<span>4.2</span>
											</div>
										</div>
										<div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
											<div className="text-xs text-blue-600 font-medium flex items-center space-x-1">
												<Zap className="w-3 h-3"/>
												<span>Start Coding</span>
												<ChevronRight className="w-3 h-3"/>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</Link>); })}
				</div>

				{/* No Results */}
				{filteredQuestions.length === 0 && (<div className="text-center py-12">
						<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<Search className="w-6 h-6 text-gray-400"/>
						</div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">
							No questions found
						</h3>
						<p className="text-gray-600">
							Try adjusting your search terms or filters.
						</p>
					</div>)}

				{/* Quick Start Guide */}
				<div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
					<div className="flex items-start space-x-4">
						<div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
							<Trophy className="w-6 h-6 text-white"/>
						</div>
						<div className="flex-1">
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Quick Start Guide
							</h3>
							<div className="grid md:grid-cols-3 gap-4 text-sm">
								<div className="space-y-2">
									<h4 className="font-medium text-gray-800">
										1. Choose Your Level
									</h4>
									<p className="text-gray-600">
										Start with easy questions and work your
										way up
									</p>
								</div>
								<div className="space-y-2">
									<h4 className="font-medium text-gray-800">
										2. Use HTML Helper
									</h4>
									<p className="text-gray-600">
										Click the helper button for property
										suggestions
									</p>
								</div>
								<div className="space-y-2">
									<h4 className="font-medium text-gray-800">
										3. Practice Daily
									</h4>
									<p className="text-gray-600">
										Solve one question daily to build
										expertise
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>);
}
