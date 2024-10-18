import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
	const supabase = createClient();
	const body = await req.json();
	const { data: user } = await supabase.auth.getUser();
	const follower_id = user?.user?.id;
	const followed_id = body.followed_id;
	if (followed_id === follower_id) {
		return Response.json(
			{ message: "U cant follow yourself" },
			{ status: 500 },
		);
	}

	const { error } = await supabase
		.from("followers")
		.insert({ followed_id, follower_id });
	return error?.message
		? Response.json({ message: "Internal error" }, { status: 500 })
		: Response.json({ message: "followed successfully" }, { status: 200 });
}
export async function DELETE(req: Request) {
	const supabase = createClient();
	const body = await req.json();
	const { data: user } = await supabase.auth.getUser();
	const follower_id = user?.user?.id;
	const followed_id = body.followed_id;
	if (followed_id === follower_id) {
		return Response.json(
			{ message: "U cant unfollow yourself" },
			{ status: 500 },
		);
	}
	const { error } = await supabase
		.from("followers")
		.delete()
		.eq("follower_id", follower_id)
		.eq("followed_id", followed_id);
	return error?.message
		? Response.json({ message: "Internal error" }, { status: 500 })
		: Response.json(
				{ message: "deleted follow successfully" },
				{ status: 200 },
			);
}
