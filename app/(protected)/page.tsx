import { Post } from "@/components/home/Post";
import { createClient } from "@/utils/supabase/server";
export default async function Home() {
	const supabase = createClient();
	const { data: posts } = await supabase
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
	const { data: userData } = await supabase.auth.getUser();
	const userDataProfiles = await supabase
		.from("profiles")
		.select("avatar_url, name, id")
		.eq("id", userData.user?.id);

	return (
		<div className=" flex flex-col gap-6  py-6 max-sm:items-center ">
			{posts?.map(async (post) => {
				const url = supabase.storage.from("Posts").getPublicUrl(post.url);

				return (
					<Post
						data={{ ...post, imageUrl: url.data.publicUrl }}
						userId={userData?.user?.id || ""}
						key={post.id}
					/>
				);
			})}
		</div>
	);
}
