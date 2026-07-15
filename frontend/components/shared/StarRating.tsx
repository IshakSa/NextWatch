import { Rating } from "react-simple-star-rating";

const tooltipArray = [
  "Terrible",
  "Terrible+",
  "Bad",
  "Bad+",
  "Average",
  "Average+",
  "Great",
  "Great+",
  "Awesome",
  "Perfect",
];

export const fillColorArray = [
  "#ef4444",
  "#f97316",
  "#f97316",
  "#f59e0b",
  "#f59e0b",
  "#eab308",
  "#eab308",
  "#eab308",
  "#eab308",
  "#ca8a04",
];

export default function StarRating({
  handleRating,
  handleAutoClosePopover,
  initialRate,
}: {
  handleRating: (rate: number) => void;
  handleAutoClosePopover: () => void;
  initialRate?: number;
}) {
  return (
    <div className="flex items-center [&>.react-simple-star-rating]:flex [&>.react-simple-star-rating]:items-center [&>.react-simple-star-rating]:gap-2">
      <Rating
        onClick={(rate) => {
          handleRating(rate);
          handleAutoClosePopover();
        }}
        allowFraction
        showTooltip
        tooltipArray={tooltipArray}
        transition
        SVGclassName="inline"
        tooltipDefaultText="Your Rating"
        fillColorArray={fillColorArray}
        initialValue={initialRate}
        tooltipStyle={{
          display: "inline-block",
          margin: "0 0 0 8px",
          padding: "4px 8px",
          fontSize: "12px",
          fontWeight: "500",
          borderRadius: "4px",
          backgroundColor: "var(--muted)",
          color: "var(--muted-foreground)",
        }}
      />
    </div>
  );
}
