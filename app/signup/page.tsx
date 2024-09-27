"use client";
import { type FormEvent, useContext, useEffect, useState } from "react";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Progress } from "@/components/ui/progress";
import { SignUpContext } from "@/components/signUpContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	EmailIcon,
	GithubIcon,
	LeftArrow,
	RightArrow,
} from "@/components/icons";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";

const User = z.object({
	name: z.string(),
	email: z.string().email().min(5),
	password: z.string().min(6).max(30),
	day: z.number().lt(31).gt(0),
	month: z.number().lt(12).gt(0),
	year: z.number().gt(1950).lt(2014),
	gender: z.enum(["male", "female", "none"]),
	handle: z.string().min(5).max(30),
});

export default function SignUp() {
	const router = useRouter();
	const [emailVerificationHelpLink, setEmailVerificationHelpLink] =
		useState<string>("");
	const { setUserData, userData } = useContext(SignUpContext);

	const [view, setView] = useState(0);
	const [loading, setLoading] = useState(false);
	const [handle, setHandle] = useState("");
	const [handleMessage, setHandleMessage] = useState("");
	const [isHandleAvailable, setIsHandleAvailable] = useState(false);

	const onGoBack = () => {
		setView((view) => view - 1);
	};

	const onGithubSignup = async () => {
		const response = await fetch(
			`${document.location.origin}/api/Providers/github`,
			{
				method: "POST",
			},
		);
		const data = await response.json();
		router.replace(data.url);
	};

	const nextStep = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setView((view) => view + 1);

		const formData = Object.fromEntries(
			new FormData(e.target as unknown as HTMLFormElement).entries(),
		) as SignUpData;
		setUserData((data: SignUpData) => ({ ...data, ...formData }));
	};

	const submit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = Object.fromEntries(
			new FormData(e.target as unknown as HTMLFormElement).entries(),
		) as SignUpData;
		setUserData((data: SignUpData) => ({ ...data, ...formData }));
	};

	useEffect(() => {
		const { name, email, password, day, month, year, gender, handle } =
			userData;

		const validatedData = User.safeParse({
			name,
			email,
			password,
			day: Number(day),
			month: Number(month),
			year: Number(year),
			gender,
			handle,
		});
		if (!validatedData.success) return;
		const signUpUser = async (data: SignUpData) => {
			if (!isHandleAvailable) return;
			setLoading(true);
			const response = await fetch(
				`${document.location.origin}/api/Providers/email/signup`,
				{
					body: JSON.stringify(data),
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			if (response.status === 200) {
				setLoading(false);
				setView(2);
				if (data?.email?.includes("gmail")) {
					setEmailVerificationHelpLink("https://mail.google.com/mail/u/0/");
				} else if (
					data?.email?.includes("outlook") ||
					data?.email?.includes("hotmail")
				) {
					setEmailVerificationHelpLink("https://outlook.live.com/mail/0/");
				}
			}
		};

		signUpUser(validatedData.data);
	}, [userData, isHandleAvailable]);

	// handle  check

	useEffect(() => {
		setHandle(handle.replace(" ", ""));
		if (handle.length < 5 || handle.length > 30) {
			setIsHandleAvailable(false);
			setHandleMessage("Handle should have more than 5 characters.");
			return;
		}

		fetch("/api/Providers/email/checkHandle", {
			method: "POST",
			body: JSON.stringify({ handle }),
		})
			.then((response) => response.json())
			.then((data) => setIsHandleAvailable(data.isAvailable));

		if (!isHandleAvailable) {
			setHandleMessage("Handle is already taken.");
			return;
		}
		setHandleMessage("");
	}, [handle, isHandleAvailable]);

	return (
		<main className="flex justify-center w-full p-4  lg:w-[50vw]">
			<Card
				className={clsx("w-[350px] p-2 h-fit duration-1000", {
					"animate-pulse": loading,
				})}
			>
				<Progress value={33.3 * (view + 1)} />

				{view === 0 && (
					<>
						<CardHeader className="flex items-center">
							<Image
								src="/catstagram.png"
								alt="catsLogo"
								className=" hidden xl:flex dark:invert self-center"
								width={159}
								height={38}
							/>
							<CardTitle>Create Your Account</CardTitle>
							<CardDescription className="text-center">
								Write your details in the below form
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={nextStep}>
								<div className="grid w-full items-center gap-4">
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="name">Your Name</Label>
										<Input
											id="Name"
											name="name"
											placeholder="Tomy.cat"
											required
											disabled={loading}
											maxLength={20}
											autoComplete="off"
											defaultValue={userData.name}
										/>
									</div>
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="email">Your Email</Label>
										<Input
											type="email"
											id="email"
											placeholder="johndoe@gmail.com"
											name="email"
											required
											disabled={loading}
											maxLength={50}
											autoComplete="off"
											defaultValue={userData.email}
										/>
									</div>
									<div className="flex flex-col space-y-1.5 w-full">
										<Label htmlFor="password">Your Password</Label>
										<Input
											type="password"
											id="password"
											placeholder="*******"
											defaultValue={userData.password}
											name="password"
											required
											disabled={loading}
											maxLength={30}
											minLength={6}
											autoComplete="off"
										/>
									</div>
								</div>
								<Button
									type="submit"
									className="mt-4 w-full"
									disabled={loading}
								>
									<span>Next step</span>
									<RightArrow />
								</Button>
							</form>
							<div className="flex items-center my-4">
								<div className="flex-grow border-t " />
								<span className="mx-4 text-sm ">OR</span>
								<div className="flex-grow border-t " />
							</div>
							<Button
								onClick={onGithubSignup}
								className="flex items-center justify-center space-x-2 w-full"
								disabled={loading}
							>
								<GithubIcon />
								<span>Sign up with Github</span>
							</Button>
						</CardContent>
						<CardFooter className="flex justify-center">
							<Link href="/login" className="text-center">
								Have An Account? Log In
							</Link>
						</CardFooter>
					</>
				)}
				{view === 1 && (
					<>
						<CardHeader className="flex items-center">
							<Image
								src="/catstagram.png"
								alt="catsLogo"
								className=" hidden xl:flex dark:invert self-center"
								width={159}
								height={38}
							/>

							<CardTitle>Date of birth and gender</CardTitle>
							<CardDescription>
								Write your details in the below form
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={submit} className="flex gap-4 flex-col">
								<section className="flex w-full items-center justify-center gap-4">
									<div className="flex flex-col space-y-1.5 items-center">
										<Label htmlFor="day">Day</Label>
										<Input
											id="day"
											name="day"
											placeholder="8"
											required
											type="number"
											min="1"
											max="31"
											disabled={loading}
											maxLength={2}
										/>
									</div>
									<div className="flex flex-col space-y-1.5 items-center">
										<Label htmlFor="month">Month</Label>
										<Input
											id="month"
											name="month"
											placeholder="11"
											required
											type="number"
											min="1"
											max="12"
											disabled={loading}
											maxLength={2}
										/>
									</div>
									<div className="flex flex-col space-y-1.5 items-center">
										<Label htmlFor="year">Year</Label>
										<Input
											id="year"
											name="year"
											placeholder="2012"
											required
											type="number"
											min="1950"
											max="2014"
											disabled={loading}
											minLength={4}
											maxLength={4}
										/>
									</div>
								</section>

								<section className="flex items-center gap-3 flex-col">
									<Label htmlFor="gender">Gender</Label>
									<Select name="gender" required disabled={loading}>
										<SelectTrigger id="gender">
											<SelectValue placeholder="Select your gender" />
										</SelectTrigger>
										<SelectContent position="popper">
											<SelectItem value="female">Female</SelectItem>
											<SelectItem value="male">Male</SelectItem>
											<SelectItem value="none">Better not to say</SelectItem>
										</SelectContent>
									</Select>
								</section>
								<div className="flex flex-col space-y-1.5 items-center">
									<Label htmlFor="year">Handle</Label>
									<div className="relative w-full">
										<Input
											id="handle"
											name="handle"
											placeholder="guaudev"
											required
											type="text"
											disabled={loading}
											minLength={5}
											maxLength={30}
											value={handle}
											onChange={(e) => setHandle(e.target.value)}
										/>
										{isHandleAvailable ? "✔" : "❌"}
										<p className="text-red-500 font-medium text-sm">
											{handle.length === 0 ? "" : handleMessage}
										</p>
									</div>
								</div>
								<section className="flex justify-center items-center gap-3 mt-4">
									<Button
										type="button"
										className="mt-4"
										onClick={onGoBack}
										disabled={loading}
									>
										<LeftArrow />
										<span>Go Back</span>
									</Button>
									<Button
										type="submit"
										className="mt-4 w-32"
										disabled={loading}
									>
										<span>{loading ? "Loading" : "Next step"}</span>
										<RightArrow />
									</Button>
								</section>
							</form>
						</CardContent>
						<CardFooter className="flex justify-center">
							<Link href="/login" className="text-center">
								Have An Account? Log In
							</Link>
						</CardFooter>
					</>
				)}
				{view === 2 && (
					<>
						<CardHeader className="flex items-center">
							<Image
								src="/catstagram.png"
								alt="catsLogo"
								className=" hidden xl:flex dark:invert self-center"
								width={159}
								height={38}
							/>
							<CardTitle>Verify your email</CardTitle>
							<EmailIcon />
						</CardHeader>
						<CardContent className="flex justify-center flex-col">
							<p className="text-center">
								To enter to Catstagram go to your Email to verify the Email
								address.
							</p>
							{emailVerificationHelpLink && (
								<div className="flex justify-center items-center gap-3 mt-4">
									<a
										href={emailVerificationHelpLink}
										target="_blank"
										rel="noopener noreferrer"
										className="text-black/80 hover:text-gray-500 dark:text-white duration-200 text-center"
									>
										Verify your email here
									</a>
								</div>
							)}
						</CardContent>
					</>
				)}
			</Card>
		</main>
	);
}
