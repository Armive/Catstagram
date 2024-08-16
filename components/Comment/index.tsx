import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { HeartIcon } from "../icons";
import {
	Heart,
	MessageCircle,
	MessageCircleIcon,
	ShareIcon,
} from "lucide-react";
import { useRelativeTimeFormat } from "@/hooks/useRelativeTimeFormat";

export default function Comment({
	comment_id,
	post_id,
	created_at,
	author_id,
	content,
	subcomments,
	profiles,
}: {
	comment_id: string;
	post_id: string;
	created_at: string;
	author_id: string;
	content: string;
	subcomments?: string[];
	profiles?: { name: string; avatar_url: string };
}) {
	const relativeTime = useRelativeTimeFormat(created_at);
	return (
		<>
			<div className="flex items-start gap-3">
				<Avatar className="h-10 w-10 border">
					<AvatarImage src={profiles?.avatar_url} alt={profiles?.name} />
					<AvatarFallback>{profiles?.name}</AvatarFallback>
				</Avatar>
				<div className="grid gap-1">
					<div className="flex items-center gap-2">
						<Link href="#" className="font-medium text-nowrap" prefetch={false}>
							{profiles?.name}
						</Link>
						<div className="text-xs text-muted-foreground">{relativeTime}</div>
					</div>
					<p className="text-sm leading-relaxed">{content}</p>
					<div className="flex items-center gap-4">
						<Button variant="ghost" size="icon">
							<HeartIcon className="h-4 w-4" />
							<span className="sr-only">Like</span>
						</Button>
						<Button variant="ghost" size="icon">
							<MessageCircleIcon className="h-4 w-4" />
							<span className="sr-only">Reply</span>
						</Button>
						<Button variant="ghost" size="icon">
							<ShareIcon className="h-4 w-4" />
							<span className="sr-only">Share</span>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
