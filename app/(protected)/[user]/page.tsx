import {
	AvatarImage,
	Avatar,
	AvatarFallback,
} from "@/components/shared/ui/avatar";

import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { FollowButton } from "@/components/user/followButton";
import { CameraIcon, Cat, LinkIcon, MapPinIcon, Pin } from "lucide-react";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/shared/ui/tabs";
import { PostGallery } from "@/components/user/PostsGallery";

export default async function About(props: { params: Promise<{ user: string }> }) {
    const params = await props.params;
    const supabase = await createClient();
    const { data } = await supabase
		.from("profiles")
		.select(`*,
			posts(*,
			profiles(name, avatar_url,handle),
			post_likes(user_id),
			saved_posts(user_id),
			comments(*
			,
			profiles(name, avatar_url,handle)
			)),
			followers!followers_followed_id_fkey(*),
			followed:followers!followers_follower_id_fkey(*)
			`)
		.eq("handle", params.user);

    if (!data) {
		return notFound();
	}

    const { data: user } = await supabase.auth.getUser();

    const posts = data[0].posts?.map((post: PostType) => {
		const url = supabase.storage.from("Posts").getPublicUrl(post.url);
		return { ...post, imageUrl: url.data.publicUrl };
	});

    return (
		<div className="max-w-4xl mx-auto space-y-6">
			<div className="flex items-start space-x-8 justify-between">
				<div>
					<Avatar className="w-32 h-32 border-2 border-white">
						<AvatarImage src={data?.[0].avatar_url} alt="Taco Jose" />
						<AvatarFallback>{data?.[0].name?.[0]}</AvatarFallback>
					</Avatar>
				</div>
				<div className="flex-1">
					<div className="flex gap-4 items-center mb-4">
						<h1 className="text-2xl font-semibold">{data?.[0].name}</h1>
						{user.user?.id !== data[0]?.id ? (
							<FollowButton
								initialIsFollowed={data?.[0].followers.some(
									(follower: { follower_id: string; followed_id: string }) =>
										user.user?.id === follower.follower_id,
								)}
								followed_id={data?.[0].id}
							/>
						) : null}
					</div>
					<div className="flex space-x-8 mb-4">
						<div className="text-center">
							<p className="font-semibold">{data?.[0]?.posts.length || 0}</p>
							<p className="text-sm text-gray-400">Posts</p>
						</div>
						<div className="text-center">
							<p className="font-semibold">{data?.[0]?.followers.length}</p>
							<p className="text-sm text-gray-400">Followers</p>
						</div>
						<div className="text-center">
							<p className="font-semibold">{data?.[0]?.followed.length}</p>
							<p className="text-sm text-gray-400">followed</p>
						</div>
					</div>
					<div className="space-y-1">
						<p className="font-semibold">{data?.[0].name}</p>
						<p className="flex items-center">
							<CameraIcon className="mr-2 h-4 w-4" /> Dog Lifestyle, tips y
							diversión peluda 🐾
						</p>
						<p className="flex items-center">
							<MapPinIcon className="mr-2 h-4 w-4" /> Winnipeg 🇨🇦
						</p>
						<p className="flex items-center">
							<LinkIcon className="mr-2 h-4 w-4" /> linktr.ee/Taco.westie
						</p>
					</div>
				</div>
			</div>
			<Tabs defaultValue="posts" className="w-full">
				<TabsList className="w-full justify-center bg-transparent">
					<TabsTrigger
						value="posts"
						className="flex-1 data-[state=active]:bg-white data-[state=active]:text-black rounded-full"
					>
						<Cat className="w-4 h-4 mr-2" /> MEWS
					</TabsTrigger>
					<TabsTrigger
						value="reels"
						className="flex-1 data-[state=active]:bg-white data-[state=active]:text-black rounded-full"
					>
						<Pin className="w-4 h-4 mr-2" /> PINED
					</TabsTrigger>
				</TabsList>
				<TabsContent value="posts" className="mt-6">
					<PostGallery data={posts} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
