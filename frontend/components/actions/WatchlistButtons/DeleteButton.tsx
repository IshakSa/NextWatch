import { Trash2Icon } from "lucide-react";
import { Button } from "../../ui/button";
import { removeWatchlist } from "@/components/actions/WatchlistButtons/actions";

export default function DeleteButton({
  handleDeleteContentItem,
  contentId,
}: {
  handleDeleteContentItem: () => void;
  contentId: number;
}) {
  async function deleteWatchlistItem() {
    handleDeleteContentItem();
    await removeWatchlist(contentId);
  }
  return (
    <Button variant="destructive" onClick={deleteWatchlistItem}>
      <Trash2Icon />
    </Button>
  );
}
