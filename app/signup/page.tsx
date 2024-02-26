"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BirthdayIcon,
  GithubIcon,
  LeftArrow,
  RightArrow,
} from "@/components/icons";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function SignUp() {
  const [view, setView] = useState(0);
  return view === 0 ? (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-xs p-8 gap-4 space-y-6 rounded-lg shadow-md flex flex-col">
        <Image
          src="/catstagram.png"
          alt="catslogo"
          className=" hidden xl:flex dark:invert self-center"
          width={159}
          height={38}
        />
        <form
          className="flex gap-5 flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            setView(1);
          }}
        >
          <Label htmlFor="email" className="flex gap-3 flex-col">
            <span>Your Email</span>
            <Input
              placeholder="Example: johndoe@gmail.com"
              type="text"
              id="email"
            />
          </Label>

          <Label htmlFor="name" className="flex gap-3 flex-col">
            <span>Your Name</span>
            <Input placeholder="Example: John Doe" type="text" id="name" />
          </Label>

          <Label htmlFor="username" className="flex gap-3 flex-col">
            <span>Your Username</span>
            <Input placeholder="Example: Tomy.cat" type="text" id="username" />
          </Label>

          <Label htmlFor="password" className="flex gap-3 flex-col">
            <span>Your Password</span>
            <Input
              placeholder="Example: tomycat124"
              type="text"
              id="password"
            />
          </Label>

          <Button className="w-full" type="submit">
            Next step
            <RightArrow />
          </Button>
        </form>
        <div className="flex items-center">
          <div className="flex-grow border-t " />
          <span className="mx-4 text-sm ">OR</span>
          <div className="flex-grow border-t " />
        </div>
        <div className="text-center">
          <Button className="flex items-center justify-center space-x-2 w-full">
            <GithubIcon />
            <span>Sign up with Github</span>
          </Button>
        </div>
        <div className="text-center">
          <span className="text-sm">Have an account? </span>
          <Link className="text-sm" href="/login">
            Log in
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <form
        action=""
        className="flex flex-col min-h-screen items-center justify-center gap-3"
      >
        <Image
          src="/catstagram.png"
          alt="catslogo"
          className=" hidden xl:flex dark:invert self-center"
          width={159}
          height={38}
        />
        <BirthdayIcon />

        <Label className="flex gap-3 flex-col ">
          <span className="self-center">Your Birthday</span>
          <div className="flex gap-2">
            <Label htmlFor="day" className="flex items-center flex-col gap-1">
              <span>Day</span>
              <Input
                placeholder="1"
                type="text"
                id="day"
                className="w-16 flex justify-center items-center"
              />
            </Label>
            <Label htmlFor="month" className="flex items-center flex-col gap-1">
              <span>Month</span>
              <Input
                placeholder="12"
                type="text"
                id="month"
                className="w-16 flex justify-center items-center"
              />
            </Label>
            <Label htmlFor="year" className="flex items-center flex-col gap-1">
              <span>Year</span>
              <Input
                placeholder="11"
                type="text"
                id="year"
                className="w-16 flex justify-center items-center"
              />
            </Label>
          </div>
        </Label>
        <Button
          type="submit"
          className="bg-white text-black rounded-lg font-semibold"
        >
          Next Step
          <RightArrow />
        </Button>
        <Button
          type="button"
          className="bg-white text-black rounded-lg font-semibold"
        >
          Go Back
          <LeftArrow />
        </Button>
      </form>
    </div>
  );
}
