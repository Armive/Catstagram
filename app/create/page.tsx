'use client'

import Image from "next/image";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    	<div className="w-full max-w-xs p-8 space-y-6 rounded-lg shadow-md flex flex-col ">
      <Image
        src="/catstagram.png"
        alt="catslogo"
        className=" hidden xl:flex dark:invert self-center"
        width={159}
        height={38}
      />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" />
      </div>

      <Button className="w-full" type="submit">
        Log in
      </Button>
    </div>
  );
}
