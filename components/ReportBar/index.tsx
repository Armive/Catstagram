"use client";

import { Textarea } from "@/components/ui/textarea";
import { FlagIcon, VerifyReportIcon } from "../icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { type SyntheticEvent, useState } from "react";

export function ReportComponent({ post_id }: { post_id?: string }) {
	const [view, setView] = useState(0);

	const [loading, setLoading] = useState(false);
	const submit = async (e: SyntheticEvent) => {
		e.preventDefault();
		setLoading(true);
		if (!post_id) return;
		// Submit the report to the server
		const form = e.target as HTMLFormElement;
		const formdata = new FormData(form);
		formdata.append("post_id", post_id);
		const response = await fetch("/api/posts/report", {
			method: "POST",
			body: formdata,
		});
		if (response.status === 200) {
			setView(1);
		}
		setLoading(false);
	};

	return (
		<div className="grid w-full gap-2">
			<Popover>
				<PopoverTrigger>
					<section className="flex justify-between gap-8">
						<div
							className="cursor-pointer absolute right-3 top-4"
							title="Report"
						>
							<FlagIcon />
						</div>
					</section>
				</PopoverTrigger>
				<PopoverContent>
					{view === 0 && (
						<form
							className={`flex flex-col gap-3 ${loading ? "animate-pulse" : ""}`}
							onSubmit={submit}
						>
							<Label htmlFor="report" className="self-center">
								Report
							</Label>
							<Textarea
								id="report"
								placeholder="Please provide a detailed description of your findings, observations, and any relevant data. "
								className=" h-40 resize-none"
								autoFocus
								required
								name="description"
							/>
							<Select required name="type">
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select a reason" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="spam">Spam</SelectItem>
										<SelectItem value="no-animals">
											It has nothing to do with animals
										</SelectItem>
										<SelectItem value="abuse">Violence or abuse</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
							<Button type="submit" disabled={loading}>
								Submit
							</Button>
						</form>
					)}
					{view === 1 && (
						<div className="flex flex-col gap-3 text-center items-center justify-center">
							<h1 className="text-xl">Thx for the feedback</h1>
							<p className="text-sm">
								When you see something you don&apos;t like on Catsgram, you can
								report it if it doesn&apos;t follow our Community Guidelines, or
								you can remove the person who shared it from your experience.
							</p>
							<VerifyReportIcon />
						</div>
					)}
				</PopoverContent>
			</Popover>
		</div>
	);
}
