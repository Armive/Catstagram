import { createClient } from "@/utils/supabase/server";

export const getUserId = async (): Promise<string> => {
	const supabase = await createClient();
	const { data: user } = await supabase.auth.getUser();
	if (!user?.user?.id) return "";
	return user?.user.id;
};
