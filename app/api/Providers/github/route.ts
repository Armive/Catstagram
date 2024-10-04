import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
	const supabase = createClient();
	const url = new URL(req.url);
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "github",
		options: {
			redirectTo: `${url.origin}/api/callback`,
		},
	});
	if (error) {
		Response.json({ message: "Could not signup with github" }, { status: 500 });
	}
	return Response.json(
		{ message: "Signup with github successfully", url: data.url },
		{ status: 200 },
	);
}
