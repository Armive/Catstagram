"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CameraIcon, CheckIcon } from "@/components/icons";
import Link from "next/link";

export default function Create() {
	const [view, setView] = useState(0);
	return (
		<main className="flex justify-center ">
			<Card className="w-[370px] min-h-[370px] p-3">
				<Progress value={33.3 * (view + 1)} />
				{view === 0 && (
					<form onClick={() => setView(view + 1)}>
						<CardHeader className="flex justify-center items-center flex-col">
							<CardTitle>Create Post</CardTitle>
							<CardDescription>
								Create Your Post In A Few minutes
							</CardDescription>
						</CardHeader>
						<CardContent className="flex gap-3 items-center justify-center">
							<CameraIcon />
							<Button>Start</Button>
						</CardContent>
						<CardFooter>
							<ul className="list-disc flex flex-col gap-4 px-4">
								<li>
									Do not upload <b>violence</b> or <b>abuse</b> of animals
								</li>
								<li>
									Only upload things that have to do with <b>animals</b>
								</li>
								<li>
									<b>Don&apos;t plagiarize:</b> Never copy other people&apos;s
									work or ideas without giving them proper credit. Always cite
									sources when using information or content from others and
									respect copyright.
								</li>
							</ul>
						</CardFooter>
					</form>
				)}
				{view === 1 && (
					<form onClick={() => setView(view + 1)}>
						<CardHeader className="flex justify-center items-center flex-col">
							<CardTitle>Create Post</CardTitle>
							<CardDescription>
								Create Your Post In A Few minutes
							</CardDescription>
						</CardHeader>
						<CardContent className="flex gap-3 items-center justify-center">
							<CameraIcon />
							<Button>Finish</Button>
						</CardContent>
						<CardFooter>
							<div className="grid w-full max-w-sm items-center gap-3 cursor-pointer ">
								<Label htmlFor="picture" className="text-center">
									Drag The Photos, Videos Or Choose The File
								</Label>
								<Input
									id="picture"
									type="file"
									className="cursor-pointer"
									accept=".mp4, .mov, .wnv, .avi, .avchd, .flv, .f4v, .swf, .mkv, .webm, .jpg, .png, .tiff, .psd, .bmp, .webp"
								/>
							</div>
						</CardFooter>
					</form>
				)}
				{view === 2 && (
					<form>
						<CardHeader className="flex justify-center items-center flex-col">
							<CardTitle>Create Post</CardTitle>
							<CardDescription>
								Create Your Post In A Few minutes
							</CardDescription>
						</CardHeader>
						<CardContent className="flex gap-3 items-center justify-center flex-col">
							<CheckIcon />
							<p>You Have Finished Making Your Post</p>
						</CardContent>
						<CardFooter className="flex justify-center m-4">
							<Link
								href="/"
								className="bg-white border font-medium border-white text-black rounded-lg duration-200 p-2 hover:bg-gray-200 "
							>
								Return to Homepage
							</Link>
						</CardFooter>
					</form>
				)}
			</Card>
		</main>
	);
}
