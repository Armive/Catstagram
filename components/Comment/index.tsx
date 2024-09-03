import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { HeartIcon } from "../icons";
import {
	Delete,
	Heart,
	Loader2,
	MessageCircleIcon,
	Trash,
	Trash2,
} from "lucide-react";
import { useRelativeTimeFormat } from "@/hooks/useRelativeTimeFormat";
import { useState } from "react";

export default function Comment({
	comment_id,
	post_id,
	created_at,
	author_id,
	content,
	subcomments,
	profiles,
	isSameUser,
	handleDeleteComment,
}: {
	comment_id: string;
	post_id: string;
	created_at: string;
	author_id: string;
	content: string;
	subcomments?: string[];
	profiles?: { name: string; avatar_url: string };
	isSameUser?: boolean;
	handleDeleteComment: () => void;
}) {
	const [loading, setLoading] = useState(false);
	const handleDeleteCommentClick = async () => {
		if (loading) return;
		setLoading(true);
		handleDeleteComment();
	};

	const relativeTime = useRelativeTimeFormat(created_at);
	return (
		<>
			<p className="text-sm break-words gap-4">
				<span className="font-semibold m">{profiles?.name}</span>{" "}
				{content.slice(0, 170)}
				{content.length > 170 ? "See more" : ""}
			</p>
		</>
	);
}
