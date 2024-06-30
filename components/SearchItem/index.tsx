import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";

export function SearchItem({
  name,
  isFollowed,
  followers,
  latestReels,
}: {
  name: string;
  isFollowed: boolean;
  followers: number;
  latestReels: Boolean;
}) {
  return (
    <TableRow className="border-none  cursor-pointer">
      <TableCell className="font-medium">
        <div className="flex items-center gap-3 ">
          <div
            className={`w-9 h-9 ${latestReels ? "bg-gradient-to-r from-violet-200 to-pink-200" : " "}  rounded-full flex justify-center items-center`}
          >
            <Avatar className="w-8 h-8 border">
              <AvatarImage src="https://github.com/guaudev.png" />
              <AvatarFallback>{name}</AvatarFallback>
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
