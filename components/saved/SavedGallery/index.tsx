"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Bookmark, Search } from "lucide-react";
import { Input } from "@/components/shared/ui/input";

export function SavedGallery({ data }: { data: PostType[] }) {
	const [searchTerm, setSearchTerm] = useState("");

	// Filter posts based on search term
	const filteredPosts = data.filter((post: PostType) =>
		post.description.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className="container mx-auto px-4 py-8">
			<header className="mb-8">
				<h1 className="text-3xl font-bold text-primary">Saved Posts</h1>
				<p className="text-muted-foreground mt-2">
					Your personal collection of favorite pet moments
				</p>
			</header>

			<div className="mb-6 relative">
				<Input
					type="text"
					placeholder="Search saved posts..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="pl-10"
				/>
				<Search
					className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
					size={18}
				/>
			</div>

			{filteredPosts.length === 0 ? (
				<p className="text-center text-muted-foreground">
					{!data.length ? "No saved posts found, save a post and find it here." : "No posts found matching your search."}
				</p>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
					{filteredPosts.map((post) => (
						<div key={post.id} className="relative group">
							<Image
								src={post.imageUrl || ""}
								alt={`Saved post ${post.id}`}
								width={300}
								height={300}
								className="rounded-lg object-cover w-full aspect-square transition-transform duration-300 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
								<div className="text-white flex items-center space-x-4">
									<span className="flex items-center">
										<Heart className="w-6 h-6 mr-2" />
										{post.post_likes.length}
									</span>
									<span className="flex items-center">
										<Bookmark className="w-6 h-6 mr-2" />
										{post.saved_posts.length}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
