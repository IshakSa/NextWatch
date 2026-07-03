import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectButton({
  selectedSeason,
  handleSeasonChange,
  seasonsAmount,
}: {
  selectedSeason: number;
  handleSeasonChange: (newSelectedSeason: string | null) => void;
  seasonsAmount: number;
}) {
  return (
    <Select value={`Season ${selectedSeason}`} onValueChange={handleSeasonChange}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Select Watch Option" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Array.from({ length: seasonsAmount }, (_, index) => (
            <SelectItem key={index} value={`Season ${index + 1}`}>
              Season {index + 1}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
