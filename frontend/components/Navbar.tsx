"use client";

import { PopcornIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Discover", href: "/discover" },
    { name: "Watchlist", href: "/watchlist" },
    { name: "Something", href: "/something" },
  ];

  return (
    <header>
      <nav className="absolute top-0 left-0 w-full bg-transparent z-1 flex justify-between px-5 text-white">
        <div className="py-10 px-10">
          <Link href={"/"}>
            <PopcornIcon />
          </Link>
        </div>

        <div className="flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(`${link.href}/`));

            return (
              <Link
                key={link.name}
                href={link.href}
                className={
                  isActive
                    ? "pointer-events-none font-semibold"
                    : "hover:text-white/80 text-muted-foreground"
                }
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center">
          <SearchIcon />
          <div className="flex space-x-5 mx-5">
            <button className="">Sign Up</button>
            <button className="">Login</button>
          </div>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
