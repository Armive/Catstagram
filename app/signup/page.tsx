"use client";
import { type FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Progress } from "@/components/shared/ui/progress";
import { Input } from "@/components/shared/ui/input";
import { Button } from "@/components/shared/ui/button";
import {
	EmailIcon,
	GithubIcon,
	LeftArrow,
	RightArrow,
} from "@/components/shared/icons";
import { Label } from "@/components/shared/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/shared/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shared/ui/select";
import clsx from "clsx";
import { onGithubLogin, SignUp } from "@/lib/actions";
import { type SignUpType, User } from "@/lib/schemas";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { useToast } from "@/components/shared/ui/use-toast";
import { useDebouncedCallback } from "use-debounce";

export default function SignUpPage() {
	const { toast } = useToast();
	const [emailVerificationHelpLink, setEmailVerificationHelpLink] =
		useState<string>("");
	const [userData, setUserData] = useState<SignUpType>({
		name: "",
		email: "",
		password: "",
		day: 0,
		month: 0,
		year: 0,
		gender: "none",
		handle: "",
	});
	const [view, setView] = useState(0);
	const [loading, setLoading] = useState(false);
	const [handle, setHandle] = useState("");
	const [handleMessage, setHandleMessage] = useState("");
	const [isHandleAvailable, setIsHandleAvailable] = useState(false);
	const checkUser = () => {
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
		return validatedData.success;
	};
	const submit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = Object.fromEntries(
			new FormData(e.target as unknown as HTMLFormElement).entries(),
		) as unknown as SignUpType;
		setUserData((data) => ({ ...data, ...formData }));
		const success = checkUser();
		if (!success || !isHandleAvailable || Boolean(handleMessage)) return;
		setLoading(true);
		const { status } = await SignUp(userData);

		if (status === "ok") {
			setLoading(false);
			setView(2);
			if (userData?.email?.includes("gmail")) {
				setEmailVerificationHelpLink("https://mail.google.com/mail/u/0/");
			} else if (
				userData?.email?.includes("outlook") ||
				userData?.email?.includes("hotmail")
			) {
				setEmailVerificationHelpLink("https://outlook.live.com/mail/0/");
			}
		} else {
			setLoading(false);
			toast({ title: "Internal server error" });
		}
	};

	// handle  check

	const callback = useDebouncedCallback(async () => {
		const response = await fetch("/api/Providers/email/checkHandle", {
			method: "POST",
			body: JSON.stringify({ handle }),
		});

		const data = await response.json();
		setIsHandleAvailable(data.isAvailable);

		if (!isHandleAvailable) {
			setHandleMessage("Handle is already taken.");
			return;
		}
		setHandleMessage("");
	}, 1000);
	const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setHandle(e.target.value.replace(" ", ""));
		if (handle.length < 5 || handle.length > 30) {
			setIsHandleAvailable(false);
			setHandleMessage("Handle should have more than 5 characters.");
			return;
		}
		callback();
	};

	return (
		<div className="flex justify-between h-screen">
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
								<form
									onSubmit={(e) => {
										submit(e);
										setView((view) => view + 1);
									}}
								>
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
									onClick={() => onGithubLogin()}
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
												onChange={onHandleChange}
												autoComplete="off"
											/>
											<AnimatePresence>
												{handle.length >= 5 && (
													<motion.div
														initial={{ opacity: 0 }}
														animate={{ opacity: 1 }}
														exit={{ opacity: 0 }}
														transition={{ duration: 0.3 }}
														className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center absolute right-1 top-1"
													>
														{isHandleAvailable ? (
															<Check strokeWidth={3} color="#448112" />
														) : (
															<X color="#a71616" strokeWidth={3} />
														)}
													</motion.div>
												)}
											</AnimatePresence>
											<p className="text-red-500 font-medium text-sm">
												{handle.length === 0 ? "" : handleMessage}
											</p>
										</div>
									</div>
									<section className="flex justify-center items-center gap-3 mt-4">
										<Button
											type="button"
											className="mt-4"
											onClick={() => setView((v) => v - 1)}
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
			<div className="hidden bg-muted lg:block w-[50vw]">
				<Image
					src="/catSignup.png"
					alt="Image"
					width="1920"
					height="1080"
					className="h-full w-full object-cover"
				/>
			</div>
		</div>
	);
}
