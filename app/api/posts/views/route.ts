import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
	const supabase = await createClient();
	const body = await req.json();
	const { data, error: viewError } = await supabase
		.from("posts")
		.select("views")
		.eq("id", body.post_id);
	if (viewError?.message)
		Response.json({ message: "post not exits" }, { status: 400 });
	const { error } = await supabase
		.from("posts")
		.update({ views: data?.[0].views + 1 })
		.eq("id", body.post_id);
	if (error?.message)
		Response.json({ message: "could not update views" }, { status: 500 });

	return Response.json({ message: "updated views" }, { status: 200 });
}
