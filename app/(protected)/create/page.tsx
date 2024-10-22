import { createClient } from "@/utils/supabase/server";
import { GradientTweetComposer } from "./form";

export default async function Page() {
	const supabase = await createClient();
	const { data: user } = await supabase.auth.getUser();
	const { data } = await supabase
		.from("profiles")
		.select("avatar_url, name")
		.eq("id", user.user?.id);
	return (
		<GradientTweetComposer
			avatar_url={data?.[0].avatar_url}
			name={data?.[0].name}
		/>
	);
}
