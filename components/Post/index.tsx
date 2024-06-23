"use client"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { BookMarkIcon, FlagIcon, HeartIcon, SendIcon } from "../icons";
import Image from "next/image";
import { EmojiPostBar } from "../EmojiPostBar"; 
import { ReportComponent } from "../ReportBar";
import { useState } from "react";

export function Post({ url,title, description,hearts, visualisations }: { url: string ,  title: string, description:string, hearts: number, visualisations: number}) {
  const [isHeartIconPressed, setIsHeartIconPressed] = useState(false)
  const [isBookMarkIconPressed, setIsBookMarkIconPressed] = useState(false)
  
  return (
    <div className="max-w-sm md:mx-auto w-[350px] sm:w-[450px]  relative ">
      <div className="border rounded-lg flex justify-center items-center flex-col	  px-5 sm:px-10 gap-2 py-3">
        <div className="flex items-center justify-between px-3 py-2 ">
          <div className="flex items-center space-x-2  gap-3 ">
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
              <ReportComponent />
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
          <p>{title}</p>
        </section>
        <div className="flex flex-col px-3 py-2  gap-2">
          <div className="flex items-center ">
            <HeartIcon isHeartIconPressed={isHeartIconPressed} onClick={()=>setIsHeartIconPressed(!isHeartIconPressed)} className={`cursor-pointer active:animate-heartbeat animate-duration-fast ${isHeartIconPressed? 'dark:text-white text-black':'dark:text-white text-black'}`}/>
            
            <div className="flex-grow" />
            <BookMarkIcon isBookMarkIconPressed={isBookMarkIconPressed} onClick={()=>setIsBookMarkIconPressed(!isBookMarkIconPressed)} className={`cursor-pointer active:animate-heartbeat animate-duration-fast ${isBookMarkIconPressed? 'dark:text-white text-black':'dark:text-white text-black'}`}/>
          </div>
          <div className="flex justify-around ">
            <span className="font-semibold text-sm">{hearts} Hearts</span>
            <span className="font-semibold text-sm">{visualisations} Visualisations</span>
          </div>
          <div className="text-center">
            <span>{description}</span>
          </div>
          <div className="text-sm text-gray-500">View all comments</div>
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
