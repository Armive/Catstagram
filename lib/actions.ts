"use server";
import { createClient } from "@/utils/supabase/server";
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
