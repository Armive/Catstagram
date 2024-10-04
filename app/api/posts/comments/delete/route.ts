import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
	const supabase = createClient();
	const body = await req.json();
	const { error } = await supabase
		.from("comments")
		.delete()
		.eq("comment_id", body.comment_id);

	return error?.message
		? Response.json({ message: "could not delete comment" }, { status: 500 })
		: Response.json({ message: "could delete comment" }, { status: 200 });
}
