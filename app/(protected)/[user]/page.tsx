import { Button } from "@/components/ui/button";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	BellIcon,
	BlockIcon,
	EllipsisVerticalIcon,
	FlagIcon,
	RestrictIcon,
	ReturnIcon,
	SendToIcon,
} from "@/components/icons";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { FollowButton } from "@/components/followButton";

export default async function About({ params }: { params: { user: string } }) {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("profiles")
		.select(`*,
			posts(*),
			followers!followers_followed_id_fkey(*),
			followed:followers!followers_follower_id_fkey(*)
			`)
		.eq("handle", params.user);

	if (data?.length === 0) {
		notFound();
	}

	const { data: user } = await supabase.auth.getUser();

	return (
		<div className="flex  flex-col items-center p-4  rounded-lg">
			<div className="relative mb-4">
				<Avatar>
					<AvatarImage
						alt="Profile picture"
						className="object-cover"
						src={data?.[0].avatar_url}
					/>
					<AvatarFallback>{data?.[0].name?.[0]}</AvatarFallback>
				</Avatar>
			</div>
			<div className="text-center">
				<h2 className="text-4xl font-semibold">{data?.[0].name}</h2>
				<div className="flex justify-center gap-2 my-2">
					<FollowButton
						initialIsFollowed={data?.[0].followers.some(
							(follower: { follower_id: string; followed_id: string }) =>
								user.user?.id === follower.follower_id,
						)}
					/>
					<Button>Send message</Button>
					<Button variant="ghost">
						<BellIcon />
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost">
								<EllipsisVerticalIcon />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<DropdownMenuGroup>
								<DropdownMenuItem className="flex gap-3">
									<BlockIcon />
									<span>Block</span>
								</DropdownMenuItem>
								<DropdownMenuItem className="flex gap-3">
									<RestrictIcon />
									<span>Restrict</span>
								</DropdownMenuItem>
								<DropdownMenuItem className="flex gap-3">
									<FlagIcon />
									<span>Report</span>
								</DropdownMenuItem>
								<DropdownMenuItem className="flex gap-3">
									<SendToIcon />
									<span>Share on ...</span>
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className="text-left " />
			</div>
			<div className="flex justify-center gap-8 my-2 border border-white p-4">
				<span>
					<strong className="text-2xl ">{data?.[0]?.posts.length || 0}</strong>{" "}
					Posts
				</span>
				<span>
					<strong className="text-2xl">{data?.[0]?.followers.length}</strong>{" "}
					Followers
				</span>
				<span>
					<strong className="text-2xl">{data?.[0]?.followed.length}</strong>{" "}
					Followed
				</span>
			</div>
		</div>
	);
}
