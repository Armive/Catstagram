import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "../../shared/ui/avatar";
import { Button } from "../../shared/ui/button";
import { TableCell, TableRow } from "../../shared/ui/table";

export function SearchItem({
	name,
	isFollowed,
	followers,
	latestReels,
}: {
	name: string;
	isFollowed: boolean;
	followers: number;
	latestReels: boolean;
}) {
	return (
		<TableRow className="border-none  cursor-pointer">
			<TableCell className="font-medium">
				<div className="flex items-center gap-3 ">
					<div
						className={clsx(
							"w-9 h-9 rounded-full flex justify-center items-center",
							{ "bg-gradient-to-r from-violet-200 to-pink-200": latestReels },
						)}
					>
						<Avatar className="w-8 h-8 border">
							<AvatarImage src="https://github.com/guaudev.png" />
							<AvatarFallback className="text-foreground">
								{name}
							</AvatarFallback>
						</Avatar>
					</div>
					<span className="font-bold">{name}</span>
				</div>
			</TableCell>
			<TableCell>{followers}</TableCell>
			<TableCell className="flex justify-center">
				<Button variant="outline" className="h-9 w-20">
					{isFollowed ? "Unfollow" : "Follow"}
				</Button>
			</TableCell>
		</TableRow>
	);
}
