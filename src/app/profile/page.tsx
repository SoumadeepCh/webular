"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import CalendarHeatmap from "@/components/CalendarHeatmap";
import {
	User,
	Mail,
	Calendar,
	Trophy,
	Target,
	TrendingUp,
	Clock,
	CheckCircle,
	LogOut,
	Edit,
	Save,
	X,
	BarChart3,
	Flame,
	Award,
	BookOpen,
} from "lucide-react";

interface UserStats {
	totalQuestionsSolved: number;
	dailyQuestionsSolved: number;
	currentStreak: number;
	longestStreak: number;
	averageAccuracy: number;
	totalPracticeTime: number; // in minutes
	lastActiveDate: string;
	joinedDate: string;
	favoriteTopics: string[];
	difficultyBreakdown: {
		easy: number;
		medium: number;
		hard: number;
	};
}

interface UserProfile {
	id: string;
	name: string;
	email: string;
	bio?: string;
	avatar?: string;
	targetRole?: string;
	experienceLevel?: "beginner" | "intermediate" | "advanced";
}

export default function ProfilePage() {
	const { data: session, status, update } = useSession();
	const [userStats, setUserStats] = useState<UserStats | null>(null);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const [editForm, setEditForm] = useState<Partial<UserProfile>>({});
  const [activityMap, setActivityMap] = useState<Record<string, number>>({});

  useEffect(() => {
		const fetchActivity = async () => {
			const res = await fetch("/api/user/activity");
			if (res.ok) {
				const data = await res.json();
				setActivityMap(data.activity);
			}
		};

		fetchActivity();
  }, []);


	// Fetch user statistics and profile data
	useEffect(() => {
		const fetchUserData = async () => {
			if (!session?.user?.email) return;

			try {
				const [statsResponse, profileResponse] = await Promise.all([
					fetch("/api/user/stats"),
					fetch("/api/user/profile"),
				]);

				if (statsResponse.ok) {
					const stats = await statsResponse.json();
					setUserStats(stats);
				}

				if (profileResponse.ok) {
					const profile = await profileResponse.json();
					setEditForm(profile);
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserData();
	}, [session]);

	const handleEditProfile = () => {
		setIsEditing(true);
		setEditForm({
			name: session?.user?.name || "",
			bio: editForm.bio || "",
			targetRole: editForm.targetRole || "",
			experienceLevel: editForm.experienceLevel || "beginner",
		});
	};

	const handleSaveProfile = async () => {
		setIsSaving(true);
		try {
			const response = await fetch("/api/user/profile", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(editForm),
			});

			if (response.ok) {
				await update(); // Refresh session data
				setIsEditing(false);
			}
		} catch (error) {
			console.error("Error updating profile:", error);
		} finally {
			setIsSaving(false);
		}
	};

	const handleLogout = () => {
		signOut({ callbackUrl: "/login" });
	};

	const formatTime = (minutes: number): string => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
	};

	if (status === "loading" || isLoading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
			</div>
		);
	}

	if (!session) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						Access Denied
					</h2>
					<p className="text-gray-600">
						Please sign in to view your profile.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">
						My Profile
					</h1>
					<p className="text-gray-600 mt-2">
						Track your progress and manage your account
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Profile Information */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-xl font-semibold text-gray-900">
									Profile Details
								</h2>
								{!isEditing ? (
									<button
										onClick={handleEditProfile}
										className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
										<Edit className="w-4 h-4" />
									</button>
								) : (
									<div className="flex gap-2">
										<button
											onClick={handleSaveProfile}
											disabled={isSaving}
											className="p-2 text-green-600 hover:text-green-700 transition-colors disabled:opacity-50">
											<Save className="w-4 h-4" />
										</button>
										<button
											onClick={() => setIsEditing(false)}
											className="p-2 text-red-600 hover:text-red-700 transition-colors">
											<X className="w-4 h-4" />
										</button>
									</div>
								)}
							</div>

							<div className="text-center mb-6">
								<div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<User className="w-12 h-12 text-blue-600" />
								</div>

								{isEditing ? (
									<input
										type="text"
										value={editForm.name || ""}
										onChange={(e) =>
											setEditForm((prev) => ({
												...prev,
												name: e.target.value,
											}))
										}
										className="text-xl font-semibold text-gray-900 text-center bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
									/>
								) : (
									<h3 className="text-xl font-semibold text-gray-900">
										{session.user?.name}
									</h3>
								)}
							</div>

							<div className="space-y-4">
								<div className="flex items-center gap-3 text-gray-600">
									<Mail className="w-4 h-4" />
									<span className="text-sm">
										{session.user?.email}
									</span>
								</div>

								<div className="flex items-center gap-3 text-gray-600">
									<Calendar className="w-4 h-4" />
									<span className="text-sm">
										Joined{" "}
										{userStats?.joinedDate
											? new Date(
													userStats.joinedDate
											  ).toLocaleDateString()
											: "Recently"}
									</span>
								</div>

								{isEditing ? (
									<div className="space-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Bio
											</label>
											<textarea
												value={editForm.bio || ""}
												onChange={(e) =>
													setEditForm((prev) => ({
														...prev,
														bio: e.target.value,
													}))
												}
												placeholder="Tell us about yourself..."
												className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
												rows={3}
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Target Role
											</label>
											<input
												type="text"
												value={
													editForm.targetRole || ""
												}
												onChange={(e) =>
													setEditForm((prev) => ({
														...prev,
														targetRole:
															e.target.value,
													}))
												}
												placeholder="e.g., Software Engineer, Product Manager"
												className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Experience Level
											</label>
											<select
												value={
													editForm.experienceLevel ||
													"beginner"
												}
												onChange={(e) =>
													setEditForm((prev) => ({
														...prev,
														experienceLevel: e
															.target
															.value as any,
													}))
												}
												className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
												<option value="beginner">
													Beginner
												</option>
												<option value="intermediate">
													Intermediate
												</option>
												<option value="advanced">
													Advanced
												</option>
											</select>
										</div>
									</div>
								) : (
									<div className="space-y-3">
										{editForm.bio && (
											<p className="text-sm text-gray-600">
												{editForm.bio}
											</p>
										)}
										{editForm.targetRole && (
											<div className="flex items-center gap-2">
												<Target className="w-4 h-4 text-gray-400" />
												<span className="text-sm text-gray-600">
													{editForm.targetRole}
												</span>
											</div>
										)}
										{editForm.experienceLevel && (
											<div className="flex items-center gap-2">
												<Award className="w-4 h-4 text-gray-400" />
												<span className="text-sm text-gray-600 capitalize">
													{editForm.experienceLevel}
												</span>
											</div>
										)}
									</div>
								)}
							</div>

							<button
								onClick={handleLogout}
								className="w-full mt-6 bg-red-50 hover:bg-red-100 text-red-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
								<LogOut className="w-4 h-4" />
								Sign Out
							</button>
						</div>
					</div>

					{/* Statistics Dashboard */}
					<div className="lg:col-span-2">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
							{/* Daily Questions */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
											<CheckCircle className="w-5 h-5 text-blue-600" />
										</div>
										<div>
											<h3 className="font-semibold text-gray-900">
												Today's Progress
											</h3>
											<p className="text-sm text-gray-600">
												Questions solved today
											</p>
										</div>
									</div>
								</div>
								<div className="text-3xl font-bold text-blue-600 mb-2">
									{userStats?.dailyQuestionsSolved || 0}
								</div>
								<p className="text-sm text-gray-500">
									Keep it up! 🎯
								</p>
							</div>

							{/* Total Questions */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
											<BookOpen className="w-5 h-5 text-green-600" />
										</div>
										<div>
											<h3 className="font-semibold text-gray-900">
												Total Solved
											</h3>
											<p className="text-sm text-gray-600">
												All time questions
											</p>
										</div>
									</div>
								</div>
								<div className="text-3xl font-bold text-green-600 mb-2">
									{userStats?.totalQuestionsSolved || 0}
								</div>
								<p className="text-sm text-gray-500">
									Great progress! 📈
								</p>
							</div>

							{/* Current Streak */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
											<Flame className="w-5 h-5 text-orange-600" />
										</div>
										<div>
											<h3 className="font-semibold text-gray-900">
												Current Streak
											</h3>
											<p className="text-sm text-gray-600">
												Consecutive days
											</p>
										</div>
									</div>
								</div>
								<div className="text-3xl font-bold text-orange-600 mb-2">
									{userStats?.currentStreak || 0}
								</div>
								<p className="text-sm text-gray-500">
									Best: {userStats?.longestStreak || 0} days
									🔥
								</p>
							</div>
							<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
								<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
									<TrendingUp className="w-5 h-5" />
									Daily Activity
								</h3>
								<CalendarHeatmap
									activity={activityMap}
									days={90}
								/>
								<p className="text-sm text-gray-500 mt-2">
									Past 90 days
								</p>
							</div>

							{/* Practice Time */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
											<Clock className="w-5 h-5 text-purple-600" />
										</div>
										<div>
											<h3 className="font-semibold text-gray-900">
												Practice Time
											</h3>
											<p className="text-sm text-gray-600">
												Total time spent
											</p>
										</div>
									</div>
								</div>
								<div className="text-3xl font-bold text-purple-600 mb-2">
									{formatTime(
										userStats?.totalPracticeTime || 0
									)}
								</div>
								<p className="text-sm text-gray-500">
									Time well invested! ⏰
								</p>
							</div>
						</div>

						{/* Detailed Statistics */}
						<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
							<h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
								<BarChart3 className="w-5 h-5" />
								Performance Overview
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Accuracy */}
								<div>
									<div className="flex justify-between items-center mb-2">
										<span className="text-sm font-medium text-gray-700">
											Average Accuracy
										</span>
										<span className="text-sm text-gray-900 font-semibold">
											{userStats?.averageAccuracy || 0}%
										</span>
									</div>
									<div className="w-full bg-gray-200 rounded-full h-2">
										<div
											className="bg-blue-600 h-2 rounded-full transition-all duration-300"
											style={{
												width: `${
													userStats?.averageAccuracy ||
													0
												}%`,
											}}></div>
									</div>
								</div>

								{/* Difficulty Breakdown */}
								<div>
									<h4 className="text-sm font-medium text-gray-700 mb-3">
										Questions by Difficulty
									</h4>
									<div className="space-y-2">
										<div className="flex justify-between text-sm">
											<span className="text-green-600">
												Easy
											</span>
											<span className="font-medium">
												{userStats?.difficultyBreakdown
													?.easy || 0}
											</span>
										</div>
										<div className="flex justify-between text-sm">
											<span className="text-yellow-600">
												Medium
											</span>
											<span className="font-medium">
												{userStats?.difficultyBreakdown
													?.medium || 0}
											</span>
										</div>
										<div className="flex justify-between text-sm">
											<span className="text-red-600">
												Hard
											</span>
											<span className="font-medium">
												{userStats?.difficultyBreakdown
													?.hard || 0}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Favorite Topics */}
						{userStats?.favoriteTopics &&
							userStats.favoriteTopics.length > 0 && (
								<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
									<h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
										<Trophy className="w-5 h-5" />
										Favorite Topics
									</h3>
									<div className="flex flex-wrap gap-2">
										{userStats.favoriteTopics.map(
											(topic, index) => (
												<span
													key={index}
													className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
													{topic}
												</span>
											)
										)}
									</div>
								</div>
							)}
					</div>
				</div>
			</div>
		</div>
	);
}
