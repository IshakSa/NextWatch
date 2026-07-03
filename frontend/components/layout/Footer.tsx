import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-2 px-5 lg:px-25 py-20 mt-25">
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-between">
          <h1 className="pb-10 lg:w-1/2">
            No more endless searching. <br />
            Scroll through personalized recommendations, discover hidden gems, and save your
            favorites.
          </h1>
          <div className="flex gap-3 mb-5 justify-center items-baseline">
            <Link href={"/"}>Home</Link> <span>/</span>
            <Link href={"/discover"}>Discover</Link> <span>/</span>
            <Link href={"/about"}>About Us</Link> <span>/</span>
            <Link href={"/contact"}>Contact Us</Link>
          </div>
        </div>

        <div className="flex flex-col items-center lg:flex-row justify-between text-muted-foreground">
          <div className="flex space-x-5">
            <Link href={"/privacy"} className="hover:text-accent-foreground">
              Privacy policy
            </Link>
            <Link href={"/tos"} className="hover:text-accent-foreground">
              Terms of Service
            </Link>
            <Link href={"/impressum"} className="hover:text-accent-foreground">
              Legal Notice (Impressum)
            </Link>
          </div>

          <p className="mt-5">©2026 MyApp</p>
        </div>
      </div>
    </footer>
  );
}
