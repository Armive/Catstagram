"use client";

import { ReloadIcon } from "@/components/shared/icons";
import { Button } from "@/components/shared/ui/button";

export default function ErrorPage({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="flex  justify-center items-center flex-col gap-5">
			<p className="font-bold text-5xl ">ERROR</p>
			<p className="text-center">
				Oops! It seems that something has been lost along the way...
			</p>
			<Button className="flex gap-2" onClick={reset}>
				Reload
				<ReloadIcon />
			</Button>
		</div>
	);
}
