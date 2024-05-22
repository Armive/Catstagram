import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GithubIcon } from "@/components/icons";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export default function Login() {
  const onGithubLogin = async () => {
    "use server";
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${headers().get("origin")}/api/callback`,
      },
    });
    redirect(data.url || "");
  };

  const login = async (formdata: FormData) => {
    "use server";
    const supabase = createClient();
    const password = formdata.get('password') as string;
    const email = formdata.get('email')as string;
  
    const {error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if(!error){
      redirect(`${headers().get('origin')}/`)
    }
    redirect(`${headers().get('origin')}/login?message='Could not sign in'`)
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-xs p-8 space-y-6 rounded-lg shadow-md flex flex-col ">
        <Image
          src="/catstagram.png"
          alt="catslogo"
          className=" flex dark:invert self-center"
          width={159}
          height={38}
        />
        <form className="space-y-4" action={login}>
          <Input placeholder="Email" type="text" name="email"/>

          <Input placeholder="Password" type="password" name="password" minLength={6} maxLength={30}/>

          <Button className="w-full" type="submit">
            Log in
          </Button>
        </form>
        <div className="flex items-center">
          <div className="flex-grow border-t " />
          <span className="mx-4 text-sm ">OR</span>
          <div className="flex-grow border-t " />
        </div>
        <form
          className="text-center flex gap-4 flex-col"
          action={onGithubLogin}
        >
          <Button className="flex items-center justify-center space-x-2 w-full">
            <GithubIcon />
            <span>Log in with Github</span>
          </Button>
        </form>
        <div className="text-center">
          <Link href="#">Forgot password?</Link>
        </div>
        <div className="text-center">
          <Link className="text-sm" href="/signup">
            Dont have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
