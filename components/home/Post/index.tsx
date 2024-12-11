"use client";
import { Card, CardContent } from "@/components/shared/ui/card";
import {
	MapPinIcon,
	PlusCircleIcon,
	FlagIcon,
	MoreVerticalIcon,
	Trash2,
	Pencil,
	AlertTriangleIcon,
	VerifiedIcon,
} from "lucide-react";
import {
	AvatarImage,
	AvatarFallback,
	Avatar,
} from "@/components/shared/ui/avatar";
import { Input } from "@/components/shared/ui/input";
import { BookMarkIcon, HeartIcon } from "../../shared/icons";
import Image from "next/image";
import {
	type FormEvent,
	type SyntheticEvent,
	useEffect,
	useState,
} from "react";
import { Button } from "../../shared/ui/button";
import { useIntesectionObserver } from "@/hooks/useIntesectionObserver";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../shared/ui/dialog";
import { ScrollArea } from "../../shared/ui/scroll-area";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../../shared/ui/dropdown-menu";
import { Textarea } from "../../shared/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../../shared/ui/radio-group";
import { Label } from "../../shared/ui/label";
import Comment from "../Comment";

import dynamic from "next/dynamic";
import clsx from "clsx";
import Link from "next/link";
import { reportPostAction } from "@/lib/actions";

