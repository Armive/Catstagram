"use client";

import { useState } from "react";

import { PinedPost } from "../PinedPost";

export default function PinnedPosts({
	data,
	userId,
}: { data: PostType[]; userId: string }) {
	const [posts] = useState(data);

	return (
		<div className="max-w-2xl mx-auto bg-background">
			<div className="space-y-8">
				{posts.map((post: PostType) => (
					<PinedPost key={post.id} post={post} userId={userId} />
				))}
			</div>
		</div>
	);
}
