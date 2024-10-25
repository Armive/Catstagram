"use client";
import type { ThemeProviderProps } from "next-themes/dist/types";
import dynamic from "next/dynamic";
const NextThemesProvider = dynamic(
	() => import("next-themes").then((e) => e.ThemeProvider),
	{
		ssr: false,
	},
);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
