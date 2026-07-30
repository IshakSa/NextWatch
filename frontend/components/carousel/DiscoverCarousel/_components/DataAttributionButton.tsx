import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import Attribution from "@/components/shared/Attribution";
import LegalLinks from "@/components/shared/LegalLinks";

export default function DataAttributionButton() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className="flex h-12 w-12 rounded-full" variant="ghost" size="icon">
            <InfoIcon className="size-5 text-white/60!" />
          </Button>
        }
      />

      <DialogContent className="sm:max-w-105">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">Data Attribution & Legal</DialogTitle>
        </DialogHeader>
        <Attribution orientation={"vertical"} />
        <LegalLinks flexRowOnLargeScreen={false} />
      </DialogContent>
    </Dialog>
  );
}
