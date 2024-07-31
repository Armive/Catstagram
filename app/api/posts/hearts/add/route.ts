import { createClient } from "@/utils/supabase/server";
export const runtime = 'edge'

export async function POST(request: Request) {
  const { post_id } = await request.json();
  const supabase = createClient();
  const { data: userdata } = await supabase.auth.getUser();
  const user_id = userdata.user?.id;
  const { error } = await supabase
    .from("post_likes")
    .insert([{ post_id: post_id, user_id: user_id }])
    .select();
  return error?.message
    ? Response.json({ message: 'Could not save heart' }, { status: 400 })
    : Response.json({ message: 'Heart saved successfully' }, { status: 200 });
}
