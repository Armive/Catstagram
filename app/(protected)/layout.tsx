import { Navbar } from "@/components/Navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="md:ml-[72px] xl:ml-[244px] ">{children}</div>
    </>
  );
}
