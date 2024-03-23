import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GithubIcon } from "@/components/icons";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default function Login() {
	const onGithubLogin = async () => {
		"use server";
		const supabase = createClient();
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: `${process.env.NODE_ENV !== "development" ? "https://catstagram-seven.vercel.app" : "http://localhost:3000"}/api/callback`,
			},
		});
		redirect(data.url || "");
	};

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
					<Input placeholder="Username" type="text" />

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
