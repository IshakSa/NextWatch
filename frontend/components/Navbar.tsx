import { PopcornIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <nav className="absolute top-0 left-0 w-full bg-transparent z-1 flex justify-between px-5 text-white">
        <div className="py-10 px-10">
          <Link href={"/"}>
            <PopcornIcon />
          </Link>
        </div>

        <div className="flex items-center space-x-8">
          <Link href={"/"} className="">
            Home
          </Link>

          <Link href={"/"} className="">
            Discover
          </Link>

          <Link href={"/"} className="">
            Watchlist
          </Link>

          <Link href={"/"} className="">
            Something
          </Link>
        </div>

        <div className="flex items-center">
          <SearchIcon />
          <div className="flex space-x-5 mx-5">
            <button className="">Sign Up</button>
            <button className="">Login</button>
          </div>
        </div>
      </nav>
    </header>
  );
}
