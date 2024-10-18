import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/shared/ui/avatar";
import { Button } from "@/components/shared/ui/button";
import { CardContent, CardFooter } from "@/components/shared/ui/card";
import { Input } from "@/components/shared/ui/input";
import { BookmarkIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "../../shared/ui/scroll-area";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function PostView({ data }: { data: PostType }) {
	return (
		<main className="flex items-center justify-center ">
			<article className="w-full max-w-4xl overflow-hidden shadow-xl rounded-lg">
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
					<section className="md:w-1/2 flex flex-col bg-black text-white pr">
						<CardContent className="flex flex-col flex-grow overflow-auto">
							<ScrollArea className=" h-72 w-full p-2 ">
								<div className="flex flex-col gap-5">
									<p className="self-center font-medium ">Comments</p>
									{data.comments.map((comment) => (
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
										<HeartIcon className="h-4 w-4" />
										<span className="sr-only">Like</span>
									</Button>

									<Button
										size="icon"
										variant="ghost"
										className="text-white hover:text-gray-300"
									>
										<BookmarkIcon className="h-4 w-4" />
										<span className="sr-only">Bookmark</span>
									</Button>
								</div>
							</nav>
							<form className="flex w-full items-center space-x-2">
								<Input
									className="flex-grow border-none bg-gradient-to-br from-purple-500 to-pink-500 placeholder:text-white "
									placeholder="Add a new comment..."
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
