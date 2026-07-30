import Attribution from "@/components/shared/Attribution";
import LegalLinks from "@/components/shared/LegalLinks";

export default function Footer() {
  return (
    <footer className="border-t-2 px-5 py-20 mt-35">
      <div className="container flex flex-col">
        <div className="flex flex-col lg:flex-row justify-between">
          <h1 className="lg:w-1/2">
            No more endless searching. <br />
            Scroll through personalized recommendations, discover hidden gems, and save your
            favorites.
          </h1>
        </div>

        <div className="flex flex-col gap-3 my-15">
          <div className="font-semibold text-xl">Credits:</div>
          <Attribution maxTextWidth={40} />
        </div>

        <LegalLinks />
      </div>
    </footer>
  );
}
