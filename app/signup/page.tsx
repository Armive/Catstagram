"use client";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	BirthdayIcon,
	EmailIcon,
	GithubIcon,
	LeftArrow,
	PasswordIcon,
	RightArrow,
} from "@/components/icons";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
	Card,
	CardContent,
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

export default function SignUp() {
	const [view, setView] = useState(0);
	const newLocal = "";
	const onSubmit = (e: any) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		setView((v) => v + 1);
	};

	return (
		<main className="flex justify-center">
			{view === 0 && (
				<Card className="w-[350px] ">
					<CardHeader className="flex items-center">
						<Image
							src="/catstagram.png"
							alt="catslogo"
							className=" hidden xl:flex dark:invert self-center"
							width={159}
							height={38}
						/>
						<CardTitle>Create Your Account</CardTitle>
						<PasswordIcon />
					</CardHeader>
					<CardContent>
						<form onSubmit={onSubmit}>
							<div className="grid w-full items-center gap-4">
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="name">Your Name</Label>
									<Input id="Name" name="name" placeholder="Tomy.cat" />
								</div>
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="email">Your Email</Label>
									<Input
										type="email"
										id="email"
										placeholder="johndoe@gmail.com"
									/>
								</div>
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="password">Your Password</Label>
									<Input type="password" id="password" placeholder="*******" />
								</div>
							</div>
							<section className="flex justify-center items-center gap-3 mt-4">
								<Button type="submit" className="mt-4">
									<span>Go Back</span>
									<LeftArrow />
								</Button>
								<Button type="submit" className="mt-4">
									<span>Next step</span>
									<RightArrow />
								</Button>
							</section>
						</form>
					</CardContent>
				</Card>
			)}
			{view === 1 && (
				<Card className="w-[350px]">
					<CardHeader className="flex items-center">
						<Image
							src="/catstagram.png"
							alt="catslogo"
							className=" hidden xl:flex dark:invert self-center"
							width={159}
							height={38}
						/>

						<CardTitle>Date of birth and gender</CardTitle>
						<BirthdayIcon />
					</CardHeader>
					<CardContent>
						<form onSubmit={onSubmit} className="flex gap-4 flex-col">
							<section className="flex w-full items-center justify-center gap-4">
								<div className="flex flex-col space-y-1.5 items-center">
									<Label htmlFor="day">Day</Label>
									<Input id="day" name="day" placeholder="8" />
								</div>
								<div className="flex flex-col space-y-1.5 items-center">
									<Label htmlFor="month">Month</Label>
									<Input id="month" name="month" placeholder="11" />
								</div>
								<div className="flex flex-col space-y-1.5 items-center">
									<Label htmlFor="year">Year</Label>
									<Input id="year" name="year" placeholder="2021" />
								</div>
							</section>

							<section className="flex items-center gap-3 flex-col">
								<Label htmlFor="gender">Gender</Label>
								<Select>
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
							<section className="flex justify-center items-center gap-3 mt-4">
								<Button type="submit" className="mt-4">
									<span>Go Back</span>
									<LeftArrow />
								</Button>
								<Button type="submit" className="mt-4">
									<span>Next step</span>
									<RightArrow />
								</Button>
							</section>
						</form>
					</CardContent>
				</Card>
			)}
			{view === 2 && (
				<Card className="w-[350px]">
					<CardHeader className="flex items-center">
						<Image
							src="/catstagram.png"
							alt="catslogo"
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
						<section className="flex justify-center items-center gap-3 mt-4">
							<Button type="submit">
								<LeftArrow />
								<span>Go Back</span>
							</Button>
							<a
								href="http://"
								target="_blank"
								rel="noopener noreferrer"
								className="text-black/80 hover:text-gray-500 dark:text-white duration-200 text-center"
							>
								Click to confirm Email
							</a>
						</section>
					</CardContent>
				</Card>
			)}
		</main>
	);
}
