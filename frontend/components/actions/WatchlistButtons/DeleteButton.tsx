import { Trash2Icon } from "lucide-react";
import { Button } from "../../ui/button";

export default function DeleteButton({
  handleDeleteContentItem,
  contentId,
}: {
  handleDeleteContentItem: () => void;
  contentId: number;
}) {
  return (
    <Button variant="destructive" onClick={handleDeleteContentItem}>
      <Trash2Icon />
    </Button>
  );
}
