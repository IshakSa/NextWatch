import Image from "next/image";

export default function HeroImage({ image }: { image: string }) {
  return (
    <>
      <Image
        src={`/images${image}`}
        alt="poster"
        fill
        unoptimized
        priority
        className="object-cover object-center"
      />
      <div className="absolute top-0 left-0 right-0 h-1/4 bg-linear-to-b from-background to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-background to-transparent" />
    </>
  );
}
