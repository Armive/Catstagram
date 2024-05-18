"use client";

import { Textarea } from "@/components/ui/textarea";
import { FlagIcon } from "../icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

export function ReportComponent() {
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
          <form className="flex flex-col gap-3">
            <Label htmlFor="report" className="self-center">
              Report
            </Label>
            <Textarea
              id="report"
              placeholder="Please provide a detailed description of your findings, observations, and any relevant data. "
              className=" h-40 resize-none"
              autoFocus
              required
            />
            <Select required>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Select a reason
"
                />
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
            <Button>Submit</Button>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
