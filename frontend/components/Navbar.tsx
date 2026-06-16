"use client";

import { PopcornIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Discover", href: "/discover" },
    { name: "Watchlist", href: "/watchlist" },
    { name: "Something", href: "/something" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-zinc-950/70 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="w-full relative flex items-center px-10 h-20 text-white max-w-350 mx-auto">
        <div className="flex items-center absolute left-0">
          <Link href={"/"}>
            <PopcornIcon />
          </Link>
        </div>

        <div className="flex items-center absolute left-1/2 -translate-x-1/2  space-x-8">
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
                    : "hover:text-white/80 text-muted-foreground transition-colors"
                }
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex absolute right-0 items-center space-x-5">
          <SearchIcon />
          <div className="flex space-x-3">
            <Button variant={"outline"} className="px-5 py-4 rounded-lg">
              Sign Up
            </Button>
            <Button className="px-5 py-4 rounded-lg">Login</Button>
          </div>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
