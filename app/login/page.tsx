import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GithubIcon } from "@/components/icons";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export default function Login({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
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
    const password = formdata.get("password") as string;
    const email = formdata.get("email") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      redirect(`${headers().get("origin")}/`);
    }
    redirect(`${headers().get("origin")}/login?message=credentialerrors`);
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form className="grid gap-4" action={login}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                name="email"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                maxLength={30}
                name="password"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            {searchParams.message === "credentialerrors" ? (
              <p className="font-medium">Login failed. Check credentials.</p>
            ) : null}
          </form>
          <form
            className="text-center flex gap-4 flex-col"
            action={onGithubLogin}
          >
            <Button variant="outline" className="w-full flex gap-3">
              <GithubIcon /> Login with Github
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/doglogin.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
