import { createClient } from "@/utils/supabase/server";

export const getUserData = async (id: string) => {
	const supabase = await createClient();
	const { data } = await supabase
		.from("profiles")
		.select("avatar_url, name")
		.eq("id", id);
	return data?.[0] as Profile;
};
