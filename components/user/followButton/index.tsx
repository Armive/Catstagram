"use client";
import { useState } from "react";
import { Button } from "../../shared/ui/button";

export function FollowButton({
	initialIsFollowed,
	followed_id,
}: { initialIsFollowed: boolean; followed_id: string }) {
	const [isFollowed, setIsFollowed] = useState(initialIsFollowed);
	const [isLoading, setIsLoading] = useState(false);
	const onFollow = async () => {
		if (isLoading) return;
		setIsLoading(true);
		if (isFollowed) {
			const { status } = await fetch("/api/follow", {
				method: "DELETE",
				body: JSON.stringify({
					followed_id,
				}),
			});

			if (status === 200) {
				setIsFollowed(false);
			}
		} else {
			const { status } = await fetch("/api/follow", {
				method: "POST",
				body: JSON.stringify({
					followed_id,
				}),
			});
			if (status === 200) {
				setIsFollowed(true);
			}
		}
		setIsLoading(false);
	};
	return (
		<Button
			variant={!isFollowed ? "default" : "secondary"}
			className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
			onClick={onFollow}
			disabled={isLoading}
		>
			{isFollowed ? "Unfollow" : "Follow"}
		</Button>
	);
}
