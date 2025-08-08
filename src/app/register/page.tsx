"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
	Eye,
	EyeOff,
	Mail,
	Lock,
	User,
	Users,
	ArrowRight,
	CheckCircle2,
	AlertCircle,
} from "lucide-react";

interface RegisterFormData {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface RegisterPageProps {
	callbackUrl?: string;
}

interface PasswordRequirement {
	text: string;
	met: boolean;
}

export default function RegisterPage({ callbackUrl = "/" }: RegisterPageProps) {
	const [formData, setFormData] = useState<RegisterFormData>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<string>("");
	const router = useRouter();

	const handleInputChange =
		(field: keyof RegisterFormData) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setFormData((prev) => ({
				...prev,
				[field]: e.target.value,
			}));
			// Clear messages when user starts typing
			if (error) setError("");
			if (success) setSuccess("");
		};

	// Password validation requirements
	const passwordRequirements: PasswordRequirement[] = [
		{ text: "At least 8 characters", met: formData.password.length >= 8 },
		{
			text: "Contains uppercase letter",
			met: /[A-Z]/.test(formData.password),
		},
		{
			text: "Contains lowercase letter",
			met: /[a-z]/.test(formData.password),
		},
		{ text: "Contains number", met: /\d/.test(formData.password) },
	];

	const isPasswordStrong = passwordRequirements.every((req) => req.met);
	const passwordsMatch =
		formData.password === formData.confirmPassword &&
		formData.confirmPassword !== "";
	const isFormValid =
		formData.name.trim().length >= 2 &&
		formData.email.includes("@") &&
		isPasswordStrong &&
		passwordsMatch;

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");
		setSuccess("");

		if (!isFormValid) {
			setError("Please complete all fields correctly.");
			setIsLoading(false);
			return;
		}

		try {
			const res = await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: formData.name.trim(),
					email: formData.email.toLowerCase(),
					password: formData.password,
				}),
			});

			const data = await res.json();

			if (res.ok) {
				setSuccess("Account created successfully! Signing you in...");

				// Auto sign in after successful registration
				const signInResult = await signIn("credentials", {
					email: formData.email.toLowerCase(),
					password: formData.password,
					callbackUrl,
					redirect: false,
				});

				if (signInResult?.ok) {
					router.push(callbackUrl);
				} else {
					setError(
						"Account created but sign-in failed. Please try logging in manually."
					);
				}
			} else {
				setError(
					data.message || "Registration failed. Please try again."
				);
			}
		} catch (err) {
			setError(
				"Network error. Please check your connection and try again."
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
			<div className="max-w-md w-full">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
						<Users className="w-8 h-8 text-white" />
					</div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Create Account
					</h1>
					<p className="text-gray-600">
						Join us to start practicing for your interviews
					</p>
				</div>

				{/* Registration Form */}
				<div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Name Field */}
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700 mb-2">
								Full Name
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<User className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="name"
									type="text"
									required
									value={formData.name}
									onChange={handleInputChange("name")}
									className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
									placeholder="Enter your full name"
									disabled={isLoading}
									minLength={2}
								/>
							</div>
						</div>

						{/* Email Field */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-2">
								Email Address
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="email"
									type="email"
									required
									value={formData.email}
									onChange={handleInputChange("email")}
									className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
									placeholder="Enter your email"
									disabled={isLoading}
								/>
							</div>
						</div>

						{/* Password Field */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 mb-2">
								Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									required
									value={formData.password}
									onChange={handleInputChange("password")}
									className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
									placeholder="Create a strong password"
									disabled={isLoading}
								/>
								<button
									type="button"
									onClick={() =>
										setShowPassword(!showPassword)
									}
									className="absolute inset-y-0 right-0 pr-3 flex items-center"
									disabled={isLoading}>
									{showPassword ? (
										<EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
									) : (
										<Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
									)}
								</button>
							</div>

							{/* Password Requirements */}
							{formData.password && (
								<div className="mt-3 space-y-2">
									{passwordRequirements.map(
										(requirement, index) => (
											<div
												key={index}
												className="flex items-center gap-2">
												{requirement.met ? (
													<CheckCircle2 className="h-4 w-4 text-green-500" />
												) : (
													<AlertCircle className="h-4 w-4 text-gray-400" />
												)}
												<span
													className={`text-sm ${
														requirement.met
															? "text-green-600"
															: "text-gray-500"
													}`}>
													{requirement.text}
												</span>
											</div>
										)
									)}
								</div>
							)}
						</div>

						{/* Confirm Password Field */}
						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium text-gray-700 mb-2">
								Confirm Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="confirmPassword"
									type={
										showConfirmPassword
											? "text"
											: "password"
									}
									required
									value={formData.confirmPassword}
									onChange={handleInputChange(
										"confirmPassword"
									)}
									className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
										formData.confirmPassword &&
										!passwordsMatch
											? "border-red-300 focus:border-red-500"
											: formData.confirmPassword &&
											  passwordsMatch
											? "border-green-300 focus:border-green-500"
											: "border-gray-300 focus:border-blue-500"
									}`}
									placeholder="Confirm your password"
									disabled={isLoading}
								/>
								<button
									type="button"
									onClick={() =>
										setShowConfirmPassword(
											!showConfirmPassword
										)
									}
									className="absolute inset-y-0 right-0 pr-3 flex items-center"
									disabled={isLoading}>
									{showConfirmPassword ? (
										<EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
									) : (
										<Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
									)}
								</button>
							</div>

							{/* Password Match Indicator */}
							{formData.confirmPassword && (
								<div className="mt-2 flex items-center gap-2">
									{passwordsMatch ? (
										<>
											<CheckCircle2 className="h-4 w-4 text-green-500" />
											<span className="text-sm text-green-600">
												Passwords match
											</span>
										</>
									) : (
										<>
											<AlertCircle className="h-4 w-4 text-red-500" />
											<span className="text-sm text-red-600">
												Passwords don't match
											</span>
										</>
									)}
								</div>
							)}
						</div>

						{/* Success Message */}
						{success && (
							<div className="bg-green-50 border border-green-200 rounded-lg p-3">
								<p className="text-sm text-green-600">
									{success}
								</p>
							</div>
						)}

						{/* Error Message */}
						{error && (
							<div className="bg-red-50 border border-red-200 rounded-lg p-3">
								<p className="text-sm text-red-600">{error}</p>
							</div>
						)}

						{/* Submit Button */}
						<button
							type="submit"
							disabled={!isFormValid || isLoading}
							className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
							{isLoading ? (
								<>
									<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
									Creating Account...
								</>
							) : (
								<>
									Create Account
									<ArrowRight className="w-4 h-4" />
								</>
							)}
						</button>
					</form>

					{/* Footer Links */}
					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600">
							Already have an account?{" "}
							<button
								type="button"
								className="text-blue-600 hover:text-blue-700 font-medium">
								Sign in here
							</button>
						</p>
					</div>
				</div>

				{/* Additional Info */}
				<div className="mt-8 text-center">
					<p className="text-xs text-gray-500">
						By creating an account, you agree to our Terms of
						Service and Privacy Policy
					</p>
				</div>
			</div>
		</div>
	);
}
