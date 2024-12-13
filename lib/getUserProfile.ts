import { createClient } from "@/utils/supabase/server";

type GetUserProfileType = {
	id: string;
	gender: string;
	day: number;
	month: number;
	year: number;
	name: string;
	email: string;
	avatar_url: string;
	posts: PostType[];
	followers: Follower[];
	followed: Follower[];
	is_verified: boolean;
	description: string;
	handle: string;
};

export const getUserProfile = async (handle: string) => {
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
		.eq("handle", handle);
	if (data === null || !data.length) return;
	data[0].posts = data?.[0].posts?.map((post: PostType) => {
		const url = supabase.storage.from("Posts").getPublicUrl(post.url);
		return { ...post, imageUrl: url.data.publicUrl };
	});
	return (data?.[0] as unknown as GetUserProfileType) || [];
};
