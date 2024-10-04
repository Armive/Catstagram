import { createClient } from "@/utils/supabase/server";
export async function POST(req: Request) {
	const supabase = createClient();
	const body = await req.json();

	const { error, data } = await supabase
		.from("comments")
		.update({ content: body.content })
		.eq("comment_id", body.comment_id);
	return !error?.message
		? Response.json({ message: "Succe ssfully updated", data }, { status: 200 })
		: Response.json(
				{ message: "Internal error or comment doesnt exists" },
				{ status: 400 },
			);
}
