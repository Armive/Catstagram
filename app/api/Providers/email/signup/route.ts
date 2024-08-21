import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { z } from "zod";

const User = z.object({
	name: z.string(),
	email: z.string().email().min(5),
	password: z.string().min(6).max(30),
	day: z.number().lt(31).gt(0),
	month: z.number().lt(12).gt(0),
	year: z.number().gt(1950).lt(2014),
	gender: z.enum(["male", "female", "none"]),
});
export async function POST(req: Request) {
	const body: SignUpData = await req.json();

	const { data: parsedData } = User.safeParse({
		email: body.email,
		password: body.password,
		name: body.name,
		day: body.day,
		month: body.month,
		year: body.year,
		gender: body.gender,
	});
	const supabase = createClient();
	const { data, error } = await supabase.auth.signUp({
		password: parsedData?.password as string,
		email: parsedData?.email as string,
		options: {
			emailRedirectTo: `${headers().get("origin")}/api/callback`,
			data: {
				day: parsedData?.day,
				month: parsedData?.month,
				year: parsedData?.year,
				gender: parsedData?.gender,
			},
		},
	});
	if (error)
		return Response.json({ message: "Could not signup" }, { status: 500 });
	return Response.json({ message: "Succesfull signup" }, { status: 200 });
}
