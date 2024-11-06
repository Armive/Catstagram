import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
	const formData = await request.formData();
	const supabase = await createClient();
	const { data } = await supabase.auth.getUser();

	const description = formData.get("description");
	const type = formData.get("type");
	const post_id = formData.get("post_id");
	const user_id = data?.user?.id;
	const { error } = await supabase
		.from("report")
		.insert({ description, type, post_id, user_id });

	return error?.message
		? Response.json({ message: "Could not create report" }, { status: 400 })
		: Response.json(
				{ message: "Report created successfully" },
				{ status: 200 },
			);
}
