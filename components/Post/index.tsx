"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
	MessageCircleIcon,
	BookmarkIcon,
	MapPinIcon,
	Send,
	SendHorizonal,
	SendToBack,
	SendHorizonalIcon,
	Plus,
	PlusCircleIcon,
	FlagIcon,
	DogIcon,
	PocketKnife,
	MoreVerticalIcon,
	Trash2,
	Pencil,
} from "lucide-react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
	BookMarkIcon,
	CommentIcon,
	HeartIcon,
	LocationIcon,
	SendIcon,
	SendToIcon,
	ThreePointIcon,
} from "../icons";
import Image from "next/image";
import { ReportComponent } from "../ReportBar";
import { type SyntheticEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useIntesectionObserver } from "@/hooks/useIntesectionObserver";
import dynamic from "next/dynamic";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
const Comment = dynamic(() => import("../Comment"), {
	ssr: false,
});

export function Post({
	url,
	description,
	visualisations,
	place,
	id,
	hearts,
	initialIsheartIconPressed,
	initialIsBookMarkIconPressed,
	initialComments,
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
	initialComments?: Comments[];
	userdata?: {
		name: string;
		avatar_url: string;
		id: string;
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

	const [isBookMarkIconPressed, setIsBookMarkIconPressed] = useState(
		initialIsBookMarkIconPressed,
	);

	const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);

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

	// Views
	const { counter, elementRef } = useIntesectionObserver();

	useEffect(() => {
		if (counter === 1 && id) {
			fetch("/api/posts/views", {
				method: "POST",
				body: JSON.stringify({
					post_id: id,
				}),
			});
		}
	}, [counter, id]);

	//comments
	const [commentCreateLoading, setCommentCreateLoading] =
		useState<boolean>(false);
	const [showInput, setShowInput] = useState(false);
	const [deleteConfirmationId, setDeleteConfirmationId] = useState<
		string | null
	>(null);

	const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
	const [value, setValue] = useState("");
	const [comments, setComments] = useState<Comments[] | undefined>(
		initialComments,
	);
	const createComment = async (e: SyntheticEvent) => {
		if (!id || commentCreateLoading) return;
		setCommentCreateLoading(true);
		const formData = new FormData(e.target as HTMLFormElement);
		const content = formData.get("content") || "";

		const response = await fetch("/api/posts/comments/create", {
			method: "POST",
			body: JSON.stringify({
				post_id: id,
				content,
			}),
		});
		if (response.status !== 200) return;
		const { data } = await response.json();
		const input = document.querySelector(".content") as HTMLInputElement;
		input.value = "";
		setComments((prevComments) => [data[0], ...(prevComments ?? [])]);
		setCommentCreateLoading(false);
		setShowInput(false);
	};
	const handleDeleteComment = async (id: string) => {
		const response = await fetch("/api/posts/comments/delete", {
			method: "POST",
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

	return (
		<Card
			ref={elementRef}
			className="max-w-[400px] mx-auto overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 text-white"
		>
			<CardContent className="p-0 relative">
				<div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4 z-10">
					<div className="flex items-center space-x-3">
						<Avatar className="w-10 h-10 ring-2 ring-white">
							<AvatarImage src={userdata?.avatar_url} alt="@shadcn" />
							<AvatarFallback> {userdata?.name?.[0]}</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-semibold text-sm">{user.name}</p>
							<p className="text-xs flex items-center">
								<MapPinIcon className="h-3 w-3 mr-1" />
								<span>{place}</span>
							</p>
						</div>
					</div>
				</div>
				<Image
					alt="Imagen del post"
					className="w-full h-auto"
					height="440"
					src={url}
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
										? hearts?.length
										: (hearts?.length || 0) - 1
									: isHeartIconPressed
										? (hearts?.length || 0) + 1
										: hearts?.length}{" "}
								Hearts
							</p>
							<p className="text-sm line-clamp-2">
								<span className="font-semibold">{user.name}</span> {description}
							</p>
						</div>
						<div className="flex flex-col items-center space-y-2">
							<Button
								variant="ghost"
								size="icon"
								className={`rounded-full bg-white/20  hover:bg-black backdrop-blur-sm transition-all ${isHeartLoading ? "bg-black" : null}`}
							>
								<HeartIcon
									ishearticonpressed={String(isHeartIconPressed)}
									onClick={onHeartClick}
									className={`cursor-pointer active:animate-heartbeat animate-duration-normal ${isHeartIconPressed ? "text-white" : ""} ${isHeartLoading ? "animate-pulse" : ""}`}
								/>
							</Button>

							<Button
								variant="ghost"
								size="icon"
								className="rounded-full hover:bg-black bg-white/20 backdrop-blur-sm"
							>
								<DogIcon className="text-white" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="rounded-full hover:bg-black bg-white/20 backdrop-blur-sm"
							>
								<FlagIcon className="text-white" />
							</Button>
							<Button
								variant="secondary"
								size="icon"
								className={`rounded-full  hover:bg-black bg-white/20  backdrop-blur-sm transition-all ${isBookmarkLoading ? "" : null}`}
							>
								<BookMarkIcon
									isbookmarkiconpressed={String(isBookMarkIconPressed)}
									onClick={onBookmarkClick}
									className={`cursor-pointer active:animate-heartbeat animate-duration-normal ${isBookMarkIconPressed ? "text-white" : "text-white "} ${isBookmarkLoading ? "animate-pulse" : ""}`}
								/>
							</Button>
						</div>
					</div>
				</div>
			</CardContent>

			<div
				className={`backdrop-blur-sm p-3  overflow-y-auto bg-white/10 ${(comments?.length || 0) === 0 ? "hidden" : ""} `}
			>
				{comments?.slice(0, 2)?.map((comment) => {
					const handleDeleteComment = async () => {
						const response = await fetch("/api/posts/comments/delete", {
							method: "POST",
							body: JSON.stringify({
								comment_id: comment.comment_id,
							}),
						});

						if (response.status === 200) {
							setComments((prevComments) =>
								prevComments?.filter(
									(c) => c.comment_id !== comment.comment_id,
								),
							);
						}
					};

					return (
						<Comment
							key={comment.comment_id}
							{...comment}
							isSameUser={userdata?.id === comment?.author_id}
							handleDeleteComment={handleDeleteComment}
						/>
					);
				})}
				{(comments?.length || 0) > 2 && (
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="link" className="text-sm text-white p-0 h-auto ">
								See all comments
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-purple-500 to-pink-500 text-white">
							<DialogHeader>
								<DialogTitle>Comentarios</DialogTitle>
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
												src={comment?.profiles?.avatar_url}
											/>
											<AvatarFallback>
												{comment?.profiles?.name[0]}
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="font-semibold text-sm">
												{comment?.profiles?.name}
											</p>
											{editingCommentId === comment?.comment_id ? (
												<form
													onSubmit={(e) => {
														e.preventDefault();
														const formdata = new FormData(
															e.target as HTMLFormElement,
														);
														fetch("/api/posts/comments/edit", {
															method: "POST",
															body: JSON.stringify({
																content: formdata.get("content"),
																comment_id: comment?.comment_id,
															}),
														});
														setEditingCommentId(null);
														setComments((prevComments) => {
															if (prevComments) {
																return prevComments.map((e) => {
																	if (e.comment_id === comment?.comment_id) {
																		const newComment = e;
																		newComment.content = formdata.get(
																			"content",
																		) as string;
																		return newComment;
																	}
																	return e;
																});
															}
															return prevComments;
														});
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
												<p className="text-sm break-words w-[250px] max-w-[250px]	">
													{comment?.content}
												</p>
											)}
										</div>
										{comment?.author_id === userdata?.id ? (
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="sm">
														<MoreVerticalIcon className="h-4 w-4" />
														<span className="sr-only">
															Acciones de comentario
														</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem
														onSelect={() => {
															setEditingCommentId(comment.comment_id);
														}}
													>
														<Pencil className="mr-2 h-4 w-4" />
														<span>Editar</span>
													</DropdownMenuItem>
													<DropdownMenuItem
														onSelect={() =>
															setDeleteConfirmationId(comment.comment_id)
														}
													>
														<Trash2 className="mr-2 h-4 w-4" />
														<span>Borrar</span>
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
					Añadir comentario
				</Button>
			)}
			<Dialog open={deleteConfirmationId !== null}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirmar eliminación</DialogTitle>
					</DialogHeader>
					<p>¿Estás seguro de que quieres eliminar este comentario?</p>
					<DialogFooter>
						<Button
							variant="secondary"
							onClick={() => setDeleteConfirmationId(null)}
						>
							Cancelar
						</Button>
						<Button
							variant="destructive"
							onClick={() =>
								deleteConfirmationId &&
								handleDeleteComment(deleteConfirmationId)
							}
						>
							Eliminar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</Card>
	);
}
