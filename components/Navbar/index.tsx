import Image from "next/image";
import {
	HomeIcon,
	SearchIcon,
	ExploreIcon,
	ReelsIcon,
	CommentIcon,
	CreateIcon,
	SendIcon,
	MenuIcon,
	HeartIcon,
} from "@/components/icons";

function Navbar() {
	return (
		<>
			<section className="flex h-[50px] fixed bottom-0 items-center justify-between w-full p-7  border-t border-gray-300 md:flex-col md:w-[50px] md:h-full ">
				<HomeIcon />
				<ExploreIcon />

				<ReelsIcon />
				<SendIcon />
				<HeartIcon />
				<CreateIcon />
			</section>
		</>
	);
}
export { Navbar };
