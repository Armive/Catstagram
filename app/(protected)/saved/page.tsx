import { getSaved } from "@/lib/getSaved";
import { getUserId } from "@/lib/getUserId";
import { SavedGallery } from "@/components/saved/SavedGallery";

export default async function SavedPage() {
	const id = await getUserId();
	const saved = await getSaved();

	return <SavedGallery data={saved} />;
}
