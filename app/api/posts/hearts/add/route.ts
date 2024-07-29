import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const { post_id } = await request.json();
  const supabase = createClient();
  const { data: userdata } = await supabase.auth.getUser();
  const user_id = userdata.user?.id;
  const { error, data } = await supabase
    .from("post_likes")
    .insert([{ post_id: post_id, user_id: user_id }])
    .select();
  return error?.message
    ? Response.json({ message: error }, { status: 400 })
    : Response.json({ message: {post_id, user_id} }, { status: 200 });
}
