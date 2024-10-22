import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
	const supabase = await createClient();
	const body = await req.json();

	const { data } = await supabase
		.from("profiles")
		.select("handle")
		.eq("handle", String(body.handle).toLocaleLowerCase());

	if (data?.length === 0) {
		return Response.json(
			{ message: "Handle available", isAvailable: true },
			{ status: 200 },
		);
	}

	return Response.json(
		{ message: "Handle already taken", isAvailable: false },
		{ status: 200 },
	);
}
