"use server";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import sharp from "sharp";

export const createPostAction = async (
	formData: FormData,
): Promise<{ status: "error" | "ok" }> => {
	const supabase = createClient();
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

export const login = async (formData: FormData) => {
	const supabase = createClient();
	const password = formData.get("password") as string;
	const email = formData.get("email") as string;

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (!error) {
		redirect(`${headers().get("origin")}/`);
	}
	redirect(`${headers().get("origin")}/login?message=credentialErrors`);
};

export const onGithubLogin = async () => {
	const supabase = createClient();
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "github",
		options: {
			redirectTo: `${headers().get("origin")}/api/callback`,
		},
	});
	redirect(data.url || "");
};
