import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export async function POST(req: Request) {
	const body: SignUpData = await req.json();
	const supabase = createClient();
	const { data, error } = await supabase.auth.signUp({
		password: body.password as string,
		email: body.email as string,
		options: {
			emailRedirectTo: `${headers().get("origin")}/api/callback`,
			data: {
				name: body.name as string,
				day: body.day as number,
				month: body.month as number,
				year: body.year as number,
				gender: body.gender as "male" | "female" | "none",
			},
		},
	});
	if (error)
		return Response.json({ message: "Could not signu" }, { status: 500 });
	return Response.json({ data }, { status: 200 });
}
