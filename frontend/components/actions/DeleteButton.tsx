import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function DeleteButton({
  handleDeleteContentItem,
}: {
  handleDeleteContentItem: () => void;
}) {
  return (
    <Button variant="destructive" onClick={handleDeleteContentItem}>
      <TrashIcon />
    </Button>
  );
}
