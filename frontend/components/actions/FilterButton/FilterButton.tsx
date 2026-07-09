import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../../ui/button";
import { FunnelIcon } from "lucide-react";
import FilterUi from "./_components/FilterUi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function FilterButton({
  className,
  screen,
}: {
  className?: string;
  screen: "mobile" | "desktop";
}) {
  if (screen === "desktop") {
    return (
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="outline" className={className}>
              <FunnelIcon />
            </Button>
          }
        ></PopoverTrigger>
        <PopoverContent className="gap-5 overflow-y-scroll ">
          <PopoverHeader>
            <PopoverTitle>Filter</PopoverTitle>
            <PopoverDescription>
              Tune your Discover page by filtering what appears next in your feed.
            </PopoverDescription>
          </PopoverHeader>

          <div className="max-h-[50vh] overflow-y-auto no-scrollbar">
            <FilterUi />
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline" className={className}>
            <FunnelIcon />
            Filter
          </Button>
        }
      ></DialogTrigger>
      <DialogContent className="gap-5">
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
          <DialogDescription>
            Tune your Discover page by filtering what appears next in your feed.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto no-scrollbar">
          <FilterUi />
        </div>
      </DialogContent>
    </Dialog>
  );
}
