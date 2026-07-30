import Image from "next/image";

export default function Attribution({
  maxTextWidth,
  orientation = "horizontal",
}: {
  maxTextWidth?: number;
  orientation?: "horizontal" | "vertical";
}) {
  const maxWidthClassName = maxTextWidth ? `max-w-${maxTextWidth}` : "";
  return (
    <div className={`flex flex-col ${orientation === "horizontal" && "lg:flex-row"} gap-10`}>
      <div className="flex flex-col gap-2">
        <Image src={"/logos/tmdb_logo.svg"} alt="tmdb logo" width={200} height={100} />
        <p className={`muted-text ${maxWidthClassName}`}>
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Image src={"/logos/justwatch_logo.svg"} alt="tmdb logo" width={125} height={100} />
        <p className={`muted-text ${maxWidthClassName}`}>
          &#34;Available On&#34; data powered by JustWatch
        </p>
      </div>

      <div>
        <Image src={"/icons/icons8-avatar.svg"} alt="avatar" width={35} height={35} />
        <a target="_blank" href="https://icons8.com/icon/20563/navi-avatar">
          Na&apos;vi Avatar
        </a>{" "}
        icon by{" "}
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </div>
    </div>
  );
}
