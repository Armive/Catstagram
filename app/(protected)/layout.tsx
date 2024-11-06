import { Navbar } from "@/components/shared/Navbar";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<Navbar />
			<div
				className="md:ml-[72px] xl:ml-[244px] p-1 md:p-4 "
				aria-hidden="false"
			>
				{children}
			</div>
		</>
	);
}
