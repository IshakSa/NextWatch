import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

export default function ExpandButton({
  isExpanded,
  setIsExpanded,
}: {
  isExpanded: boolean;
  setIsExpanded: (newExpandState: boolean) => void;
}) {
  function handleExpand() {
    setIsExpanded(!isExpanded);
  }

  return (
    <Button variant="ghost" onClick={handleExpand}>
      {isExpanded ? (
        <>
          Collapse
          <ChevronUpIcon />
        </>
      ) : (
        <>
          Expand
          <ChevronDownIcon />
        </>
      )}
    </Button>
  );
}
