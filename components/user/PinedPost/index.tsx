import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MoreHorizontal, Send } from "lucide-react";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/shared/ui/avatar";
import { Button } from "@/components/shared/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/shared/ui/dropdown-menu";
import { BookMarkIcon, HeartIcon } from "@/components/shared/icons";
import clsx from "clsx";
import { type FormEventHandler, useState } from "react";
export const PinedPost = ({
	post,
	userId,
}: { post: PostType; userId: string }) => {
	const [isOpen, setIsOpen] = useState(false);
	const initialIsheartIconPressed = post.post_likes?.some(
		(e) => e.user_id === userId,
	);
	const initialIsBookMarkIconPressed = post.saved_posts?.some(
		(e) => e.user_id === userId,
	);
	const [isHeartIconPressed, setIsHeartIconPressed] = useState(
		initialIsheartIconPressed,
	);

	const [isHeartLoading, setIsHeartLoading] = useState(false);

	const [isPined, setIsPined] = useState(post.is_pined);


	const onHeartClick = async () => {
		if (!post.id || isHeartLoading) return;
		setIsHeartLoading(true);
		if (isHeartIconPressed) {
			const response = await fetch(
				`${document.location.origin}/api/posts/hearts`,
				{
					method: "DELETE",
					body: JSON.stringify({ post_id: post.id }),
				},
			);
			if (response.status === 200) setIsHeartIconPressed(!isHeartIconPressed);
		} else {
			const response = await fetch(
				`${document.location.origin}/api/posts/hearts`,
				{
					method: "POST",
					body: JSON.stringify({ post_id: post.id }),
				},
			);
			if (response.status === 200) setIsHeartIconPressed(!isHeartIconPressed);
		}
		setIsHeartLoading(false);
	};
	// Save posts

	const [isBookMarkIconPressed, setIsBookMarkIconPressed] = useState(
		initialIsBookMarkIconPressed,
	);

	const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);

	const onBookmarkClick = async () => {
		if (!post.id || isBookmarkLoading) return;

		setIsBookmarkLoading(true);
		if (isBookMarkIconPressed) {
			const response = await fetch(
				`${document.location.origin}/api/posts/saved`,
				{
					method: "DELETE",
					body: JSON.stringify({ post_id: post.id }),
				},
			);
			if (response.status === 200)
				setIsBookMarkIconPressed(!isBookMarkIconPressed);
		} else {
			const response = await fetch(
				`${document.location.origin}/api/posts/saved`,
				{
					method: "POST",
					body: JSON.stringify({ post_id: post.id }),
				},
			);
			if (response.status === 200)
				setIsBookMarkIconPressed(!isBookMarkIconPressed);
		}
		setIsBookmarkLoading(false);
	};

	const onUnpin = async (event: React.MouseEvent<HTMLSpanElement>) => {
		event.stopPropagation();
		const res = await fetch("/api/posts/pined", {
			method: "DELETE",
			body: JSON.stringify({
				post_id: post.id,
			}),

		});
		if (res.status === 200) {
			setIsPined(false);
		}
	}
	if (!isPined) return null;


	//comments
	const [isInputLoading, setIsInputLoading] = useState(false);
	const [comments, setComments] = useState<Comments[]>(post.comments);
	const [inputValue, setInputValue] = useState("");
	const createComment: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		if (isInputLoading) return;
		setIsInputLoading(true);


		const response = await fetch("/api/posts/comments", {
			method: "POST",
			body: JSON.stringify({
				content: inputValue,
				post_id: post.id,
			}),
		});
		if (response.status !== 200) return;
		const { data: newComments } = await response.json();
		setComments((prevComments) => [newComments[0], ...(prevComments ?? [])]);
		setInputValue("");
		setIsInputLoading(false);
	};

	return (
		<motion.div
			key={post.id}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="flex items-center justify-between p-4">
				<div className="flex items-center space-x-3">
					<Avatar className="w-10 h-10 border-2 border-primary">
						<AvatarImage
							src={post.profiles.avatar_url || ""}
							alt={post.profiles.name}
						/>
						<AvatarFallback>{post.profiles.name[0]}</AvatarFallback>
					</Avatar>
					<span className="font-semibold text-foreground">
						{post.profiles.name}
					</span>
				</div>
				{
					post.user_id === userId ? (

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="text-muted-foreground hover:text-foreground"
								>
									<MoreHorizontal className="h-5 w-5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={onUnpin}>Unpin post</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : null
				}
			</div>
			<div className="relative aspect-square">
				<Image
					src={post.imageUrl || ""}
					alt="Post image"
					fill
					className="object-cover"
				/>
			</div>
			<div className="p-4">
				<div className="flex justify-between max-[400px]:flex-col max-[400px]:gap-3">
					<p className="font-semibold  text-foreground flex items-center">
						{initialIsheartIconPressed
							? isHeartIconPressed
								? post.post_likes?.length
								: (post.post_likes?.length || 0) - 1
							: isHeartIconPressed
								? (post.post_likes?.length || 0) + 1
								: post.post_likes?.length} Hearts
					</p>
					<p className="text-foreground font-semibold flex items-center">
						{post.description}
					</p>
					<div className="flex space-x-3">
						<Button
							size="icon"
							variant="ghost"
							className="text-foreground dark:hover:text-gray-300 hover:text-gray-600"
							onClick={onHeartClick}
						>
							<HeartIcon
								ishearticonpressed={String(isHeartIconPressed)}
								className={clsx(
									"cursor-pointer active:animate-jump animate-duration-700",
									{
										"text-foreground": isHeartIconPressed,
										"animate-jelly animate-iteration-count-infinite duration-1000":
											isHeartLoading,
									},
								)}
							/>
							<span className="sr-only">Like</span>
						</Button>

						<Button
							size="icon"
							variant="ghost"
							className="text-foreground dark:hover:text-gray-300 hover:text-gray-600"
							onClick={onBookmarkClick}
						>
							<BookMarkIcon
								isbookmarkiconpressed={String(isBookMarkIconPressed)}
								className={clsx(
									"cursor-pointer active:animate-blurred-fade-in animate-duration-100 text-foreground",
									{
										"animate-fade-out animate-duration-[1000ms] animate-iteration-count-infinite":
											isBookmarkLoading,
									},
								)}
							/>
							<span className="sr-only">Bookmark</span>
						</Button>
					</div>
				</div>
				{
					comments.length ? (

						<div className=" mx-auto p-3 rounded-lg shadow-md">
							<div onClick={() => setIsOpen(!isOpen)}>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									style={{
										display: "flex",
										alignItems: "center",
										transitionProperty:
											"background-color, border-color ,text-decoration-color ",
										transitionDuration: "200",
									}}
								>
									<span className="mr-2 text-foreground">{isOpen ? "Hide all comments" : "See al the comments"}</span>
									<motion.span
										animate={{ rotate: isOpen ? 180 : 0 }}
										transition={{ duration: 0.3 }}
									/>
								</motion.button>
							</div>

							<AnimatePresence>
								{isOpen && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										exit={{ opacity: 0, height: 0 }}
										transition={{ duration: 0.3, ease: "easeInOut" }}
									>
										<ul>
											{comments.map((comment) => (
												<motion.li
													key={comment.comment_id}
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, y: -20 }}
													transition={{ duration: 0.2 }}
												>
													<p
														key={comment.comment_id}
														className="mt-1 text-sm text-foreground"
													>
														<span className="font-semibold mr-2 text-foreground">
															{comment.profiles?.name}
														</span>
														{comment.content}
													</p>
												</motion.li>
											))}
										</ul>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					) : null
				}

				<form className="relative mt-4" onSubmit={createComment}>
					<input
						type="text"
						placeholder="Write your comment..."
						className="w-full py-2 pl-4 pr-12 text-black bg-white border-2 border-transparent rounded-full focus:outline-none focus:border-gray-950 transition-colors duration-300 ease-in-out placeholder:text-black"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						disabled={isInputLoading}

					/>
					<div
						className="absolute inset-0 rounded-full opacity-50 pointer-events-none"
						style={{
							background:
								"linear-gradient(145deg, rgba(167,139,250,0.1), rgba(139,92,246,0.1))",
						}}
					/>
					<motion.button
						whileTap={{ scale: 1.05 }}
						whileHover={{ scale: 0.95 }}
						disabled={isInputLoading}
						style={{
							background: "black",
							boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
							position: "absolute",
							right: "0.5rem", // `right-2` = 0.5rem
							top: "50%", // `top-1/2`
							transform: "translateY(-50%)", // `-translate-y-1/2`
							padding: "0.5rem", // `p-2` = 0.5rem
							color: "white", // `text-white`
							borderRadius: "9999px", // `rounded-full`
							outline: "none", // `focus:outline-none`
							transition: "all 0.3s ease-in-out", // `transition-all duration-300 ease-in-out`
							backgroundColor: "black", // Custom style
						}}
					>
						<Send className="w-5 h-5" />
					</motion.button>
				</form>
			</div>
		</motion.div >
	);
};
