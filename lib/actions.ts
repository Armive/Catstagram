"use server";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import sharp from "sharp";
import { LoginUser, type SignUpType, User } from "./schemas";
import { getUserId } from "./getUserId";

export const createPostAction = async (
	formData: FormData,
): Promise<{ status: "error" | "ok" }> => {
	const supabase = await createClient();
	const file = formData.get("file") as File;
	const place = formData.get("place");
	const description = formData.get("description");
	const buffer = await file.arrayBuffer();
	const image = await sharp(buffer).resize(800, 800).toBuffer();
	const { error, data } = await supabase.storage
		.from("Posts")
		.upload(`/images/${crypto.randomUUID()}`, image, {
			contentType: "image/png",
		});
	if (error) {
		return { status: "error" };
	}
	const { error: tableError } = await supabase
		.from("posts")
		.insert([{ description: description, url: data?.path, place: place }]);

	if (tableError) {
		return { status: "error" };
	}
	return { status: "ok" };
};

export const loginAction = async (formData: FormData) => {
	const supabase = await createClient();
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const { data, success } = LoginUser.safeParse({
		email,
		password,
	});

	if (!success)
		redirect(
			`${(await headers()).get("origin")}/login?message=credentialErrors`,
		);

	const { error } = await supabase.auth.signInWithPassword(data);

	if (!error) {
		redirect(`${(await headers()).get("origin")}/`);
	}
	redirect(`${(await headers()).get("origin")}/login?message=credentialErrors`);
};

export const githubLoginAction = async () => {
	const supabase = await createClient();
	const { data } = await supabase.auth.signInWithOAuth({
		provider: "github",
		options: {
			redirectTo: `${(await headers()).get("origin")}/api/callback`,
		},
	});
	redirect(data.url || "");
};

export const signUpAction = async (
	userData: SignUpType,
): Promise<{ status: "error" | "ok" }> => {
	const supabase = await createClient();

	const { data: parsedData } = User.safeParse({
		email: userData.email,
		password: userData.password,
		name: userData.name,
		day: Number(userData.day),
		month: Number(userData.month),
		year: Number(userData.year),
		gender: userData.gender,
		handle: userData.handle,
	});

	const { data } = await supabase
		.from("profiles")
		.select("handle")
		.eq("handle", parsedData?.handle);

	if ((data?.length ?? 0) > 0) {
		return { status: "error" };
	}

	const { error } = await supabase.auth.signUp({
		password: parsedData?.password as string,
		email: parsedData?.email as string,
		options: {
			emailRedirectTo: `${(await headers()).get("origin")}/api/callback`,
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
	if (error) return { status: "error" };
	return { status: "ok" };
};
export const reportPostAction = async (
	formData: FormData,
	post_id: string,
): Promise<{ status: "error" | "ok" }> => {
	const supabase = await createClient();
	const id = await getUserId();
	const description = formData.get("description");
	const type = formData.get("type");
	const { error } = await supabase.from("report").insert({
		description,
		type,
		post_id,
		user_id: id,
		id: crypto.randomUUID(),
	});

	return error?.message ? { status: "error" } : { status: "ok" };
};

export const verifyAccount = async (): Promise<{ status: "error" | "ok" }> => {
	const supabase = await createClient();
	const id = await getUserId();

	const { error } = await supabase
		.from("profiles")
		.update({ is_verified: true })
		.eq("id", id);
	return error?.message ? { status: "error" } : { status: "ok" };
};
