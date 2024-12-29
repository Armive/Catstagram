"use client";
import { Dialog, DialogContent } from "@/components/shared/ui/dialog";
import { useState } from "react";
import PostView from "../PostView";
import { PostItem } from "../PostItem";

export function PostGallery({
	data,
	userId,
}: { data: PostType[]; userId: string }) {

	const [postViewId, setPostViewId] = useState("");
	const addView = (post_id: string) => {
		fetch("/api/posts/views", {
			method: "POST",
			body: JSON.stringify({
				post_id: post_id,
			}),
		});
	};

	return (
		<>
			<div className="grid grid-cols-3 gap-1 w-full">
				{data.map((post: PostType) => (<PostItem post={post} userId={userId} key={post.id} onClick={(id) => {
					setPostViewId(id);
					addView(id);
				}} />))}
			</div>
			<Dialog open={Boolean(postViewId)} onOpenChange={() => setPostViewId("")}>
				<DialogContent
					className="p-0 md:min-w-[65vw] border-none max-h-[100vh]"
					aria-describedby={undefined}
				>
					{postViewId ? (
						<PostView
							data={
								data?.find(
									(post) => post.id === postViewId,
								) as unknown as PostType
							}
							userId={userId}
						/>
					) : null}
				</DialogContent>
			</Dialog>
		</>
	);
}
