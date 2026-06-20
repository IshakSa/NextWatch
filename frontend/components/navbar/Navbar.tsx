"use client";

import { usePathname } from "next/navigation";
import NavbarDesktop from "./_components/NavbarDesktop";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import NavbarMobile from "./_components/NavbarMobile";
import { useIsScrolled } from "@/hooks/useIsScrolled";

export default function Navbar() {
  const pathname = usePathname();
  const isScrolled = useIsScrolled();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Discover", href: "/discover" },
    { name: "Watchlist", href: "/watchlist" },
    { name: "Something", href: "/something" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-zinc-950/70 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent border-transparent"
      }`}
    >
      {isDesktop ? (
        <NavbarDesktop navLinks={navLinks} pathname={pathname} />
      ) : (
        <NavbarMobile navLinks={navLinks} pathname={pathname} />
      )}
    </header>
  );
}
