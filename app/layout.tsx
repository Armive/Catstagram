import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
	title: "Catstagram",
	description: "Instagram for cats",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={GeistSans.className}>
			<body className="dark:bg-black/95 dark:text-white">
				<Navbar />{children}</body>
		</html>
	);
}
