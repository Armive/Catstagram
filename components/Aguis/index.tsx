import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookmarkIcon, HeartIcon, MessageCircleIcon, SendIcon } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";

export default function Aguis() {
  return (
    <main className="flex items-center justify-center p-4">
      <article className="w-full max-w-4xl overflow-hidden shadow-xl rounded-lg">
        <section className="flex flex-col md:flex-row ">
          <figure className="md:w-1/2 relative ">
            <Image
              alt="Person holding a white dog"
              className="w-full h-full object-cover"
              height="600"
              src="/cato.jpg"
              style={{
                aspectRatio: "600/600",
                objectFit: "cover",
              }}
              width="600"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
              <h2 className="text-[1.5rem] font-semibold">
                This cat is the best in the world
              </h2>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage alt="@taco.westie" src="/cato.jpg" />
                  <AvatarFallback>TW</AvatarFallback>
                </Avatar>
                <p className="font-semibold">Armive 🍁</p>
              </div>
            </figcaption>
          </figure>
          <section className="md:w-1/2 flex flex-col bg-black text-white pr">
            <CardContent className="flex flex-col flex-grow overflow-auto">
              <ScrollArea className=" h-72 w-96 p-2 ">

                <div className="flex flex-col gap-5">

                  <ul className="space-y-4">
                    <li className="flex gap-3 space-x-3">
                      <Avatar className="w-8 h-8 object-cover">
                        <AvatarImage alt="@Aguis" src="/cato.jpg" />
                        <AvatarFallback>TN</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Armive</p>
                        <p className="text-sm">I think my fellow cat is the best in the world look at his paws and i think tribi is gonna it her so i mush hide her. #coolcat #ihatedogs #ilikecats #thebestcatever #thebestcat</p>
                      </div>
                    </li>
                  </ul>
                  <ul className="space-y-4">
                    <li className="flex gap-3 space-x-3">
                      <Avatar className="w-8 h-8 object-cover">
                        <AvatarImage alt="@Aguis" src="/images.jpg" />
                        <AvatarFallback>TN</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Tribilin</p>
                        <p className="text-sm">Wut???? ahhhh that cat is the best to eat</p>
                      </div>
                    </li>
                  </ul>
                  <ul className="space-y-4">
                    <li className="flex gap-3 space-x-3">
                      <Avatar className="w-8 h-8 object-cover">
                        <AvatarImage alt="@Aguis" src="/images.jpg" />
                        <AvatarFallback>TN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <p className="font-medium">Kira Osica</p>
                        <p className="text-sm">Guys, how do i look today ???</p>
                        <Image
                          src="https://i.pinimg.com/236x/0f/d3/a7/0fd3a743ad2b0454e0e9431a80f266b7.jpg"
                          alt="Influencer photo"
                          width={200}
                          height={150}
                          className="object-cover duration-300 rounded-xl "
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </ScrollArea>

            </CardContent>
            <CardFooter className="flex flex-col space-y-2 ">
              <nav className="flex justify-between w-full">
                <div className="flex space-x-2">
                  <Button size="icon" variant="ghost" className="text-white hover:text-gray-300">
                    <HeartIcon className="h-4 w-4" />
                    <span className="sr-only">Like</span>
                  </Button>

                  <Button size="icon" variant="ghost" className="text-white hover:text-gray-300">
                    <BookmarkIcon className="h-4 w-4" />
                    <span className="sr-only">Bookmark</span>
                  </Button>

                </div>
              </nav>
              <form className="flex w-full items-center space-x-2">
                <Input className="flex-grow border-none bg-gradient-to-br from-purple-500 to-pink-500 placeholder:text-white " placeholder="Add a new comment..." />
                <Button size="sm" className="bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 h-9">
                  Post
                </Button>
              </form>
            </CardFooter>
          </section>
        </section>
      </article>
    </main>
  );
}
