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
import { BarItem } from "../NavItem";

function Navbar() {
	return (
		<>
			<section className="flex h-[50px] fixed bottom-0 items-center justify-between w-full  p-3 xl:p-7  px-7 md:px-0  border-t border-gray-300/15 md:flex-col md:w-[72px] md:h-full md:border-r md:border-t-0 xl:w-[244px] xl:items-start">
				<Image
					src="/catstagramLogo.png"
					alt="catslogo"
					className="hidden md:flex xl:hidden"
					width={32}
					height={32}
				/>

				<Image
					src="/catstagram.png"
					alt="catslogo"
					className=" hidden xl:flex dark:invert"
					width={119}
					height={28}
				/>

				<BarItem text="Home">
					<HomeIcon />
				</BarItem>

				<BarItem text="Search" className="hidden md:flex">
					<SearchIcon />
				</BarItem>

				<BarItem text="Explore">
					<ExploreIcon />
				</BarItem>

				<BarItem text="Reels">
					<ReelsIcon />
				</BarItem>
				<BarItem text="Create" className="flex md:hidden">
					<CreateIcon />
				</BarItem>

				<BarItem text="Messages">
					<SendIcon />
				</BarItem>
				<BarItem text="Notifications" className="flex md:hidden">
					<HeartIcon />
				</BarItem>
				<BarItem text="Create" className="hidden md:flex">
					<CreateIcon />
				</BarItem>
				<BarItem text="More" className="hidden md:flex">
					<MenuIcon />
				</BarItem>
			</section>
		</>
	);
}
export { Navbar };
