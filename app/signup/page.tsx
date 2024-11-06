"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { EmailIcon } from "@/components/shared/icons";
import { Cat, ArrowLeft, Github, CheckCircle, XCircle } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shared/ui/select";
import { Calendar } from "@/components/shared/Calendar";
import { CardContent, CardHeader } from "@/components/shared/ui/card";
import Link from "next/link";
import { type SignUpType, User } from "@/lib/schemas";
import { githubLoginAction, signUpAction } from "@/lib/actions";

export default function SignUp() {
	const [emailVerificationHelpLink, setEmailVerificationHelpLink] = useState<
		string | null
	>(null);
	const [userData, setUserData] = useState<SignUpType>({
		name: "",
		email: "",
		password: "",
		day: 0,
		month: 0,
		year: 0,
		gender: null,
		handle: "",
	});
	const [step, setStep] = useState(1);

	const handleNext = () => {
		if (step < 4) setStep(step + 1);
	};

	const handleBack = () => {
		if (step > 1) setStep(step - 1);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const formData = Object.fromEntries(
			new FormData(e.target as HTMLFormElement).entries(),
		) as unknown as SignUpType;
		setUserData((data) => ({ ...data, ...formData }));
		if (step < 3) {
			handleNext();
		} else {
			const { data, success } = User.safeParse({
				email: userData.email,
				password: userData.password,
				name: userData.name,
				day: Number(userData.day),
				month: Number(userData.month),
				year: Number(userData.year),
				gender: userData.gender,
				handle: userData.handle,
			});
			if (!success) return;
			signUpAction(data);

			setStep(4);
			if (userData?.email?.includes("gmail")) {
				setEmailVerificationHelpLink("https://mail.google.com/mail/u/0/");
			} else if (
				userData?.email?.includes("outlook") ||
				userData?.email?.includes("hotmail")
			) {
				setEmailVerificationHelpLink("https://outlook.live.com/mail/0/");
			}
			// Here you would typically send the data to your backend
		}
	};

	//handle
	const [handle, setHandle] = useState("");
	const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
	const [isChecking, setIsChecking] = useState(false);

	useEffect(() => {
		const isValid = /^[a-zA-Z0-9_]{5,30}$/.test(handle);
		if (!isValid) return setIsAvailable(false);
		setIsChecking(true);
		fetch("api/checkHandle", {
			method: "POST",
			body: JSON.stringify({ handle }),
		})
			.then((res) => res.json())
			.then((data) => {
				setIsAvailable(data.isAvailable);
				setIsChecking(false);
				console.log(data);
			});
	}, [handle]);

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-background text-black p-4">
			<Cat className="w-16 h-16 mb-8 text-foreground" />
			<h1 className="text-4xl text-foreground font-bold text-center mb-8 max-w-[300px]">
				Sign up to see furry animals.
			</h1>
			<div className="w-full max-w-[300px] space-y-4">
				{step < 4 && (
					<Button
						onClick={handleBack}
						className=" dark:text-foreground"
						variant="link"
					>
						<ArrowLeft className="mr-2 h-4 w-4" /> Back
					</Button>
				)}
				<div className="space-y-4">
					{step === 1 && (
						<form className="flex flex-col gap-3" onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="email"
									className="block text-foreground text-sm mb-2"
								>
									Email Address
								</label>
								<Input
									type="email"
									placeholder="Example: furry.pet@gmail.com"
									className="w-full rounded dark:text-white text-foreground"
									required
									name="email"
									minLength={5}
									maxLength={60}
									defaultValue={userData.email}
									autoComplete="off"
								/>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block text-foreground text-sm mb-2"
								>
									Password
								</label>

								<Input
									type="password"
									placeholder="Don't forget pas-sword"
									name="password"
									className="w-full border-border rounded dark:text-white text-foreground"
									required
									minLength={6}
									maxLength={30}
									defaultValue={userData.password}
									autoComplete="off"
								/>
							</div>
							<Button
								type="submit"
								className="dark:text-black dark:bg-white hover:dark:bg-black  hover:dark:text-white bg-black hover:bg-white hover:text-black "
							>
								Next Step
							</Button>
						</form>
					)}
					{step === 2 && (
						<form className="flex flex-col gap-3" onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="name"
									className="block text-sm mb-2 dark:text-white"
								>
									Your Name
								</label>

								<Input
									type="text"
									placeholder="Write down your name"
									className="w-full border-gray-300 rounded text-foreground"
									required
									name="name"
									minLength={2}
									defaultValue={userData.name}
									autoComplete="off"
								/>
							</div>
							<div className="max-w-md mx-auto w-full">
								<label
									htmlFor="username"
									className="block text-sm mb-2 dark:text-white "
								>
									Your Username
								</label>
								<div className="relative flex flex-col">
									<Input
										type="text"
										value={handle}
										onChange={(e) =>
											setHandle(e.target.value.replace(/\s/g, ""))
										}
										aria-label="Handle input"
										placeholder="Choose the furry little paw username"
										className="w-full border-gray-300 rounded pr-10 text-foreground "
										required
										id="username"
										name="handle"
										autoComplete="off"
										minLength={5}
										maxLength={30}
									/>
									{handle.length > 0 && (
										<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
											{isChecking ? (
												<div className="w-5 h-5 border-t-2 border-blue-500 rounded-full animate-rotate-360 animate-iteration-count-infinite" />
											) : isAvailable ? (
												<CheckCircle
													className="w-5 h-5 text-green-500"
													aria-label="Handle is available"
												/>
											) : (
												<XCircle
													className="w-5 h-5 text-red-500"
													aria-label="Handle is not available or invalid"
												/>
											)}
										</div>
									)}
								</div>
								{handle.length > 0 && !isChecking && (
									<p
										className={`text-sm ${isAvailable ? "text-green-600" : "text-red-600"}`}
									>
										{isAvailable
											? "This user name is available!"
											: handle.length >= 5
												? "This user name is not available or invalid."
												: "This user name is too short."}
									</p>
								)}
								<p className="text-sm text-gray-600 dark:text-gray-400">
									5-30 characters, use A-Z, 0-9, or _ only.
								</p>
							</div>

							<div>
								<label
									htmlFor="gender"
									className="block text-sm mb-2 dark:text-white text-foreground"
								>
									Your Gender
								</label>
								<Select
									name="gender"
									defaultValue={userData.gender || ""}
									autoComplete="off"
								>
									<SelectTrigger
										id="gender"
										className="w-full max-w-xs h-[38px] px-3 bg-background border dark:border-white rounded-[4px] shadow-sm text-muted-foreground text-[14px] focus:outline-none focus:ring-0 focus:border-[#D1D5DB]"
									>
										<SelectValue placeholder="Choose the furry little paw gender" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="male" className="text-foreground">
											Male
										</SelectItem>
										<SelectItem value="female" className="text-foreground">
											Female
										</SelectItem>
										<SelectItem value="none" className="text-foreground">
											Don&apos;t want to say
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<Button
								disabled={!isAvailable}
								type="submit"
								className="dark:text-black dark:bg-white hover:dark:bg-black  hover:dark:text-white bg-black hover:bg-white hover:text-black "
							>
								Next Step
							</Button>
						</form>
					)}
					{step === 3 && (
						<form onSubmit={handleSubmit} className="flex flex-col gap-3">
							<Calendar />
							<Button
								type="submit"
								className="dark:text-black dark:bg-white hover:dark:bg-black  hover:dark:text-white bg-black hover:bg-white hover:text-black "
							>
								Next Step
							</Button>
						</form>
					)}
					{step === 4 && (
						<div>
							<CardHeader className="flex items-center">
								<EmailIcon />
							</CardHeader>
							<CardContent className="flex justify-center flex-col items-center gap-4 ">
								<p className="text-center ">
									We have sent an account verification email to {userData.email}
								</p>

								{emailVerificationHelpLink ? (
									<Link href={emailVerificationHelpLink}>
										{" "}
										<Button
											type="submit"
											className="dark:text-black dark:bg-white hover:dark:bg-black  hover:dark:text-white bg-black hover:bg-white hover:text-black "
										>
											Go to your email
										</Button>
									</Link>
								) : null}
							</CardContent>
						</div>
					)}
					{step === 1 ? (
						<>
							<div className="relative">
								<hr className="border-gray-300 my-6" />
								<span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-gray-500">
									or
								</span>
							</div>
							<Button
								className="w-full border-black text-black hover:bg-black hover:text-white rounded-full border dark:border-white bg-transparent hover:dark:bg-white dark:text-white gap-3 hover:dark:text-black"
								onClick={() => githubLoginAction()}
							>
								<Github className="w-5 h-5" />
								Log in with Github
							</Button>
						</>
					) : null}
				</div>
			</div>
			{step < 4 ? (
				<Link
					href="/login"
					className="mt-8 text-foreground text-sm hover:underline"
				>
					Already have an account? Log in
				</Link>
			) : null}
		</div>
	);
}
