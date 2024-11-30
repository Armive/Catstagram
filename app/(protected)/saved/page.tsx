import { getSaved } from "@/lib/getSaved";
import { SavedGallery } from "@/components/saved/SavedGallery";

export default async function SavedPage() {
	const saved = await getSaved();
	console.log(saved);
	return <SavedGallery data={saved} />;
}
