import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GithubIcon } from "@/components/icons";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-xs p-8 space-y-6 rounded-lg shadow-md flex flex-col ">
        <Image
          src="/catstagram.png"
          alt="catslogo"
          className=" hidden xl:flex dark:invert self-center"
          width={159}
          height={38}
        />
        <form className="space-y-4">
          <Input placeholder="username" type="text" />

          <Input placeholder="Password" type="password" />

          <Button className="w-full" type="submit">
            Log in
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
            <span>Log in with Github</span>
          </Button>
        </div>
        <div className="text-center">
          <Link href="#">Forgot password?</Link>
        </div>
        <div className="text-center">
          <span className="text-sm">Dont have an account?</span>
          <Link className="text-sm" href="/signup">
            {" "}
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
