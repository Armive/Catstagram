import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import Link from "next/link";
import {
	Avatar,
	AvatarImage,
	AvatarFallback,
} from "@/components/shared/ui/avatar";
import Image from "next/image";
import { SendIcon } from "@/components/shared/icons";

export default function Component() {
	return (
		<div className="grid grid-cols-[300px_1fr] max-w-4xl w-full rounded-lg overflow-hidden border">
			<aside className="bg-muted/20 p-3 border-r">
				<header className="flex items-center justify-between">
					<h1 className="font-bold text-2xl">Mewssage</h1>
				</header>
				<section className="py-4">
					<Input placeholder="Search influencer" className="h-8" />
				</section>
				<nav className="grid gap-2" aria-label="Influencer List">
					<Link
						href="#"
						className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 bg-muted"
						prefetch={false}
					>
						<Avatar className="border w-10 h-10">
							<AvatarImage src="/placeholder-user.jpg" />
							<AvatarFallback>I1</AvatarFallback>
						</Avatar>
						<div className="grid gap-0.5">
							<p className="text-sm font-medium leading-none">Influencer 1</p>
							<p className="text-xs text-muted-foreground">
								Hey, check out my new video! &middot; 2h
							</p>
						</div>
					</Link>
					<Link
						href="#"
						className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50"
						prefetch={false}
					>
						<Avatar className="border w-10 h-10">
							<AvatarImage src="/placeholder-user.jpg" />
							<AvatarFallback>I2</AvatarFallback>
						</Avatar>
						<div className="grid gap-0.5">
							<p className="text-sm font-medium leading-none">Influencer 2</p>
							<p className="text-xs text-muted-foreground">
								Excited for the new product launch! 📚 &middot; 45m
							</p>
						</div>
					</Link>
					<Link
						href="#"
						className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50"
						prefetch={false}
					>
						<Avatar className="border w-10 h-10">
							<AvatarImage src="https://i.pinimg.com/236x/0f/d3/a7/0fd3a743ad2b0454e0e9431a80f266b7.jpg" />
							<AvatarFallback>I3</AvatarFallback>
						</Avatar>
						<div className="grid gap-0.5">
							<p className="text-sm font-medium leading-none">Influencer 3</p>
							<p className="text-xs text-muted-foreground">
								Lets collaborate on a new project! &middot; 1h
							</p>
						</div>
					</Link>
				</nav>
			</aside>
			<main>
				<header className="p-3 flex border-b items-center">
					<div className="flex items-center gap-2">
						<Avatar className="border w-10 h-10">
							<AvatarImage
								className="object-cover"
								src="https://i.pinimg.com/236x/0f/d3/a7/0fd3a743ad2b0454e0e9431a80f266b7.jpg"
							/>
							<AvatarFallback>I1</AvatarFallback>
						</Avatar>
						<div className="grid gap-0.5">
							<p className="text-sm font-medium leading-none">Influencer 1</p>
							<p className="text-xs text-muted-foreground">Active 2h ago</p>
						</div>
					</div>
				</header>
				<section className="grid gap-4 p-3" aria-label="Chat Messages">
					<article className="flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ml-auto bg-primary text-primary-foreground">
						<p>Hey, check out my new video! Let me know what you think. 🎥</p>
					</article>
					<article className="flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm bg-muted">
						<p>Looks great! Ill check it out later today.</p>
					</article>
					<figure className="flex w-max max-w-[65%] flex-col gap-2 rounded-xl overflow-hidden text-sm ml-auto">
						<Image
							src="https://i.pinimg.com/236x/0f/d3/a7/0fd3a743ad2b0454e0e9431a80f266b7.jpg"
							alt="Influencer photo"
							width={200}
							height={150}
							className="object-cover duration-300 "
						/>
						<figcaption>Influencer 1</figcaption>
					</figure>
					<article className="flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ml-auto bg-primary text-primary-foreground">
						<p>Awesome, thanks! Lets plan a collaboration soon.</p>
					</article>
					<article className="flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm bg-muted">
						<p>Sounds good, Im free this weekend.</p>
					</article>
				</section>
				<form className="flex w-full items-center space-x-2 p-3">
					<label htmlFor="message" className="sr-only">
						Type your message
					</label>
					<Input
						id="message"
						placeholder="Type your message..."
						className="flex-1"
						autoComplete="off"
					/>
					<Button type="submit" size="icon">
						<span className="sr-only">Send</span>
						<SendIcon />
					</Button>
				</form>
			</main>
		</div>
	);
}
