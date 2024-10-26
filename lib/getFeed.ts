import { createClient } from "@/utils/supabase/server";

export const getFeed = async () => {
	const supabase = await createClient();
	let { data } = await supabase
		.from("posts")
		.select(`*,
			profiles(name, avatar_url,handle),
			post_likes(user_id),
			saved_posts(user_id),
			comments(*
			,
			profiles(name, avatar_url,handle)
			)
			`)
		.order("created_at", {
			ascending: false,
		});
	if (!data === null) return;
	data = data?.map((post: PostType) => {
		const url = supabase.storage.from("Posts").getPublicUrl(post.url);
		return { ...post, imageUrl: url.data.publicUrl };
	}) as PostType[];
	return data as PostType[];
};
