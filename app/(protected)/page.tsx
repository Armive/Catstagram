import { Post } from "@/components/home/Post";
import { getFeed } from "@/lib/getFeed";
import { getUserId } from "@/lib/getUserId";
export default async function Home() {
	const id = await getUserId();
	const posts = await getFeed();
	return (
		<div className="flex flex-col gap-6 py-6 max-sm:items-center">
			{posts?.map(async (post) => (
				<Post data={post} userId={id || ""} key={post.id} />
			))}
		</div>
	);
}
