'use client';
import { useState, useEffect } from "react";
import { Code, Database, Globe, Layers, Terminal, BookOpen, TrendingUp, Users, Award, ChevronRight, Star, Zap, Target, Brain, Coffee, } from "lucide-react";
// Mock components - replace with your actual imports
var HeroSection = function () {
    var _a = useState(false), isVisible = _a[0], setIsVisible = _a[1];
    useEffect(function () {
        setIsVisible(true);
    }, []);
    return (<section className="relative w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
			<div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
			<div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
			<div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>

			<div className="container mx-auto px-6 py-24 relative z-10">
				<div className={"text-center max-w-4xl mx-auto transition-all duration-1000 ".concat(isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0")}>
					<div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg border border-white/20">
						<Star className="w-5 h-5 text-yellow-500 fill-yellow-500"/>
						<span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							Premium Learning Platform
						</span>
						<Zap className="w-5 h-5 text-yellow-500 fill-yellow-500"/>
					</div>

					<h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
						<span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
							Master Web
						</span>
						<br />
						<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							Development
						</span>
					</h1>

					<p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
						Level up your coding skills with our interactive
						challenges, real-world projects, and expert-crafted
						problems.
					</p>

					<div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
						<button className="group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
							<span>Start Learning</span>
							<ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
						</button>
						<button className="group bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-white/20 flex items-center space-x-2">
							<BookOpen className="w-5 h-5"/>
							<span>Browse Topics</span>
						</button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
						<div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
							<div className="flex items-center space-x-3 mb-2">
								<Users className="w-6 h-6 text-blue-500"/>
								<span className="text-2xl font-bold text-gray-900">
									50K+
								</span>
							</div>
							<p className="text-gray-600">Active Learners</p>
						</div>
						<div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
							<div className="flex items-center space-x-3 mb-2">
								<Target className="w-6 h-6 text-emerald-500"/>
								<span className="text-2xl font-bold text-gray-900">
									500+
								</span>
							</div>
							<p className="text-gray-600">Coding Challenges</p>
						</div>
						<div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
							<div className="flex items-center space-x-3 mb-2">
								<Award className="w-6 h-6 text-purple-500"/>
								<span className="text-2xl font-bold text-gray-900">
									95%
								</span>
							</div>
							<p className="text-gray-600">Success Rate</p>
						</div>
					</div>
				</div>
			</div>
		</section>);
};
var TopicCard = function (_a) {
    var title = _a.title, href = _a.href, Icon = _a.icon, description = _a.description, difficulty = _a.difficulty, questionCount = _a.questionCount, color = _a.color;
    var _b = useState(false), isHovered = _b[0], setIsHovered = _b[1];
    return (<a href={href} className="block group">
			<div className={"relative bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-white overflow-hidden ".concat(isHovered ? "ring-2 ring-blue-500 ring-opacity-50" : "")} onMouseEnter={function () { return setIsHovered(true); }} onMouseLeave={function () { return setIsHovered(false); }}>
				{/* Background gradient */}
				<div className={"absolute inset-0 bg-gradient-to-br ".concat(color, " opacity-5 group-hover:opacity-10 transition-opacity duration-300")}></div>

				<div className="relative z-10">
					<div className="flex items-center justify-between mb-4">
						<div className={"p-3 rounded-xl bg-gradient-to-r ".concat(color, " shadow-lg")}>
							<Icon className="w-8 h-8 text-white"/>
						</div>
						<div className="flex items-center space-x-2">
							<div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
								{questionCount} problems
							</div>
							<ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200"/>
						</div>
					</div>

					<h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
						{title}
					</h3>

					<p className="text-gray-600 mb-4 leading-relaxed">
						{description}
					</p>

					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<Brain className="w-4 h-4 text-gray-400"/>
							<span className="text-sm text-gray-500">
								{difficulty}
							</span>
						</div>
						<div className="flex items-center space-x-1">
							<Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
							<span className="text-sm text-gray-500">4.8</span>
						</div>
					</div>
				</div>
			</div>
		</a>);
};
export default function Home() {
    var _a = useState(new Date()), currentTime = _a[0], setCurrentTime = _a[1];
    useEffect(function () {
        var timer = setInterval(function () {
            setCurrentTime(new Date());
        }, 1000);
        return function () { return clearInterval(timer); };
    }, []);
    var topics = [
        {
            title: "HTML",
            href: "/html",
            icon: Globe,
            description: "Master the foundation of web development with semantic HTML and modern best practices.",
            difficulty: "Beginner",
            questionCount: 45,
            color: "from-orange-500 to-red-500",
        },
        {
            title: "CSS",
            href: "/css",
            icon: Layers,
            description: "Create beautiful, responsive designs with CSS Grid, Flexbox, and advanced styling techniques.",
            difficulty: "Intermediate",
            questionCount: 67,
            color: "from-blue-500 to-indigo-500",
        },
        {
            title: "JavaScript",
            href: "/javascript",
            icon: Code,
            description: "Build interactive web applications with modern JavaScript ES6+ features and frameworks.",
            difficulty: "Advanced",
            questionCount: 128,
            color: "from-yellow-500 to-orange-500",
        },
        {
            title: "SQL",
            href: "/sql",
            icon: Database,
            description: "Query and manipulate databases efficiently with SQL joins, aggregations, and optimization.",
            difficulty: "Intermediate",
            questionCount: 89,
            color: "from-green-500 to-emerald-500",
        },
        {
            title: "MongoDB",
            href: "/mongodb",
            icon: Terminal,
            description: "Work with NoSQL databases, document modeling, and MongoDB aggregation pipelines.",
            difficulty: "Advanced",
            questionCount: 56,
            color: "from-purple-500 to-pink-500",
        },
    ];
    return (<main className="flex min-h-screen flex-col items-center justify-start">
			<HeroSection />

			{/* Topics Section */}
			<section id="topics" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
				<div className="container mx-auto px-6">
					<div className="text-center mb-16">
						<div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg border border-white/20">
							<BookOpen className="w-5 h-5 text-blue-500"/>
							<span className="text-sm font-medium text-gray-600">
								Learning Paths
							</span>
						</div>

						<h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
							Explore Topics
						</h2>

						<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
							Choose your learning path and master web development
							through hands-on practice with real-world
							challenges.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{topics.map(function (topic) { return (<TopicCard key={topic.title} {...topic}/>); })}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="w-full py-16 md:py-24 bg-white">
				<div className="container mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
							Why Choose Our Platform?
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Everything you need to become a proficient web
							developer
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						<div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm">
							<div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl inline-block mb-6">
								<Brain className="w-8 h-8 text-white"/>
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-4">
								Interactive Learning
							</h3>
							<p className="text-gray-600 leading-relaxed">
								Learn by doing with our interactive code editor
								and real-time feedback system.
							</p>
						</div>

						<div className="text-center p-8 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl shadow-sm">
							<div className="p-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl inline-block mb-6">
								<TrendingUp className="w-8 h-8 text-white"/>
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-4">
								Progress Tracking
							</h3>
							<p className="text-gray-600 leading-relaxed">
								Monitor your progress with detailed analytics
								and achievement badges.
							</p>
						</div>

						<div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-sm">
							<div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl inline-block mb-6">
								<Coffee className="w-8 h-8 text-white"/>
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-4">
								Community Support
							</h3>
							<p className="text-gray-600 leading-relaxed">
								Join a community of learners and get help from
								experienced developers.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="w-full py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
				<div className="container mx-auto px-6">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
						<div className="text-white">
							<div className="text-4xl font-bold mb-2">50K+</div>
							<div className="text-blue-100">Active Students</div>
						</div>
						<div className="text-white">
							<div className="text-4xl font-bold mb-2">500+</div>
							<div className="text-blue-100">
								Coding Challenges
							</div>
						</div>
						<div className="text-white">
							<div className="text-4xl font-bold mb-2">95%</div>
							<div className="text-blue-100">Success Rate</div>
						</div>
						<div className="text-white">
							<div className="text-4xl font-bold mb-2">24/7</div>
							<div className="text-blue-100">
								Support Available
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>);
}
