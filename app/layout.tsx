import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/shared/toggle";
import { Toaster } from "@/components/shared/ui/toaster";

export const metadata: Metadata = {
	title: "Catstagram",
	description: "Instagram for pets",
	openGraph: {
		type: "website",
		title: "Catstagram",
		url: "https://catstagram-seven.vercel.app/",
		description: "Instagram for pets",
		siteName: "Catstagram",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={GeistSans.className}>
			<SpeedInsights />
			<body>
				<Toaster />
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<ModeToggle />
					<div>{children}</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
