import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { TrashIcon, VerifyIcon } from "@/components/icons";

export default function EditProfile() {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Manage your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
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
            <Card>
              <CardHeader>
                <CardTitle>Change Your Avatar</CardTitle>
                <CardDescription>
                  Take or select a Picture From your device
                </CardDescription>
              </CardHeader>
              <CardContent className="flex  flex-col items-center gap-4">
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
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Biography</CardTitle>
                <CardDescription>
                  The Description About your Profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email">Description</Label>
                  <Input
                    type="text"
                    id="text"
                    placeholder="Example: I love to code and I also love to read"
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Gender</CardTitle>
                <CardDescription>Select the Gender</CardDescription>
              </CardHeader>
              <CardContent>
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
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Verify Account</CardTitle>
                <CardDescription>Wait in the Waiting Room to See if you Can be Verified</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center h-[120px]">
                <Link
                  href="/about"
                  className="flex gap-3 border border-white py-2 px-3 rounded-md hover:bg-white hover:text-black duration-200"
                >
                  <VerifyIcon /> Verify My Account
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Delete my account</CardTitle>
                <CardDescription>
                  If you delete your account all your information, including
                  personal data, history, preferences, posts, hearts, and saved
                  items, will be deleted.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <button className="flex gap-3 border border-white py-2 px-3 rounded-md hover:bg-white hover:text-black duration-200">
                  <TrashIcon /> Delete account
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}