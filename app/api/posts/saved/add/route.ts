import { createClient } from "@/utils/supabase/server";
export const runtime = "edge";
export async function POST(req: Request) {
	const body = await req.json();
	const supabase = createClient();
	const { data } = await supabase.auth.getUser();
	const { error } = await supabase
		.from("saved_posts")
		.insert({ user_id: data.user?.id, post_id: body.post_id });
	return error?.message
		? Response.json({ message: "Could not save post" }, { status: 500 })
		: Response.json({ message: "saved post" }, { status: 200 });
}
