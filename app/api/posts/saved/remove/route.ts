import { createClient } from "@/utils/supabase/server";
export const runtime = "edge";
export async function POST(req: Request) {
  const body = await req.json();
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const { error } = await supabase
    .from("saved_posts")
    .delete()
    .eq("post_id", body.post_id)
    .eq("user_id", data.user?.id);
  return error?.message
    ? Response.json({ message: "Could not delete saved post" }, { status: 400 })
    : Response.json({ message: "delete saved post" }, { status: 200 });
}
