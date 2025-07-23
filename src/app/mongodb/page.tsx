"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Clock,
	User,
	TrendingUp,
	Star,
	BookOpen,
	Target,
	Search,
	Filter,
	Lightbulb,
	Code,
	ChevronRight,
	Zap,
	Trophy,
} from "lucide-react";

interface Question {
	_id: string;
	title: string;
	description: string;
	difficulty: string;
	tags?: string[];
	estimatedTime?: number;
	mongoConcepts?: string[];
}

// Mock data for demonstration
const mockQuestions: Question[] = [
	{
		_id: "1",
		title: "MongoDB Document Structure",
		description:
			"Explain the basic document structure in MongoDB and how it differs from relational databases.",
		difficulty: "easy",
		tags: ["mongodb", "document", "nosql"],
		estimatedTime: 8,
		mongoConcepts: ["BSON", "collections", "embedded documents"],
	},
	{
		_id: "2",
		title: "CRUD Operations in MongoDB",
		description:
			"Demonstrate how to perform basic CRUD (Create, Read, Update, Delete) operations in MongoDB using the mongo shell or a driver.",
		difficulty: "medium",
		tags: ["mongodb", "crud", "operations"],
		estimatedTime: 15,
		mongoConcepts: ["insertOne", "find", "updateOne", "deleteOne"],
	},
	{
		_id: "3",
		title: "MongoDB Indexing Strategies",
		description:
			"Discuss different indexing strategies in MongoDB and their impact on query performance.",
		difficulty: "hard",
		tags: ["mongodb", "indexing", "performance", "optimization"],
		estimatedTime: 20,
		mongoConcepts: ["createIndex", "single field index", "compound index", "explain()"],
	},
	{
		_id: "4",
		title: "MongoDB Aggregation Framework",
		description:
			"Explain the MongoDB Aggregation Framework and provide an example of a common aggregation pipeline.",
		difficulty: "hard",
		tags: ["mongodb", "aggregation", "pipeline"],
		estimatedTime: 25,
		mongoConcepts: ["$match", "$group", "$project", "$lookup"],
	},
	{
		_id: "5",
		title: "Data Modeling in MongoDB",
		description:
			"Compare embedded and referenced data models in MongoDB, and discuss when to use each.",
		difficulty: "medium",
		tags: ["mongodb", "data modeling", "schema design"],
		estimatedTime: 18,
		mongoConcepts: ["one-to-one", "one-to-many", "many-to-many"],
	},
];

