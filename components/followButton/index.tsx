import { Button } from "../ui/button";

export function FollowButton({
	initialIsFollowed,
}: { initialIsFollowed: boolean }) {
	return (
		<Button
			variant={!initialIsFollowed ? "default" : "destructive"}
			className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
		>
			{initialIsFollowed ? "Followed" : "Follow"}
		</Button>
	);
}
