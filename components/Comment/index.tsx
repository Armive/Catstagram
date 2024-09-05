import { useState } from "react";

export default function Comment({
	comment_id,
	post_id,
	created_at,
	author_id,
	content,
	subComments,
	profiles,
}: {
	comment_id: string;
	post_id: string;
	created_at: string;
	author_id: string;
	content: string;
	subComments?: string[];
	profiles?: { name: string; avatar_url: string };
}) {
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
