import {
	AvatarImage,
	Avatar,
	AvatarFallback,
} from "@/components/shared/ui/avatar";
import ReactMarkdown from 'react-markdown'

import { notFound } from "next/navigation";
import { FollowButton } from "@/components/user/followButton";
import { Cat, Pin, VerifiedIcon } from "lucide-react";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/shared/ui/tabs";
import { PostGallery } from "@/components/user/PostsGallery";
import { getUserProfile } from "@/lib/getUserProfile";
import { getUserId } from "@/lib/getUserId";
import PinnedPosts from "@/components/user/PinedComponent";

export default async function UserPage(props: {
	params: Promise<{ user: string }>;
}) {
	const params = await props.params;
	const data = await getUserProfile(params.user);
	if (!data) {
		return notFound();
	}

	const id = await getUserId();
	return (
		<div className="max-w-4xl mx-auto ">
			<div className="flex md:items-center md:gap-20 md:justify-between flex-col items-center md:flex-row mb-5">
				<div>
					<Avatar className="w-32 h-32  md:h-40 md:w-40 border-2 border-white ">
						<AvatarImage src={data.avatar_url} alt="Taco Jose" />
						<AvatarFallback className="text-foreground">
							{data?.name?.[0]}
						</AvatarFallback>
					</Avatar>
				</div>
				<div className="md:flex-1">
					<div className="flex gap-4 items-center mb-4 md:flex-row flex-col">
						<div>
							<h1 className="text-2xl font-semibold flex gap-2 items-center">
								{data.name}
								{data.is_verified ? <VerifiedIcon /> : null}
							</h1>
							<p className="text-md font-medium text-gray-500 ">
								@{data.handle}
							</p>

						</div>

						{id !== data?.id ? (
							<FollowButton
								initialIsFollowed={data.followers.some(
									(follower: { follower_id: string; followed_id: string }) =>
										id === follower.follower_id,
								)}
								followed_id={data.id}
							/>
						) : null}
					</div>
					<div className="flex space-x-8 mb-4">
						<div className="text-center">
							<p className="font-semibold">{data?.posts.length || 0}</p>
							<p className="text-sm text-gray-400">Posts</p>
						</div>
						<div className="text-center">
							<p className="font-semibold">{data?.followers.length}</p>
							<p className="text-sm text-gray-400">Followers</p>
						</div>
						<div className="text-center">
							<p className="font-semibold">{data?.followed.length}</p>
							<p className="text-sm text-gray-400">followed</p>
						</div>
					</div>
					<div className="prose dark:prose-invert  p-2 max-h-[300px] overflow-auto max-w-2xl">
                            <ReactMarkdown disallowedElements={['img']}>{data.description}</ReactMarkdown>
                    </div>
				</div>
			</div>
			<Tabs defaultValue="posts" className="w-full ">
				<TabsList className="w-full justify-center bg-transparent ">
					<TabsTrigger
						value="posts"
						className="flex-1 data-[state=active]:bg-white data-[state=active]:text-black rounded-full w-1/2"
					>
						<Cat className="w-4 h-4 mr-2" /> MEWS
					</TabsTrigger>
					<TabsTrigger
						value="reels"
						className="flex-1 data-[state=active]:bg-white data-[state=active]:text-black rounded-full w-1/2"
					>
						<Pin className="w-4 h-4 mr-2" /> PINED
					</TabsTrigger>
				</TabsList>
				<TabsContent value="posts" className="mt-6 ">
					<PostGallery data={data.posts} userId={id} />
				</TabsContent>
				<TabsContent value="reels" className="mt-6 ">
					<PinnedPosts
						data={data.posts.filter((post) => post.is_pined)}
						userId={id}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
