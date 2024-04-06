import { Post } from "@/components/Post";
import { createClient } from "@/utils/supabase/server";
export default async function Home() {
	const supabase = createClient();
	const user = await supabase.auth.getUser();
	console.log(user);

	const { data } = supabase.storage.from("Posts").getPublicUrl("image1.jpg");

	return (
		<div className="">
			<Post url={data.publicUrl} />
		</div>
	);
}
