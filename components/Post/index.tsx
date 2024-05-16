import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { BookMarkIcon, FlagIcon, HeartIcon, SendIcon } from "../icons";
import Image from "next/image";
import { EmojiPostBar } from "../EmojiPostBar";

export function Post({ url }: { url: string }) {
  return (
    <div className="max-w-sm mx-auto w-[470px] h-[585px] relative">
      <div className="border rounded-lg flex justify-center items-center flex-col	 px-10 gap-3">
        <div className="flex items-center justify-between px-3 py-2 ">
          <div className="flex items-center space-x-2  gap-4 ">
            <Avatar>
              <AvatarImage
                alt="malteseloverclub"
                src="https://i.pinimg.com/736x/0d/14/4d/0d144d7a74013209d24ce6c05b8cfb51.jpg"
                className="object-cover"
              />
              <AvatarFallback>ML</AvatarFallback>
            </Avatar>
            <section className="flex justify-between gap-8">
              <span className="font-semibold text-sm">malteseloverclub</span>
              <div
                className="cursor-pointer absolute right-3 top-4"
                title="Report"
              >
                <FlagIcon />
              </div>
            </section>
          </div>
        </div>
        <section className="border border-gray-100 p-3 rounded-sm">
          <Image
            src={url}
            alt="Bichon maltes"
            className="aspect-[3/4] object-cover object-position:center "
            width="280"
            height="280"
          />
        </section>
        <section>
          <p>This maltes is funny and better</p>
        </section>
        <div className="px-3 py-2 space-y-2 ">
          <div className="flex items-center space-x-4">
            <HeartIcon />
            <EmojiPostBar />
            <div className="flex-grow" />
            <BookMarkIcon />
          </div>
          <div>
            <span className="font-semibold text-sm">+1k Hearts</span>
          </div>
          <div>
            <span className="font-semibold text-sm">malteseloverclub</span>
            <span className="text-sm">@malteseloverclub</span>
            <span className="text-sm text-gray-600"> ...more</span>
          </div>
          <div className="text-sm text-gray-500">View all 4 comments</div>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                alt="user"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI_uZuVHhIqFs9dEA95zYSwA2k9lfEMCuANQiPpWNaQQ&s"
                className="object-cover"
              />
              <AvatarFallback>ML</AvatarFallback>
            </Avatar>
            <Input
              className="flex-grow text-sm"
              placeholder="Add a comment..."
            />
            <SendIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
