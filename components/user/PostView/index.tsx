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
import { MoreVerticalIcon, Pencil, Trash2 } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
} from "@/components/shared/ui/dialog";

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
	const [comments, setComments] = useState<Comments[]>(data.comments);
	const [inputValue, setInputValue] = useState("");
	const createComment: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
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
	return (
		<main className="flex items-center justify-center ">
			<article className="w-full max-w-4xl overflow-hidden shadow-xl rounded-lg border-none">
				<section className="flex flex-col md:flex-row ">
					<figure className="md:w-1/2 relative ">
						<Image
							alt={data.description}
							className="w-full h-full object-cover"
							height="600"
							src={data.imageUrl || ""}
							style={{
								aspectRatio: "600/600",
								objectFit: "cover",
							}}
							width="600"
						/>
						<figcaption className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
							<DialogTitle className="text-[1.5rem] font-semibold max-w-[350px] break-words">
								{data.description}
							</DialogTitle>
							<div className="flex items-center gap-2">
								<Avatar>
									<AvatarImage
										alt="@taco.westie"
										src={data.profiles.avatar_url || ""}
									/>
									<AvatarFallback>{data.profiles.name[0]}</AvatarFallback>
								</Avatar>
								<p className="font-semibold">{data?.profiles.name}</p>
							</div>
						</figcaption>
					</figure>
					<section className="md:w-1/2 flex flex-col bg-black text-white ">
						<CardContent className="flex flex-col flex-grow overflow-auto ">
							<ScrollArea className=" h-72 w-[] p-2 ">
								<div className="flex flex-col gap-5 mt-3">
									{comments.map((comment) => (
										<section className=" flex gap-4" key={comment.comment_id}>
											<Avatar className="w-8 h-8 object-cover">
												<AvatarImage
													alt={`${comment.profiles?.name} photo`}
													src={comment.profiles?.avatar_url || ""}
												/>
												<AvatarFallback>
													{comment.profiles?.name[0]}
												</AvatarFallback>
											</Avatar>
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
															className="mt-1 bg-white/20 border-none text-white placeholder-white/70"
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
													<p className="text-sm break-words">
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
										</section>
									))}
									{comments.length === 0 ? (
										<div className="bg-muted p-4 rounded-lg text-center">
											<p className="text-sm font-medium mb-2">
												No comments yet
											</p>
											<p className="text-xs text-muted-foreground mb-4">
												Be the first to share your thoughts!
											</p>
											<Button variant="secondary" className="w-full">
												Write a comment
											</Button>
										</div>
									) : null}
								</div>
							</ScrollArea>
						</CardContent>
						<CardFooter className="flex flex-col space-y-2 ">
							<nav className="flex justify-between w-full">
								<div className="flex space-x-2">
									<Button
										size="icon"
										variant="ghost"
										className="text-white hover:text-gray-300"
									>
										<HeartIcon
											ishearticonpressed={String(isHeartIconPressed)}
											onClick={onHeartClick}
											className={clsx(
												"cursor-pointer active:animate-jump animate-duration-700",
												{
													"text-white": isHeartIconPressed,
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
										className="text-white hover:text-gray-300"
									>
										<BookMarkIcon
											isbookmarkiconpressed={String(isBookMarkIconPressed)}
											onClick={onBookmarkClick}
											className={clsx(
												"cursor-pointer active:animate-blurred-fade-in animate-duration-100 text-white",
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
									className="flex-grow border-none bg-gradient-to-br from-purple-500 to-pink-500 placeholder:text-white "
									placeholder="Add a new comment..."
									name="content"
									value={inputValue}
									onChange={(e) => {
										setInputValue(e.target.value);
									}}
									autoComplete="off"
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
				</section>
			</article>
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
		</main>
	);
}
