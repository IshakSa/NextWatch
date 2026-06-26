import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectButton({
  selectedWatchOption,
  setSelectedWatchOption,
}: {
  selectedWatchOption: string;
  setSelectedWatchOption: (newWatchOption: string) => void;
}) {
  function handleWatchOptionChange(value: string | null) {
    if (value) {
      setSelectedWatchOption(value);
    }
  }

  return (
    <Select value={selectedWatchOption} onValueChange={handleWatchOptionChange}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Select Watch Option" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Stream">Stream</SelectItem>
          <SelectItem value="Rent">Rent</SelectItem>
          <SelectItem value="Buy">Buy</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
