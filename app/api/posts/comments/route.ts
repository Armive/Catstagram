import { createClient } from "@/utils/supabase/server";
export async function POST(req: Request) {
	const supabase = createClient();
	const body = await req.json();
	const { data: userData } = await supabase.auth.getUser();
	const user_id = userData?.user?.id;

	const { error, data } = await supabase
		.from("comments")
		.insert({
			post_id: body.post_id,
			author_id: user_id,
			content: body.content,
		})
		.select("*,profiles(name,avatar_url)");
	return !error?.message
		? Response.json(
				{ message: "created comment successfully", data },
				{ status: 200 },
			)
		: Response.json(
				{ message: "Internal error or post doesn't exists" },
				{ status: 400 },
			);
}

export async function DELETE(req: Request) {
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

export async function PATCH(req: Request) {
	const supabase = createClient();
	const body = await req.json();

	const { error, data } = await supabase
		.from("comments")
		.update({ content: body.content })
		.eq("comment_id", body.comment_id);
	return !error?.message
		? Response.json({ message: "Successfully updated", data }, { status: 200 })
		: Response.json(
				{ message: "Internal error or comment doesn't exists" },
				{ status: 500 },
			);
}
