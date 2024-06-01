import { SignUpProvider } from "@/components/signUpContext";
import Image from "next/image";

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between h-screen">

      <SignUpProvider>{children}</SignUpProvider>
      <div className="hidden bg-muted lg:block w-[50vw]">
        <Image
          src="/catsignup.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
      
);
}
