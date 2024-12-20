import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
	const body = await req.json();
	const supabase = await createClient();
	const { error } = await supabase
		.from("posts")
		.update({ is_pined: true })
		.eq("id", body.post_id);

	return error?.message
		? Response.json({ message: "Could not pin post" }, { status: 500 })
		: Response.json({ message: "Pinned post" }, { status: 200 });
}

export async function DELETE(req: Request) {
	const body = await req.json();
	const supabase = await createClient();
	const { error } = await supabase
		.from("posts")
		.update({ is_pined: false })
		.eq("id", body.post_id);

	return error?.message
		? Response.json({ message: "Could not unpin post" }, { status: 500 })
		: Response.json({ message: "Unpinned post" }, { status: 200 });
}
