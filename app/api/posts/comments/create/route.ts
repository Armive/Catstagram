import { createClient } from "@/utils/supabase/server";
export async function POST(req: Request) {
	const supabase = createClient();
	const body = await req.json();
	const { data: userdata } = await supabase.auth.getUser();
	const user_id = userdata?.user?.id;

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
				{ message: "created comment succesfully", data },
				{ status: 200 },
			)
		: Response.json(
				{ message: "Internal error or post doesnt exists" },
				{ status: 400 },
			);
}
