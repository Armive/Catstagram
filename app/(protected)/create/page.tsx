import { CreatePostForm } from "./form";
import { getUserId } from "@/lib/getUserId";
import { getUserData } from "@/lib/getUserData";

export default async function Page() {
	const id = await getUserId();
	const profile = await getUserData(id);

	return (
		<CreatePostForm avatar_url={profile.avatar_url || ""} name={profile.name} />
	);
}
