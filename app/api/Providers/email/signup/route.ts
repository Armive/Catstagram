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
	handle: z.string().min(5).max(30),
});

export async function POST(req: Request) {
	const supabase = createClient();
	const body: SignUpData = await req.json();

	const { data: parsedData } = User.safeParse({
		email: body.email,
		password: body.password,
		name: body.name,
		day: body.day,
		month: body.month,
		year: body.year,
		gender: body.gender,
		handle: body.handle,
	});

	const { data } = await supabase
		.from("profiles")
		.select("handle")
		.eq("handle", parsedData?.handle);

	if ((data?.length ?? 0) > 0) {
		return Response.json({ message: "Handle already taken" }, { status: 400 });
	}

	const { error } = await supabase.auth.signUp({
		password: parsedData?.password as string,
		email: parsedData?.email as string,
		options: {
			emailRedirectTo: `${headers().get("origin")}/api/callback`,
			data: {
				name: parsedData?.name,
				day: parsedData?.day,
				month: parsedData?.month,
				year: parsedData?.year,
				gender: parsedData?.gender,
				handle: parsedData?.handle,
			},
		},
	});
	if (error)
		return Response.json({ message: "Could not signup" }, { status: 500 });
	return Response.json({ message: "Successful signup" }, { status: 200 });
}
