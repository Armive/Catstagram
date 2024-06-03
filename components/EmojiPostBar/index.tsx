import {
  SmileIcon,
  FaceHoldingBackTearsIcon,
  AngryFaceIcon,
  SadFaceIcon,
  LoveFaceIcon,
} from "../icons";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export function EmojiPostBar() {
  return (
    <div >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="flex justify-center items-center">
            <SmileIcon />
          </TooltipTrigger>

          <TooltipContent className="flex gap-1 justify-center align-middle">
            <Button
              variant="outline"
              className="p-2 flex items-center justify-center"
            >
              <FaceHoldingBackTearsIcon />
            </Button>
            <Button
              variant="outline"
              className="p-2 flex items-center justify-center"
            >
              <AngryFaceIcon />
            </Button>
            <Button
              variant="outline"
              className="p-2 flex items-center justify-center"
            >
              <SadFaceIcon />
            </Button>
            <Button
              variant="outline"
              className="p-2 flex items-center justify-center"
            >
              <LoveFaceIcon />
            </Button>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
