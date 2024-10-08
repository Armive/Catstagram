import { createClient } from "@/utils/supabase/server";
export const runtime = "edge";

export async function POST(request: Request) {
	const { post_id } = await request.json();
	const supabase = createClient();
	const { data: userData } = await supabase.auth.getUser();
	const user_id = userData.user?.id;
	const { error } = await supabase
		.from("post_likes")
		.insert([{ post_id: post_id, user_id: user_id }])
		.select();
	return error?.message
		? Response.json({ message: "Could not save heart" }, { status: 500 })
		: Response.json({ message: "Heart saved successfully" }, { status: 200 });
}

export async function DELETE(request: Request) {
	const { post_id } = await request.json();
	const supabase = createClient();
	const { data: userData } = await supabase.auth.getUser();
	const user_id = userData.user?.id;
	const { error } = await supabase
		.from("post_likes")
		.delete()
		.eq("post_id", post_id)
		.eq("user_id", user_id);
	return error
		? Response.json({ message: "Failed to delete heart post" }, { status: 500 })
		: Response.json({ message: "Deleted heart post" }, { status: 200 });
}
