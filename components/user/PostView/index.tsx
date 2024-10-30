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
import { useState, type FormEventHandler } from "react";
import clsx from "clsx";

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
	const [comments, setComments] = useState<Comments[]>(
		data.comments,
	);
	const [inputValue, setInputValue] = useState('')
	const createComment: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const content = formData.get('content')
		const response = await fetch('/api/posts/comments', {
			method: 'POST',
			body: JSON.stringify({
				content,
				post_id: data.id
			})
		})
		if (response.status !== 200) return;
		const { data: newComments } = await response.json();
		setComments((prevComments) => [newComments[0], ...(prevComments ?? [])]);
		setInputValue('')

	}

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
								<div className="flex flex-col gap-5">
									{comments.map((comment) => (
										<ul className="space-y-4" key={comment.comment_id}>
											<li className="flex gap-3 space-x-3">
												<Avatar className="w-8 h-8 object-cover">
													<AvatarImage
														alt={`${comment.profiles?.name} photo`}
														src={comment.profiles?.avatar_url || ""}
													/>
													<AvatarFallback>
														{comment.profiles?.name[0]}
													</AvatarFallback>
												</Avatar>
												<div className="flex flex-col gap-1">
													<p className="font-medium">
														{comment.profiles?.name}
													</p>
													<p className="text-sm">{comment.content}</p>
												</div>
											</li>
										</ul>
									))}
									{data.comments.length === 0 ? (
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
							<form className="flex w-full items-center space-x-2" onSubmit={createComment}>
								<Input
									className="flex-grow border-none bg-gradient-to-br from-purple-500 to-pink-500 placeholder:text-white "
									placeholder="Add a new comment..."
									name="content"
									value={inputValue}
									onChange={(e) => {
										setInputValue(e.target.value)
									}}
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
		</main>
	);
}
