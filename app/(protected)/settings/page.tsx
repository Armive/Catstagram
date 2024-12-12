import {
	CardTitle,
	CardDescription,
	CardHeader,
	CardContent,
	CardFooter,
	Card,
} from "@/components/shared/ui/card";

import { Label } from "@/components/shared/ui/label";
import { Input } from "@/components/shared/ui/input";
import { Button } from "@/components/shared/ui/button";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/shared/ui/avatar";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shared/ui/select";
import { Trash2 } from "lucide-react";
import MarkdownInputPreview from "@/components/settings/BiographyForm";
import { VerifyAccount } from "@/components/settings/VerifyAccount";
import { getUserData } from "@/lib/getUserData";
import { getUserId } from "@/lib/getUserId";

export default async function EditProfile() {
	const id = await getUserId();
	const profile = await getUserData(id);
	return (
		<div className="flex min-h-screen">
			<main className="flex-1 p-8">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-2xl font-bold mb-6">Account Settings</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<Card className="flex flex-col">
							<CardHeader>
								<CardTitle>Profile</CardTitle>
								<CardDescription>
									Manage your personal information
								</CardDescription>
							</CardHeader>
							<CardContent className="flex-1">
								<div className="grid gap-4">
									<div>
										<Label htmlFor="name">Name</Label>
										<Input defaultValue="John Doe" id="name" />
									</div>
									<div>
										<Label htmlFor="email">Email</Label>
										<Input
											defaultValue="john@example.com"
											id="email"
											type="email"
										/>
									</div>
									<div>
										<Label htmlFor="password">Password</Label>
										<Input
											defaultValue="********"
											id="password"
											type="password"
										/>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button>Save Changes</Button>
							</CardFooter>
						</Card>
						<Card className="flex flex-col">
							<CardHeader>
								<CardTitle>Change Your Avatar</CardTitle>
								<CardDescription>
									Take or select a Picture From your device
								</CardDescription>
							</CardHeader>
							<CardContent className="flex  flex-col items-center gap-4 flex-1">
								<div className=" flex gap-3 items-center">
									<Avatar>
										<AvatarImage
											src="https://github.com/bunycode.png"
											alt="@shadcn"
										/>
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
									<p>@guaudev</p>
								</div>
								<Input id="picture" type="file" />
							</CardContent>
							<CardFooter>
								<Button>Save Changes</Button>
							</CardFooter>
						</Card>
						<MarkdownInputPreview description={profile.description} />
						<Card className="flex flex-col">
							<CardHeader>
								<CardTitle>Gender</CardTitle>
								<CardDescription>Select the Gender</CardDescription>
							</CardHeader>
							<CardContent className="flex-1">
								<section className="flex  gap-3 flex-col">
									<Select name="gender">
										<SelectTrigger id="gender">
											<SelectValue placeholder="Better not to say" />
										</SelectTrigger>
										<SelectContent position="popper">
											<SelectItem value="female">Female</SelectItem>
											<SelectItem value="male">Male</SelectItem>
											<SelectItem value="none">Better not to say</SelectItem>
										</SelectContent>
									</Select>
								</section>
							</CardContent>
							<CardFooter >
								<Button>Save Changes</Button>
							</CardFooter>
						</Card>
						<VerifyAccount isVerified={profile.is_verified} />
						<Card className="flex flex-col" >
							<CardHeader>
								<CardTitle>Delete my account</CardTitle>
								<CardDescription>
									If you delete your account all your information, including
									personal data, history, preferences, posts, hearts, and saved
									items, will be deleted.
								</CardDescription>
							</CardHeader>
							<CardContent className="flex-1">
								<Button className="flex gap-2" variant="destructive">
									<Trash2 /> Delete account
								</Button>
							</CardContent>

						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}
