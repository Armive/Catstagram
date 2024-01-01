import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./ui/globals.css";

export const metadata: Metadata = {
	title: "Catstagram",
	description: "Instagram for cats",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={GeistSans.className}>
			<body className="dark:bg-black/95 dark:text-white">{children}</body>
		</html>
	);
}
