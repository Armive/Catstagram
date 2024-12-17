"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/shared/ui/dropdown-menu";
import {
	ActivityIcon,
	FlagIcon,
	LogOutIcon,
	MenuIcon,
	SavedIcon,
	SettingsIcon,
	SwitchIcon,
} from "../icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function MoreBar() {
	const router = useRouter();
	const logOut = async () => {
		const data = await fetch(`${document.location.origin}/api/logout`);
		const result = await data.json();
		router.replace(result.url);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className=" justify-center items-center  gap-5  flex">
				<MenuIcon />
				<p className=" text-lg font-light w-[100px] hidden xl:flex">More</p>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuGroup>
					<Link href="/settings">
						<DropdownMenuItem className="flex gap-2 cursor-pointer">
							<SettingsIcon />
							<span>Settings</span>
						</DropdownMenuItem>
					</Link>
					<DropdownMenuItem className="flex gap-2 cursor-pointer">
						<ActivityIcon />
						<span>Your Activity</span>
					</DropdownMenuItem>
					<Link href="/saved">
						<DropdownMenuItem className="flex gap-2 cursor-pointer">
							<SavedIcon />
							<span>Saved</span>
						</DropdownMenuItem>
					</Link>
					<DropdownMenuItem className="flex gap-2 cursor-pointer">
						<FlagIcon />
						<span>Report A Problem</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />
				<DropdownMenuItem className="flex gap-2 cursor-pointer">
					<SwitchIcon />
					<span>Switch Accounts</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />

				<DropdownMenuItem
					className="flex gap-2 cursor-pointer"
					onClick={() => logOut()}
				>
					<LogOutIcon />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
