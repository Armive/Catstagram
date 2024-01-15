'use client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BarItem = ({
  children,
  text,
  className = "",
  href
}: {
  children: React.ReactNode;
  text: string;
  className?: string;
  href: string;
}) => {
  return (
    <div className={className
    }>
      < Link href={href}>
        <TooltipProvider>

          <Tooltip>
            <TooltipTrigger>
              <div
                className={clsx('flex justify-center items-center  gap-5')}
              >
                {children}
                <p className="hidden xl:flex text-lg font-light w-[100px]">
                  {text}
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>{text}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Link>
    </div >
  );
};
