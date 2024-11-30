import { createClient } from "@/utils/supabase/server";

export const getSaved = async () => {
	const supabase = await createClient();
	const user = await supabase.auth.getUser();
	const id = user.data.user?.id;
	const { data } = await supabase
		.from("saved_posts")
		.select(
			`posts(
            id,
			url,
			place,
			views,
			user_id,
			created_at,
			description,
			profiles(name, avatar_url,handle),
			post_likes(user_id),
			saved_posts(user_id),
			comments(*
			,
			profiles(name, avatar_url,handle)
         ))`,
		)
		.eq("user_id", id);
	if (data === null) return [];

	/* eslint-disable-next-line     */
	return data.map((d: any) => {
		const post = d.posts;
		const url = supabase.storage.from("Posts").getPublicUrl(post.url);
		return { ...post, imageUrl: url.data.publicUrl };
	}) as PostType[];
};
