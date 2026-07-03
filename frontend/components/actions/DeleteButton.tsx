import { Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";

export default function DeleteButton({
  handleDeleteContentItem,
}: {
  handleDeleteContentItem: () => void;
}) {
  return (
    <Button variant="destructive" onClick={handleDeleteContentItem}>
      <Trash2Icon />
    </Button>
  );
}
