import { createClient } from "@/utils/supabase/server";
export default async function Home() {
	const supabase = createClient();
	const user = await supabase.auth.getUser();
	return (
		<div>
			<p>{user.data.user?.email}</p>
		</div>
	);
}
