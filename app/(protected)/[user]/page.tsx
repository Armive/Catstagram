import {
	AvatarImage,
	Avatar,
	AvatarFallback,
} from "@/components/shared/ui/avatar";

import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { FollowButton } from "@/components/user/followButton";
import Image from "next/image";
import {
	CameraIcon,
	Cat,
	Eye,
	Heart,
	LinkIcon,
	MapPinIcon,
	Pin,
} from "lucide-react";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/shared/ui/tabs";

export default async function About({ params }: { params: { user: string } }) {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("profiles")
		.select(`*,
			posts(*,
			profiles(name, avatar_url),
			post_likes(user_id),
			saved_posts(user_id),
			comments(*
			,
			profiles(name, avatar_url)
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
	console.log(posts);

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
						<FollowButton
							initialIsFollowed={data?.[0].followers.some(
								(follower: { follower_id: string; followed_id: string }) =>
									user.user?.id === follower.follower_id,
							)}
						/>
					</div>
					<div className="flex space-x-8 mb-4">
						<div className="text-center">
							<p className="font-semibold">{data?.[0]?.posts.length || 0}</p>
							<p className="text-sm text-gray-400">publicaciones</p>
						</div>
						<div className="text-center">
							<p className="font-semibold">{data?.[0]?.followers.length}</p>
							<p className="text-sm text-gray-400">seguidores</p>
						</div>
						<div className="text-center">
							<p className="font-semibold">{data?.[0]?.followed.length}</p>
							<p className="text-sm text-gray-400">seguidos</p>
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
					<div className="grid grid-cols-3 gap-1">
						{posts.map(async (post: PostType) => {
							const hearts = post?.post_likes?.map(
								(d: Like) => d.user_id as string,
							);
							const initialIsheartIconPressed = hearts?.includes(
								user.user?.id as string,
							);

							const { data: saves } = await supabase
								.from("saved_posts")
								.select("user_id")
								.eq("post_id", post.id);

							const initialIsBookMarkIconPressed = saves?.some(
								(save) => save.user_id === user.user?.id,
							);

							return (
								<div
									key={post.id}
									className="aspect-square bg-gray-800 overflow-hidden relative group "
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
				</TabsContent>
			</Tabs>
		</div>
	);
}
