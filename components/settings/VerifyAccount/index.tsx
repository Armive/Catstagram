"use client";
import { Button } from "@/components/shared/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/shared/ui/card";
import { useToast } from "@/components/shared/ui/use-toast";
import { verifyAccount } from "@/lib/actions";
import { VerifiedIcon } from "lucide-react";

export const VerifyAccount = ({
	isVerified,
}: {
	isVerified: boolean;
}) => {
	const { toast } = useToast();
	return (
		<Card className="flex flex-col ">
			<CardHeader className="flex-1">
				<CardTitle>Verify Account</CardTitle>
				<CardDescription>
					We are still building the page, so for now you can verify your account
					in seconds.
				</CardDescription>
			</CardHeader>
			<CardContent>
				{isVerified ? (
					<Button className="flex gap-2" variant="secondary" size="lg" disabled>
						<VerifiedIcon /> Already verified
					</Button>
				) : (
					<Button
						className="flex gap-2"
						variant="secondary"
						size="lg"
						onClick={async () => {
							const data = await verifyAccount();
							if (data.status === "ok") {
								toast({ title: "You've been verified" });
							} else {
								toast({ title: "Internal server errors" });
							}
						}}
					>
						<VerifiedIcon /> Verify My Account
					</Button>
				)}
			</CardContent>
		</Card>
	);
};
