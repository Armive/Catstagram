"use client";
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
  href,
}: {
  children: React.ReactNode;
  text: string;
  className?: string;
  href: string;
}) => {
  const pathname = usePathname();
  return (
    <div className={className}>
      <Link href={href}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={clsx(
                  "flex justify-center items-center  gap-5 duration-7x5",
                  {
                    "font-semibold": pathname === href,
                    "font-light ": pathname !== href,
                  },
                )}
              >
                {children}
                <p className="hidden xl:flex text-lg   w-[100px]">{text}</p>
              </div>
            </TooltipTrigger>
            <TooltipContent>{text}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Link>
    </div>
  );
};
