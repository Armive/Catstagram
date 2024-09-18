import { Button } from "../ui/button";

export function FollowButton({
	initialIsFollowed,
}: { initialIsFollowed: boolean }) {
	return (
		<Button variant={!initialIsFollowed ? "default" : "destructive"}>
			{initialIsFollowed ? "Followed" : "Follow"}
		</Button>
	);
}
