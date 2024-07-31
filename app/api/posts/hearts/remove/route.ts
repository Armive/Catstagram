import { createClient } from "@/utils/supabase/server";
export const runtime = "edge";

export async function POST(request: Request) {
  const { post_id } = await request.json();
  const supabase = createClient();
  const { data: userdata } = await supabase.auth.getUser();
  const user_id = userdata.user?.id;
  const { error } = await supabase
    .from("post_likes")
    .delete()
    .eq("post_id", post_id)
    .eq("user_id", user_id);
  return error
    ? Response.json({ message: "Failed to unheart post" }, { status: 400 })
    : Response.json({ message: "Unhearted post" }, { status: 200 });
}
