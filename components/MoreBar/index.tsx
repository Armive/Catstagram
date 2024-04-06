import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ActivityIcon,
  FlagIcon,
  LogOutIcon,
  MenuIcon,
  SavedIcon,
  SettingsIcon,
  SwitchIcon,
} from "../icons";

export function MoreBar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" justify-center items-center  gap-5 hidden md:flex">
        <MenuIcon />
        <p className="hidden xl:flex text-lg font-light w-[100px]">More</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex justify-center">
          More
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex gap-2">
            <SettingsIcon />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2">
            <ActivityIcon />
            <span>Your Activity</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2">
            <SavedIcon />
            <span>Saved</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2">
            <FlagIcon />
            <span>Report A Problem</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2">
          <SwitchIcon />
          <span>Switch Accounts</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex gap-2">
          <LogOutIcon />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
