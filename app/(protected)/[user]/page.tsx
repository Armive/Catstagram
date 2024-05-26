import { Button } from "@/components/ui/button";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { BellIcon, BlockIcon, EllipsisVerticalIcon, FlagIcon, RestrictIcon, ReturnIcon, SendToIcon} from "@/components/icons";
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
} from "@/components/ui/dropdown-menu"


export default function About({ params }) {
  console.log(params.user);
  return (
    <div className="flex  flex-col items-center p-4  rounded-lg">
      <div className="relative mb-4">
        <Avatar>
          <AvatarImage
            alt="Profile picture"
            className="object-cover"
            src="https://i.pinimg.com/736x/0d/14/4d/0d144d7a74013209d24ce6c05b8cfb51.jpg"
          />
        </Avatar>
      </div>
      <div className="text-center">
        <h2 className="text-4xl font-semibold">{params.user}</h2>
        <div className="flex justify-center gap-2 my-2">
          <Button variant="secondary">Followed</Button>
          <Button>Enviar mensaje</Button> 
          <Button variant="ghost">
            <BellIcon />
          </Button>
          <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost"><EllipsisVerticalIcon/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem className='flex gap-3'>
            <BlockIcon/>
            <span>Block</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='flex gap-3'>
            <RestrictIcon/>
            <span>Restrict</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='flex gap-3'>
            <FlagIcon/>
            <span>Report</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='flex gap-3'>
            <SendToIcon/>
            <span>Share on ...</span>
          </DropdownMenuItem>
        
        </DropdownMenuGroup>
       
      </DropdownMenuContent>
    </DropdownMenu>
        </div>
        <div className="text-left "></div>
      </div>
      <div className="flex justify-center gap-8 my-2 border border-white p-4">
        <span>
          <strong className="text-2xl ">754</strong> Posts
        </span>
        <span>
          <strong className="text-2xl">86.4k</strong> Followers
        </span>
        <span>
          <strong className="text-2xl">3869</strong> Followed
        </span>
      </div>
      <div>
        <p className="text-2xl">
          <strong>Description</strong>
        </p>
        <h1 className="text-xl">
          <p>😺 Tu Osica de confianza</p>
          <p>🌐 Osica, Kira capital de Osicos</p>
          <p>👨‍🚀 Mas Osicos mas planeta</p>
        </h1>
      </div>
    </div>
  );
}
