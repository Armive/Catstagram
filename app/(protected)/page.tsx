import { Post } from "@/components/Post";
import { createClient } from "@/utils/supabase/server";
import { data } from "autoprefixer";
export default async function Home() {
  const supabase = createClient();
  let { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  return (
    <div className=" flex flex-col gap-6  py-6 max-sm:items-center ">
      {posts?.map(async (post) => {
        const url = supabase.storage.from("Posts").getPublicUrl(post.url);

        const { data: user } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", post.user_id);

        return (
          <Post
            user={
              (user?.[0] as {
                id: string;
                first_name: "text";
                name: string;
              }) || { id: "", name: "", first_name: "" }
            }
            description={post.description}
            url={url.data.publicUrl}
            title={post.title}
            key={post.id}
            hearts={post.hearts}
            visualisations={post.visualisations}
            place={post.place}
          />
        );
      })}
    </div>
  );
}
