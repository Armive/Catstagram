import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { BarItem } from "@/components/NavItem";
import { MenuIcon } from "@/components/icons";
import { ModeToggle } from "@/components/toggle";

export const metadata: Metadata = {
  title: "Catstagram",
  description: "Instagram for cats",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <ModeToggle />
          <div className="md:ml-[72px] xl:ml-[244px] p-4">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
