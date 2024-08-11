"use client";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
	BookMarkIcon,
	FlagIcon,
	HeartIcon,
	LocationIcon,
	SendIcon,
} from "../icons";
import Image from "next/image";
import { ReportComponent } from "../ReportBar";
import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Comment } from "../Comment";

export function Post({
	url,
	description,
	visualisations,
	place,
	id,
	hearts,
	initialIsheartIconPressed,
	initialIsBookMarkIconPressed,
	comments,
	user,
	userdata,
}: {
	url: string;
	user: { id: string; first_name: "text"; name: string; avatar_url: string };
	title: string;
	description: string;
	id?: string;
	visualisations: number;
	place: string;
	initialIsheartIconPressed: boolean;
	hearts?: string[];
	initialIsBookMarkIconPressed: boolean;
	comments?: {
		comment_id: string;
		post_id: string;
		created_at: string;
		author_id: string;
		content: string;
		subcomments?: string[];
		profiles?: { name: string; avatar_url: string };
	}[];
	userdata?: {
		name: string;
		avatar_url: string;
	};
}) {
	// Hearts
	const [isHeartIconPressed, setIsHeartIconPressed] = useState(
		initialIsheartIconPressed,
	);

	const [isHeartLoading, setIsHeartLoading] = useState(false);

	const onHeartClick = async () => {
		if (!id || isHeartLoading) return;
		setIsHeartLoading(true);
		if (isHeartIconPressed) {
			const response = await fetch(
				`${document.location.origin}/api/posts/hearts/remove`,
				{
					method: "POST",
					body: JSON.stringify({ post_id: id }),
				},
			);
			if (response.status === 200) setIsHeartIconPressed(!isHeartIconPressed);
		} else {
			const response = await fetch(
				`${document.location.origin}/api/posts/hearts/add`,
				{
					method: "POST",
					body: JSON.stringify({ post_id: id }),
				},
			);
			if (response.status === 200) setIsHeartIconPressed(!isHeartIconPressed);
		}
		setIsHeartLoading(false);
	};
	// Save posts

	const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);
	const [isBookMarkIconPressed, setIsBookMarkIconPressed] = useState(
		initialIsBookMarkIconPressed,
	);

	const onBookmarkClick = async () => {
		if (!id || isBookmarkLoading) return;

		setIsBookmarkLoading(true);
		if (isBookMarkIconPressed) {
			const response = await fetch(
				`${document.location.origin}/api/posts/saved/remove`,
				{
					method: "POST",
					body: JSON.stringify({ post_id: id }),
				},
			);
			if (response.status === 200)
				setIsBookMarkIconPressed(!isBookMarkIconPressed);
		} else {
			const response = await fetch(
				`${document.location.origin}/api/posts/saved/add`,
				{
					method: "POST",
					body: JSON.stringify({ post_id: id }),
				},
			);
			if (response.status === 200)
				setIsBookMarkIconPressed(!isBookMarkIconPressed);
		}
		setIsBookmarkLoading(false);
	};

	return (
		<div className="max-w-sm md:mx-auto w-[350px] sm:w-[450px]  relative ">
			<div className="border rounded-lg flex justify-center items-center flex-col	  px-5 sm:px-10  py-3">
				<div className="flex items-center justify-between px-3 py-2 ">
					<div className="flex items-center space-x-2  gap-3 ">
						<Avatar>
							<AvatarImage
								alt="malteseloverclub"
								src={user.avatar_url || ""}
								className="object-cover"
							/>
							<AvatarFallback>
								{user.name[0] || user.first_name[0]}
							</AvatarFallback>
						</Avatar>
						<section className="flex justify-between gap-8">
							<span className="font-semibold text-sm ">
								{user.name || user.first_name}
							</span>
							<ReportComponent post_id={id} />
						</section>
					</div>
				</div>
				<section className="border border-gray-100 p-3 flex flex-col rounded-sm   gap-3">
					<Image
						src={url}
						alt="Bichon maltes"
						className="aspect-[3/4] object-cover object-position:center "
						width="280"
						height="280"
					/>
					<div className="flex items-center gap-2 justify-center">
						<LocationIcon />
						<span>{place}</span>
					</div>
				</section>

				<div className="flex flex-col px-3 py-2  gap-4 ">
					<div className="text-center">
						<span>{description}</span>
					</div>
					<div className="flex items-center justify-between p-3">
						<HeartIcon
							ishearticonpressed={String(isHeartIconPressed)}
							onClick={onHeartClick}
							className={`cursor-pointer active:animate-heartbeat animate-duration-fast ${isHeartIconPressed ? "dark:text-white text-black" : "dark:text-white text-black"}`}
						/>
						<span className="font-semibold text-sm">
							{initialIsheartIconPressed
								? isHeartIconPressed
									? hearts?.length
									: (hearts?.length || 0) - 1
								: isHeartIconPressed
									? (hearts?.length || 0) + 1
									: hearts?.length}{" "}
							Hearts
						</span>
						<span className="font-semibold text-sm">
							{visualisations} Views
						</span>
						<BookMarkIcon
							isbookmarkiconpressed={String(isBookMarkIconPressed)}
							onClick={onBookmarkClick}
							className={`cursor-pointer active:animate-heartbeat animate-duration-fast ${isBookMarkIconPressed ? "dark:text-white text-black" : "dark:text-white text-black"}`}
						/>
					</div>

					{/*//////////////////comentarios */}
					<section className="flex gap-3 ">
						<div>
							<Avatar className="h-10 w-10">
								<AvatarImage src={userdata?.avatar_url} alt="@shadcn" />
								<AvatarFallback>{userdata?.name}</AvatarFallback>
							</Avatar>
						</div>
						<div className="flex rounded-xl border border-white p-[3px] gap-4">
							<Input
								type="text"
								placeholder="Message..."
								className="border-none focus-visible:ring-0 "
							/>
							<Button
								variant="ghost"
								size="icon"
								className=" flex items-center justify-center"
							>
								<SendIcon />
								<span className="sr-only">Send</span>
							</Button>
						</div>
					</section>
					<div>
						{comments?.map((comment) => (
							<Comment key={comment.comment_id} {...comment} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
