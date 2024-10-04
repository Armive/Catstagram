import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const supabase = createClient();
	const { error } = await supabase.auth.signOut();
	if (error) {
		return Response.json({ message: "Could not sign out" }, { status: 500 });
	}

	return Response.json({ url: `${requestUrl.origin}/login` }, { status: 200 });
}
