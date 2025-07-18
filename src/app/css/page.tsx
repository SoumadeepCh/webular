"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, TrendingUp, Star, BookOpen, Target } from "lucide-react";

interface Question {
	_id: string;
	title: string;
	description: string;
	difficulty: string;
}

export default function CssQuestionsPage() {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [hoveredCard, setHoveredCard] = useState<string | null>(null);

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const res = await fetch("http://localhost:5000/questions/css");
				const data = await res.json();
				setQuestions(data);
			} catch (error) {
				console.error("Error fetching questions:", error);
			}
		};

		fetchQuestions();
	}, []);

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
							<div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
								<BookOpen className="w-8 h-8 text-white" />
							</div>
							<div>
								<h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
									CSS Questions
								</h1>
								<p className="text-gray-600 mt-1">
									Master CSS with curated coding challenges
								</p>
							</div>
						</div>
						<div className="flex items-center space-x-6 text-sm text-gray-600">
							<div className="flex items-center space-x-2">
								<Target className="w-4 h-4 text-blue-500" />
								<span>{questions.length} Questions</span>
							</div>
							<div className="flex items-center space-x-2">
								<TrendingUp className="w-4 h-4 text-emerald-500" />
								<span>Premium</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Stats Bar */}
			<div className="bg-white border-b border-gray-200">
				<div className="container mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
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
						<div className="flex items-center space-x-2 text-sm text-gray-500">
							<Clock className="w-4 h-4" />
							<span>Updated recently</span>
						</div>
					</div>
				</div>
			</div>

			{/* Questions Grid */}
			<div className="container mx-auto px-6 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{questions.map((question, index) => (
						<Link
							key={question._id}
							href={`/questions/${question._id}`}>
							<Card
								className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-100 border-0 shadow-md bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-[1.02] ${
									hoveredCard === question._id
										? "ring-2 ring-blue-500 ring-opacity-50"
										: ""
								}`}
								onMouseEnter={() =>
									setHoveredCard(question._id)
								}
								onMouseLeave={() => setHoveredCard(null)}>
								<CardHeader className="pb-3">
									<div className="flex items-start justify-between">
										<div className="flex items-center space-x-3">
											<div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-bold">
												{index + 1}
											</div>
											<div className="flex-1">
												<CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
													{question.title}
												</CardTitle>
											</div>
										</div>
										<div className="flex items-center space-x-2 ml-4">
											{getDifficultyIcon(
												question.difficulty
											)}
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
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-4 text-xs text-gray-500">
											<div className="flex items-center space-x-1">
												<User className="w-3 h-3" />
												<span>Acceptance: 73%</span>
											</div>
											<div className="flex items-center space-x-1">
												<Star className="w-3 h-3" />
												<span>4.2</span>
											</div>
										</div>
										<div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
											<div className="text-xs text-blue-600 font-medium">
												Solve →
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>

				{/* Premium CTA */}
				<div className="mt-12 text-center">
					<div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-shadow duration-200">
						<Star className="w-4 h-4" />
						<span>Premium Questions Available</span>
					</div>
				</div>
			</div>
		</div>
	);
}
