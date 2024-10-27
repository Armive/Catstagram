"use client";
import { Dialog, DialogContent } from "@/components/shared/ui/dialog";
import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import PostView from "../PostView";

export function PostGallery({
	data,
	userId,
}: { data: PostType[]; userId: string }) {
	const [postViewId, setPostViewId] = useState("");
	return (
		<>
			<div className="grid grid-cols-3 gap-1 w-full">
				{data.map((post: PostType) => {
					return (
						<div
							key={post.id}
							className="aspect-square bg-gray-800 overflow-hidden relative group "
							onClick={() => {
								setPostViewId(post.id);
							}}
						>
							<Image
								src={post.imageUrl || ""}
								alt="Try to reload"
								className="w-full h-full object-cover"
								width={400}
								height={400}
							/>
							<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-3">
								<span className="flex items-center">
									<Eye className="w-4 h-4 mr-1" />
									{post.views}
								</span>
								<span className="flex items-center">
									<Heart className="w-4 h-4 mr-1" />
									{post.post_likes.length}
								</span>
							</div>
						</div>
					);
				})}
			</div>
			<Dialog open={Boolean(postViewId)} onOpenChange={() => setPostViewId("")}>
				<DialogContent
					className="p-0 md:min-w-[65vw]"
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
