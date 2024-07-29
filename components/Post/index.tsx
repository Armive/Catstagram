"use client";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  BookMarkIcon,
  FlagIcon,
  HeartIcon,
  LocationIcon,
  SendIcon,
} from "../icons";
import Image from "next/image";
import { ReportComponent } from "../ReportBar";
import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";

export function Post({
  url,
  title,
  description,
  visualisations,
  user,
  place,
  id,
  hearts,
  initialIsheartIconPressed,
}: {
  url: string;
  user: { id: string; first_name: "text"; name: string; avatar_url: string };
  title: string;
  description: string;
  id?: string;
  visualisations: number;
  place: string;
  initialIsheartIconPressed: boolean;
  hearts?: string[];
}) {
  const [isHeartIconPressed, setIsHeartIconPressed] = useState(
    initialIsheartIconPressed,
  );
  const [isBookMarkIconPressed, setIsBookMarkIconPressed] = useState(false);
  const onHeartClick = async () => {
    if (!id) return;
    if (isHeartIconPressed) {
      await fetch(`${document.location.origin}/api/posts/hearts/remove`, {
        method: "POST",
        body: JSON.stringify({ post_id: id }),
      });
    } else {
      await  fetch(`${document.location.origin}/api/posts/hearts/add`, {
        method: "POST",
        body: JSON.stringify({ post_id: id }),
      });
    }
    setIsHeartIconPressed(!isHeartIconPressed);
  };

  return (
    <div className="max-w-sm md:mx-auto w-[350px] sm:w-[450px]  relative ">
      <div className="border rounded-lg flex justify-center items-center flex-col	  px-5 sm:px-10  py-3">
        <div className="flex items-center justify-between px-3 py-2 ">
          <div className="flex items-center space-x-2  gap-3 ">
            <Avatar>
              <AvatarImage
                alt="malteseloverclub"
                src={user.avatar_url || ""}
                className="object-cover"
              />
              <AvatarFallback>
                {user.name[0] || user.first_name[0]}
              </AvatarFallback>
            </Avatar>
            <section className="flex justify-between gap-8">
              <span className="font-semibold text-sm ">
                {user.name || user.first_name}
              </span>
              <ReportComponent />
            </section>
          </div>
        </div>
        <section className="border border-gray-100 p-3 flex flex-col rounded-sm   gap-3">
          <Image
            src={url}
            alt="Bichon maltes"
            className="aspect-[3/4] object-cover object-position:center "
            width="280"
            height="280"
          />
          <div className="flex items-center gap-2 justify-center">
            <LocationIcon />
            <span>{place}</span>
          </div>
        </section>

        <div className="flex flex-col px-3 py-2   ">
          <div className="text-center">
            <span>{description}</span>
          </div>
          <div className="flex items-center justify-between p-3">
            <HeartIcon
              ishearticonpressed={String(isHeartIconPressed)}
              onClick={onHeartClick}
              className={`cursor-pointer active:animate-heartbeat animate-duration-fast ${isHeartIconPressed ? "dark:text-white text-black" : "dark:text-white text-black"}`}
            />
            <span className="font-semibold text-sm">
              {initialIsheartIconPressed
                ? isHeartIconPressed
                  ? hearts?.length
                  : (hearts?.length || 0) - 1
                : isHeartIconPressed
                  ? (hearts?.length || 0) + 1
                  : hearts?.length}{" "}
              Hearts
            </span>
            <span className="font-semibold text-sm">
              {visualisations} Views
            </span>
            <BookMarkIcon
              isbookmarkiconpressed={String(isBookMarkIconPressed)}
              onClick={() => setIsBookMarkIconPressed(!isBookMarkIconPressed)}
              className={`cursor-pointer active:animate-heartbeat animate-duration-fast ${isBookMarkIconPressed ? "dark:text-white text-black" : "dark:text-white text-black"}`}
            />
          </div>

          <div className="text-sm text-foreground flex justify-center gap-2 p-2">
            <Link href="/about">View all comments</Link>
          </div>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                alt="user"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI_uZuVHhIqFs9dEA95zYSwA2k9lfEMCuANQiPpWNaQQ&s"
                className="object-cover"
              />
              <AvatarFallback>ML</AvatarFallback>
            </Avatar>
            <div className="border-border border flex items-center  h-9 rounded-md">
              <Input
                className="flex-grow text-sm border-none outline-none "
                placeholder="Add a comment..."
              />
              <Button size="sm" variant="ghost">
                <SendIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
