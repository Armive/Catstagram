import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/shared/ui/avatar";
import { Button } from "@/components/shared/ui/button";
import { CardContent, CardFooter } from "@/components/shared/ui/card";
import { Input } from "@/components/shared/ui/input";
import { BookMarkIcon, HeartIcon } from "@/components/shared/icons";
import Image from "next/image";
import { ScrollArea } from "../../shared/ui/scroll-area";
import { DialogTitle } from "@radix-ui/react-dialog";
import { type FormEvent, useState, type FormEventHandler } from "react";
import clsx from "clsx";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/shared/ui/dropdown-menu";
import {
	AlertTriangleIcon,
	FlagIcon,
	MoreVerticalIcon,
	Pencil,
	Trash2,
} from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "@/components/shared/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/shared/ui/radio-group";
import { Label } from "@/components/shared/ui/label";
import { Textarea } from "@/components/shared/ui/textarea";
import { reportPostAction } from "@/lib/actions";
import Link from "next/link";
import { set } from "date-fns";

export default function PostView({
	data,
	userId,
}: { data: PostType; userId: string }) {
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

	//Comments
	const [isInputLoading, setIsInputLoading] = useState(false);
	const [comments, setComments] = useState<Comments[]>(data.comments);
	const [inputValue, setInputValue] = useState("");
	const createComment: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		if (isInputLoading) return;
		setIsInputLoading(true);

		const formData = new FormData(e.target as HTMLFormElement);
		const content = formData.get("content");
		const response = await fetch("/api/posts/comments", {
			method: "POST",
			body: JSON.stringify({
				content,
				post_id: data.id,
			}),
		});
		if (response.status !== 200) return;
		const { data: newComments } = await response.json();
		setComments((prevComments) => [newComments[0], ...(prevComments ?? [])]);
		setInputValue("");
		setIsInputLoading(false);
	};
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


	return (
		<div className="flex flex-col md:flex-row w-full max-w-4xl overflow-hidden shadow-xl md:rounded-lg border-none">
			<section className="md:w-1/2 h-1/2 md:h-auto relative max-h-[50%] md:max-h-auto md:min-h-full">
				<Image
					alt={data.description}
					className="w-full h-full object-cover"
					height="600"
					width="600"
					src={data.imageUrl || ""}
					style={{
						aspectRatio: "600/600",
						objectFit: "cover",
					}}
				/>
				{/*Report */}
				<Dialog>
					<DialogTrigger asChild>
						<FlagIcon className="absolute text-white top-4 left-4 p-2 rounded-full h-auto w-auto hover:bg-white hover:text-black duration-100" />
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Report post</DialogTitle>
						</DialogHeader>
						{!reportSubmitted ? (
							<form onSubmit={handleReportSubmit} className="gap-4">
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
								<Textarea placeholder="Additional details" name="description" />
								<Button type="submit" className="w-full">
									Submit report
								</Button>
							</form>
						) : (
							<div className="text-center gap-4">
								<AlertTriangleIcon className="h-12 w-12 mx-auto text-yellow-500" />
								<p>
									Thanks for your report. We will see it as soon as possible.
								</p>
							</div>
						)}
					</DialogContent>
				</Dialog>

			</section>
			<section className="md:w-1/2 flex flex-col bg-background text-foreground h-1/2 md:h-auto">
				<CardContent className="flex flex-col flex-grow overflow-auto">
					<ScrollArea className="h-80	l p-2 pb-0 md:pb-2">
						<div className="text-foreground ">
							<div className="flex items-center gap-2">
								<Avatar>
									<AvatarImage
										alt="@taco.westie"
										src={data.profiles.avatar_url || ""}
										height={32}
										width={32}
									/>
									<AvatarFallback className="text-foreground">
										{data.profiles.name[0]}
									</AvatarFallback>
								</Avatar>
								<div>

									<p className="font-semibold">{data?.profiles.name}</p>
									<DialogTitle className="text-sm font-semibold max-w-[350px] break-words">
										{data.description}
									</DialogTitle>
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-x-5 mt-3 gap-4">
							{comments.map((comment) => (
								<article className=" flex gap-4" key={comment.comment_id}>
									<Link href={`/${comment.profiles?.handle}`}>
										<Avatar className=" object-cover">
											<AvatarImage
												alt={`${comment.profiles?.name} photo`}
												src={comment.profiles?.avatar_url || ""}
												height={32}
												width={32}
											/>
											<AvatarFallback className="text-foreground">
												{comment.profiles?.name[0]}
											</AvatarFallback>
										</Avatar>
									</Link>
									<div className="flex flex-col gap-1 flex-auto max-w-[200px]">
										<p className="font-medium">{comment.profiles?.name}</p>
										{editingCommentId === comment?.comment_id ? (
											<form
												onSubmit={(e) => {
													e.preventDefault();
													editComment(e, comment.comment_id);
												}}
											>
												<Input
													className="mt-1 bg-white/20 border-none text-foreground placeholder-white/70"
													name="content"
													defaultValue={comment.content}
													autoFocus
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
											<p className="text-sm break-words">{comment?.content}</p>
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
													onSelect={() => {
														setDeleteConfirmationId(comment.comment_id);
													}}
												>
													<Trash2 className="mr-2 h-4 w-4" />
													<span>Delete</span>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									) : null}
								</article>
							))}

						</div>
					</ScrollArea>
				</CardContent>
				<CardFooter className="flex flex-col space-y-2 ">
					<nav className="flex justify-between w-full">
						<div className="flex space-x-2">
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
					</nav>
					<form
						className="flex w-full items-center space-x-2"
						onSubmit={createComment}
					>
						<Input
							className="flex-grow border-none bg-gradient-to-br from-purple-500 to-pink-500 placeholder:text-white text-white"
							placeholder="Add a new comment..."
							name="content"
							value={inputValue}
							onChange={(e) => {
								setInputValue(e.target.value);
							}}
							autoComplete="off"
							disabled={isInputLoading}
						/>
						<Button
							size="sm"
							className="bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 h-9"
						>
							Post
						</Button>
					</form>
				</CardFooter>
			</section>
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
		</div>
	);
}
