import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
	const supabase = await createClient();
	const { handle } = await req.json();

	const isValid = /^[a-zA-Z0-9_]{5,30}$/.test(handle);
	if (!isValid) {
		return Response.json(
			{ message: "Handle already taken", isAvailable: false },
			{ status: 200 },
		);
	}

	const { data } = await supabase
		.from("profiles")
		.select("handle")
		.eq("handle", String(handle).toLocaleLowerCase());

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