export default function EnhancedMongodbQuestionsPage() {
	const [questions, setQuestions] = useState<Question[]>(mockQuestions);
	const [filteredQuestions, setFilteredQuestions] =
		useState<Question[]>(mockQuestions);
	const [hoveredCard, setHoveredCard] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
		null
	);

	// MongoDB concept suggestions based on difficulty
	const getMongoSuggestions = (difficulty: string) => {
		const suggestions: { [key in "easy" | "medium" | "hard"]: string[] } = {
			easy: [
				"db.collection.insertOne()",
				"db.collection.find()",
				"db.collection.updateOne()",
				"db.collection.deleteOne()",
				"show dbs",
				"use dbname",
				"show collections",
			],
			medium: [
				"db.collection.aggregate()",
				"$match",
				"$group",
				"$project",
				"db.collection.createIndex()",
				"db.collection.explain()",
				"db.collection.bulkWrite()",
			],
			hard: [
				"Replication Set",
				"Sharding",
				"Transactions",
				"Change Streams",
				"GridFS",
				"Atlas Search",
				"Schema Validation",
			],
		};
		const key = difficulty.toLowerCase() as "easy" | "medium" | "hard";
		return suggestions[key] || suggestions.easy;
	};

	useEffect(() => {
		let filtered = questions;

		if (searchTerm) {
			filtered = filtered.filter(
				(q) =>
					q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					q.description
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					q.tags?.some((tag) =>
						tag.toLowerCase().includes(searchTerm.toLowerCase())
					)
			);
		}

		if (selectedDifficulty !== "all") {
			filtered = filtered.filter(
				(q) => q.difficulty.toLowerCase() === selectedDifficulty
			);
		}

		setFilteredQuestions(filtered);
	}, [searchTerm, selectedDifficulty, questions]);

	const getDifficultyColor = (difficulty: string) => {
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

	const getDifficultyIcon = (difficulty: string) => {
		switch (difficulty.toLowerCase()) {
			case "easy":
				return (
					<div className="w-2 h-2 rounded-full bg-emerald-500"></div>
				);
			case "medium":
				return (
					<div className="w-2 h-2 rounded-full bg-amber-500"></div>
				);
			case "hard":
				return <div className="w-2 h-2 rounded-full bg-red-500"></div>;
			default:
				return <div className="w-2 h-2 rounded-full bg-gray-500"></div>;
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
			{/* Header Section */}
			<div className="bg-white shadow-sm border-b border-gray-200">
				<div className="container mx-auto px-6 py-8">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg">
								<BookOpen className="w-8 h-8 text-white" />
							</div>
							<div>
								<h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
									MongoDB Questions
								</h1>
								<p className="text-gray-600 mt-1">
									Master MongoDB with curated coding challenges &
									smart suggestions
								</p>
							</div>
						</div>
						<div className="flex items-center space-x-6 text-sm text-gray-600">
							<div className="flex items-center space-x-2">
								<Target className="w-4 h-4 text-blue-500" />
								<span>{questions.length} Questions</span>
							</div>
							<button
								onClick={() =>
									setShowSuggestions(!showSuggestions)
								}
								className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200">
								<Lightbulb className="w-4 h-4" />
								<span>MongoDB Helper</span>
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
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
							<input
								type="text"
								placeholder="Search questions, tags, or MongoDB concepts..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
							/>
						</div>

						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-2">
								<Filter className="w-4 h-4 text-gray-500" />
								<select
									value={selectedDifficulty}
									onChange={(e) =>
										setSelectedDifficulty(e.target.value)
									}
									className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
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
										{
											questions.filter(
												(q) =>
													q.difficulty.toLowerCase() ===
													"easy"
											).length
										}
									</span>
								</div>
								<div className="flex items-center space-x-2">
									<div className="w-3 h-3 rounded-full bg-amber-500"></div>
									<span className="text-sm text-gray-600">
										Medium
									</span>
									<span className="text-sm font-semibold text-amber-600">
										{
											questions.filter(
												(q) =>
													q.difficulty.toLowerCase() ===
													"medium"
											).length
										}
									</span>
								</div>
								<div className="flex items-center space-x-2">
									<div className="w-3 h-3 rounded-full bg-red-500"></div>
									<span className="text-sm text-gray-600">
										Hard
									</span>
									<span className="text-sm font-semibold text-red-600">
										{
											questions.filter(
												(q) =>
													q.difficulty.toLowerCase() ===
													"hard"
											).length
										}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* MongoDB Suggestions Sidebar */}
			{showSuggestions && (
				<div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300">
					<div className="p-6 border-b border-gray-200">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-semibold text-gray-900">
								MongoDB Helper
							</h3>
							<button
								onClick={() => setShowSuggestions(false)}
								className="text-gray-400 hover:text-gray-600">
								×
							</button>
						</div>
						<p className="text-sm text-gray-600 mt-1">
							Smart suggestions for your MongoDB journey
						</p>
					</div>

					<div className="p-6 space-y-6 overflow-y-auto h-full pb-20">
						{["easy", "medium", "hard"].map((level) => (
							<div key={level} className="space-y-3">
								<h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center space-x-2">
									<div
										className={`w-2 h-2 rounded-full ${
											level === "easy"
												? "bg-emerald-500"
												: level === "medium"
												? "bg-amber-500"
												: "bg-red-500"
										}`}></div>
									<span>{level} Level Concepts</span>
								</h4>
								<div className="grid grid-cols-1 gap-2">
									{getMongoSuggestions(level).map(
										(concept, idx) => (
											<div
												key={idx}
												className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors duration-200 cursor-pointer group">
												<code className="text-sm font-mono text-blue-600 group-hover:text-blue-700">
													{concept}
												</code>
											</div>
										)
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Questions Grid */}
			<div className="container mx-auto px-6 py-8">
				<div className="grid grid-cols-1 gap-6">
					{filteredQuestions.map((question, index) => (
						<Card
							key={question._id}
							className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-100 border-0 shadow-md bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-[1.02] ${
								hoveredCard === question._id
									? "ring-2 ring-blue-500 ring-opacity-50"
									: ""
							}`}
							onMouseEnter={() => setHoveredCard(question._id)}
							onMouseLeave={() => setHoveredCard(null)}
							onClick={() => setSelectedQuestion(question)}>
							<CardHeader className="pb-3">
								<div className="flex items-start justify-between">
									<div className="flex items-center space-x-3">
										<div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-bold">
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
										<Badge
											variant="secondary"
											className={`text-xs font-medium transition-colors duration-200 ${getDifficultyColor(
												question.difficulty
											)}`}>
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
								{question.tags && (
									<div className="flex flex-wrap gap-2 mb-4">
										{question.tags.map((tag) => (
											<span
												key={tag}
												className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
												{tag}
											</span>
										))}
									</div>
								)}

								{/* MongoDB Concepts Preview */}
								{question.mongoConcepts &&
									hoveredCard === question._id && (
										<div className="mb-4 p-3 bg-gray-50 rounded-lg border">
											<div className="flex items-center space-x-2 mb-2">
												<Code className="w-4 h-4 text-blue-500" />
												<span className="text-sm font-medium text-gray-700">
													Key Concepts
												</span>
											</div>
											<div className="grid grid-cols-2 gap-2">
												{question.mongoConcepts
													.slice(0, 4)
													.map((concept, idx) => (
														<code
															key={idx}
															className="text-xs bg-white px-2 py-1 rounded border text-blue-600">
															{concept}
														</code>
													))}
											</div>
										</div>
									)}

								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-4 text-xs text-gray-500">
										{question.estimatedTime && (
											<div className="flex items-center space-x-1">
												<Clock className="w-3 h-3" />
												<span>
													{question.estimatedTime} min
												</span>
											</div>
										)}
										<div className="flex items-center space-x-1">
											<User className="w-3 h-3" />
											<span>73% success</span>
										</div>
										<div className="flex items-center space-x-1">
											<Star className="w-3 h-3" />
											<span>4.2</span>
										</div>
									</div>
									<div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
										<div className="text-xs text-blue-600 font-medium flex items-center space-x-1">
											<Zap className="w-3 h-3" />
											<span>Start Coding</span>
											<ChevronRight className="w-3 h-3" />
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* No Results */}
				{filteredQuestions.length === 0 && (
					<div className="text-center py-12">
						<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<Search className="w-6 h-6 text-gray-400" />
						</div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">
							No questions found
						</h3>
						<p className="text-gray-600">
							Try adjusting your search terms or filters.
						</p>
					</div>
				)}

				{/* Quick Start Guide */}
				<div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
					<div className="flex items-start space-x-4">
						<div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
							<Trophy className="w-6 h-6 text-white" />
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
										2. Use MongoDB Helper
									</h4>
									<p className="text-gray-600">
										Click the helper button for concept
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
		</div>
	);
}
