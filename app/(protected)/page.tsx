import { Post } from "@/components/Post";
import { createClient } from "@/utils/supabase/server";
export default async function Home() {
	const supabase = createClient();
	const { data: posts } = await supabase
		.from("posts")
		.select("*")
		.order("created_at", {
			ascending: false,
		});
	const { data: userdata } = await supabase.auth.getUser();
	const userdataprofiles = await supabase
		.from("profiles")
		.select("avatar_url, name")
		.eq("id", userdata.user?.id);

	return (
		<div className=" flex flex-col gap-6  py-6 max-sm:items-center ">
			{posts?.map(async (post) => {
				const url = supabase.storage.from("Posts").getPublicUrl(post.url);
				const comments = await supabase
					.from("comments")
					.select(`*,
						profiles(name,avatar_url)
						`)
					.eq("post_id", post.id);

				const { data: user } = await supabase
					.from("profiles")
					.select("*")
					.eq("id", post.user_id);

				const { data, error } = await supabase
					.from("post_likes")
					.select("user_id")
					.eq("post_id", post.id);

				const hearts = data?.map((d) => d.user_id as string);
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
				console.log(comments.data);

				return (
					<Post
						initialIsheartIconPressed={initialIsheartIconPressed || false}
						hearts={hearts}
						user={
							(user?.[0] as {
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
						visualisations={post.visualisations}
						place={post.place}
						id={post.id}
						initialIsBookMarkIconPressed={initialIsBookMarkIconPressed || false}
						comments={comments.data || []}
						userdata={userdataprofiles.data?.[0]}
					/>
				);
			})}
		</div>
	);
}
