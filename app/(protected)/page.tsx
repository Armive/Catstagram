import { Post } from "@/components/Post";
import { createClient } from "@/utils/supabase/server";
export default async function Home() {
	const supabase = createClient();
	const { data: posts, error } = await supabase
		.from("posts")
		.select(`*,
			profiles(name, avatar_url),
			post_likes(user_id),
			saved_posts(user_id),
			comments(*
			,
			profiles(name, avatar_url)
			)
			`)
		.order("created_at", {
			ascending: false,
		});
	const { data: userdata } = await supabase.auth.getUser();
	const userdataprofiles = await supabase
		.from("profiles")
		.select("avatar_url, name, id")
		.eq("id", userdata.user?.id);

	return (
		<div className=" flex flex-col gap-6  py-6 max-sm:items-center ">
			{posts?.map(async (post) => {
				const url = supabase.storage.from("Posts").getPublicUrl(post.url);

				const hearts = post?.post_likes?.map(
					(d: { user_id: string; name: string }) => d.user_id as string,
				);
				const initialIsheartIconPressed = hearts?.includes(
					userdata.user?.id as string,
				);

				const { data: saves } = await supabase
					.from("saved_posts")
					.select("user_id")
					.eq("post_id", post.id);

				const initialIsBookMarkIconPressed = saves?.some(
					(save) => save.user_id === userdata.user?.id,
				);

				return (
					<Post
						initialIsheartIconPressed={initialIsheartIconPressed || false}
						hearts={hearts}
						user={
							(post?.profiles as {
								id: string;
								first_name: "text";
								name: string;
								avatar_url: string;
							}) || { id: "", name: "", first_name: "", avatar_url: "" }
						}
						description={post.description}
						url={url.data.publicUrl}
						title={post.title}
						key={post.id}
						visualisations={post.views}
						place={post.place}
						id={post.id}
						initialIsBookMarkIconPressed={initialIsBookMarkIconPressed || false}
						initialComments={post?.comments || []}
						userdata={userdataprofiles.data?.[0]}
					/>
				);
			})}
		</div>
	);
}