const EmojiPostBar = dynamic(() => import("../EmojiPostBar"), { ssr: false });
export function Post({ data, userId }: { data: PostType; userId: string }) {
	const initialIsheartIconPressed = data.post_likes?.some(
		(e) => e.user_id === userId,
	);
	const initialIsBookMarkIconPressed = data.saved_posts?.some(
		(e) => e.user_id === userId,
	);
	// Hearts
	const [isHeartIconPressed, setIsHeartIconPressed] = useState(
		initialIsheartIconPressed,
	);

	const [isHeartLoading, setIsHeartLoading] = useState(false);

	const onHeartClick = async () => {
		if (!data.id || isHeartLoading) return;
		setIsHeartLoading(true);
		if (isHeartIconPressed) {
			const response = await fetch(
				`${document.location.origin}/api/posts/hearts`,
				{
					method: "DELETE",
					body: JSON.stringify({ post_id: data.id }),
				},
			);
			if (response.status === 200) setIsHeartIconPressed(!isHeartIconPressed);
		} else {
			const response = await fetch(
				`${document.location.origin}/api/posts/hearts`,
				{
					method: "POST",
					body: JSON.stringify({ post_id: data.id }),
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
		if (!data.id || isBookmarkLoading) return;

		setIsBookmarkLoading(true);
		if (isBookMarkIconPressed) {
			const response = await fetch(
				`${document.location.origin}/api/posts/saved`,
				{
					method: "DELETE",
					body: JSON.stringify({ post_id: data.id }),
				},
			);
			if (response.status === 200)
				setIsBookMarkIconPressed(!isBookMarkIconPressed);
		} else {
			const response = await fetch(
				`${document.location.origin}/api/posts/saved`,
				{
					method: "POST",
					body: JSON.stringify({ post_id: data.id }),
				},
			);
			if (response.status === 200)
				setIsBookMarkIconPressed(!isBookMarkIconPressed);
		}
		setIsBookmarkLoading(false);
	};

	// Views
	const { counter, elementRef } = useIntesectionObserver();

	useEffect(() => {
		if (counter === 1 && data.id) {
			fetch("/api/posts/views", {
				method: "POST",
				body: JSON.stringify({
					post_id: data.id,
				}),
			});
		}
	}, [counter, data.id]);

	//report

	const [reportLoading, setReportLoading] = useState<boolean>(false);
	const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);
	const handleReportSubmit = async (e: FormEvent<HTMLFormElement>) => {
		if (reportLoading && !data.id) return;
		e.preventDefault();
		setReportLoading(true);
		// Submit the report to the server
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const response = await reportPostAction(formData, data.id);

		if (response.status === "ok") {
			setReportSubmitted(true);
		}
		setReportLoading(false);
	};
	//comments
	const [comments, setComments] = useState<Comments[] | undefined>(
		data.comments,
	);
	// create
	const [commentCreateLoading, setCommentCreateLoading] =
		useState<boolean>(false);
	const [showInput, setShowInput] = useState(false);

	const [value, setValue] = useState("");
	const createComment = async (e: SyntheticEvent) => {
		if (!data.id || commentCreateLoading) return;
		setCommentCreateLoading(true);
		const formData = new FormData(e.target as HTMLFormElement);
		const content = formData.get("content") || "";

		const response = await fetch("/api/posts/comments", {
			method: "POST",
			body: JSON.stringify({
				post_id: data.id,
				content,
			}),
		});
		if (response.status !== 200) return;
		const { data: newComments } = await response.json();
		setValue("");
		setComments((prevComments) => [newComments[0], ...(prevComments ?? [])]);
		setCommentCreateLoading(false);
		setShowInput(false);
	};
	// delete
	const [deleteConfirmationId, setDeleteConfirmationId] = useState<
		string | null
	>(null);
	const handleDeleteComment = async (id: string) => {
		const response = await fetch("/api/posts/comments", {
			method: "DELETE",
			body: JSON.stringify({
				comment_id: id,
			}),
		});

		if (response.status === 200) {
			setComments((prevComments) =>
				prevComments?.filter((c) => c.comment_id !== id),
			);
		}
		setDeleteConfirmationId(null);
	};
	const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

	const editComment = async (
		e: FormEvent<HTMLFormElement>,
		commentId: string,
	) => {
		const formData = new FormData(e.target as HTMLFormElement);
		const response = await fetch("/api/posts/comments", {
			method: "PATCH",
			body: JSON.stringify({
				content: formData.get("content"),
				comment_id: commentId,
			}),
		});
		if (response.status === 500) return;
		setEditingCommentId(null);
		setComments((prevComments) => {
			if (prevComments) {
				return prevComments.map((e) => {
					if (e.comment_id === commentId) {
						const newComment = e;
						newComment.content = formData.get("content") as string;
						return newComment;
					}
					return e;
				});
			}
			return prevComments;
		});
	};

	return (
		<Card
			ref={elementRef}
			className="max-w-[400px] mx-auto  bg-gradient-to-br from-purple-500 to-pink-500 text-white overflow-hidden"
		>
			<CardContent className="p-0 relative">
				{/*head */}
				<div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4 z-10">
					<div className="flex items-center space-x-3">
						<Link href={`/${data.profiles.handle}`}>
							<Avatar className="w-10 h-10 ring-2 ">
								<AvatarImage
									src={data.profiles?.avatar_url || ""}
									alt="user image"
								/>
								<AvatarFallback className="text-foreground">
									{data.profiles?.name?.[0]}
								</AvatarFallback>
							</Avatar>
						</Link>
						<div>
							<Link
								href={`/${data.profiles.handle}`}
								className="flex gap-2"
								title={
									data.profiles.is_verified
										? `${data.profiles.name} (verified)`
										: data.profiles.name
								}
							>
								<p className="font-semibold text-sm">{data.profiles?.name}</p>
								{data.profiles.is_verified ? <VerifiedIcon /> : null}
							</Link>
							{data.place ? (
								<p className="text-xs flex items-center">
									<MapPinIcon className="h-3 w-3 mr-1" />
									<span>{data.place}</span>
								</p>
							) : null}
						</div>
					</div>
				</div>
				{/*head */}
				<Image
					alt="Post image"
					height="440"
					src={data.imageUrl || ""}
					style={{
						aspectRatio: "10/11",
						objectFit: "cover",
					}}
					width="400"
				/>

				<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
					<div className="flex justify-between items-end">
						<div className="space-y-1">
							<p className="font-bold text-lg">
								{initialIsheartIconPressed
									? isHeartIconPressed
										? data.post_likes?.length
										: (data.post_likes?.length || 0) - 1
									: isHeartIconPressed
										? (data.post_likes?.length || 0) + 1
										: data.post_likes?.length}{" "}
								Hearts
							</p>
							<p className="text-sm line-clamp-2">
								<span className="font-semibold">{data.profiles?.name}</span>{" "}
								{data.description}
							</p>
						</div>
						<div className="flex flex-col items-center space-y-2 B">
							<Button
								variant="ghost"
								size="icon"
								className={clsx(
									"rounded-full bg-white/20  hover:bg-black hover:text-white backdrop-blur-sm",
									{ "bg-black": isHeartIconPressed },
								)}
								onClick={onHeartClick}
							>
								<HeartIcon
									ishearticonpressed={String(isHeartIconPressed)}
									className={clsx(
										"cursor-pointer active:animate-jump animate-duration-700",
										{
											"text-white": isHeartIconPressed,
											"animate-jelly animate-iteration-count-infinite duration-1000":
												isHeartLoading,
										},
									)}
								/>
							</Button>

							<EmojiPostBar />
							<Dialog>
								<DialogTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										className="rounded-full hover:bg-black bg-white/20 backdrop-blur-sm"
									>
										<FlagIcon className="text-white" />
									</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[425px] ">
									<DialogHeader>
										<DialogTitle>Report post</DialogTitle>
									</DialogHeader>
									{!reportSubmitted ? (
										<form onSubmit={handleReportSubmit} className="space-y-4">
											<RadioGroup name="type">
												<div className="flex items-center space-x-2">
													<RadioGroupItem value="spam" id="post-spam" />
													<Label htmlFor="post-spam">Spam</Label>
												</div>
												<div className="flex items-center space-x-2">
													<RadioGroupItem
														value="inappropriate"
														id="post-inappropriate"
													/>
													<Label htmlFor="no-animals">
														It has nothing to do with animals
													</Label>
												</div>
												<div className="flex items-center space-x-2">
													<RadioGroupItem value="violence" id="post-violence" />
													<Label htmlFor="abuse">Violence or abuse</Label>
												</div>
												<div className="flex items-center space-x-2">
													<RadioGroupItem value="other" id="post-other" />
													<Label htmlFor="other">Other</Label>
												</div>
											</RadioGroup>
											<Textarea
												placeholder="Additional details"
												name="description"
											/>
											<Button type="submit" className="w-full">
												Submit report
											</Button>
										</form>
									) : (
										<div className="text-center space-y-4">
											<AlertTriangleIcon className="h-12 w-12 mx-auto text-yellow-500" />
											<p>
												Thanks for your report. We will see it as soon as
												possible.
											</p>
										</div>
									)}
								</DialogContent>
							</Dialog>
							<Button
								variant="secondary"
								size="icon"
								className={clsx(
									"rounded-full  hover:bg-black bg-white/20   backdrop-blur-sm transition-all",
									{ "bg-black": isBookMarkIconPressed },
								)}
								onClick={onBookmarkClick}
							>
								<BookMarkIcon
									isbookmarkiconpressed={String(isBookMarkIconPressed)}
									className={clsx(
										"cursor-pointer active:animate-blurred-fade-in animate-duration-100 text-white",
										{
											"animate-fade-out animate-duration-[1000ms] animate-iteration-count-infinite":
												isBookmarkLoading,
										},
									)}
								/>
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
			{/*Comments*/}
			<div
				className={clsx("backdrop-blur-sm p-3  overflow-y-auto bg-white/10", {
					hidden: (comments?.length || 0) === 0,
				})}
			>
				{comments?.slice(0, 2)?.map((comment: Comments) => {
					return <Comment key={comment.comment_id} {...comment} />;
				})}
				{(comments?.length || 0) !== 0 && (
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="link" className="text-sm text-white p-0 h-auto ">
								See all comments
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-purple-500 to-pink-500 text-white">
							<DialogHeader>
								<DialogTitle>Comments</DialogTitle>
							</DialogHeader>
							<ScrollArea className="mt-4 max-h-[60vh] pr-4">
								{comments?.map((comment) => (
									<div
										key={comment?.comment_id}
										className="flex items-start space-x-2 mb-4"
									>
										<Avatar className="w-8 h-8">
											<AvatarImage
												alt={comment.profiles?.name}
												src={comment?.profiles?.avatar_url || ""}
											/>
											<AvatarFallback className="text-foreground">
												{comment?.profiles?.name[0]}
											</AvatarFallback>
										</Avatar>
										<div className="flex-auto">
											<p className="font-semibold text-sm">
												{comment?.profiles?.name}
											</p>
											{editingCommentId === comment?.comment_id ? (
												<form
													onSubmit={(e) => {
														e.preventDefault();
														editComment(e, comment.comment_id);
													}}
												>
													<Input
														className="mt-1 bg-white/20 border-none text-white placeholder-white/70"
														name="content"
														defaultValue={comment.content}
														autoFocus
														autoComplete="off"
													/>
													<div className="mt-2">
														<Button
															type="submit"
															size="sm"
															variant="secondary"
															className="mr-2"
														>
															Save
														</Button>
														<Button
															type="button"
															size="sm"
															variant="ghost"
															onClick={() => setEditingCommentId(null)}
														>
															Cancel
														</Button>
													</div>
												</form>
											) : (
												<p className="text-sm break-words 	">
													{comment?.content}
												</p>
											)}
										</div>

										{comment?.author_id === userId ? (
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="sm">
														<MoreVerticalIcon className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem
														onSelect={() => {
															setEditingCommentId(comment.comment_id);
														}}
													>
														<Pencil className="mr-2 h-4 w-4" />
														<span>Edit</span>
													</DropdownMenuItem>
													<DropdownMenuItem
														onSelect={() =>
															setDeleteConfirmationId(comment.comment_id)
														}
													>
														<Trash2 className="mr-2 h-4 w-4" />
														<span>Delete</span>
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										) : null}
									</div>
								))}
							</ScrollArea>
						</DialogContent>
					</Dialog>
				)}
			</div>
			{/*Input */}
			{showInput ? (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (!value) {
							setShowInput(false);
						} else {
							createComment(e);
						}
					}}
					className="flex items-center p-3 bg-white/5 backdrop-blur-sm"
				>
					<Input
						type="text"
						placeholder="Post a comment..."
						className="flex-grow bg-transparent border-none text-white placeholder:text-white focus:ring-0 content"
						autoFocus
						name="content"
						minLength={1}
						maxLength={400}
						onChange={(e) => setValue(e.target.value)}
						value={value}
					/>
					<Button
						type="submit"
						variant="ghost"
						size="sm"
						className="ml-2 text-white hover:bg-white/10"
					>
						{!value ? "Cancel" : "Comment"}
					</Button>
				</form>
			) : (
				<Button
					onClick={() => setShowInput(true)}
					variant="ghost"
					className="w-full p-3 text-white hover:bg-white/10 flex items-center justify-center"
				>
					<PlusCircleIcon className="h-5 w-5 mr-2" />
					Add a comment
				</Button>
			)}
			<Dialog open={deleteConfirmationId !== null}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm delete</DialogTitle>
					</DialogHeader>
					<p>¿Are you sure you wanna delete this comment?</p>
					<DialogFooter>
						<Button
							variant="secondary"
							onClick={() => setDeleteConfirmationId(null)}
						>
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={() =>
								deleteConfirmationId &&
								handleDeleteComment(deleteConfirmationId)
							}
						>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</Card>
	);
}
