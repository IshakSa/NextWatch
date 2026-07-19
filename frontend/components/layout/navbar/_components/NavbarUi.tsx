"use client";

import { usePathname } from "next/navigation";
import { useIsScrolled } from "@/hooks/useIsScrolled";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";
import NavbarDesktop from "@/components/layout/navbar/_components/NavbarDesktop";
import NavbarMobile from "@/components/layout/navbar/_components/NavbarMobile";

export default function NavbarUi({ isLoggedIn }: { isLoggedIn: boolean }) {
  const pathname = usePathname();
  const isScrolled = useIsScrolled();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isSearchOverlayShown, setIsSearchOverlayShown] = useState(false);

  function handleSearchOverlay() {
    setIsSearchOverlayShown(!isSearchOverlayShown);
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Discover", href: "/discover" },
    { name: "Watchlist", href: "/watchlist" },
    { name: "Something", href: "/something" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? `bg-zinc-950/70 ${!isSearchOverlayShown && "backdrop-blur-md"} border-b border-white/10 shadow-lg`
          : "bg-transparent border-transparent"
      }`}
    >
      {isDesktop ? (
        <NavbarDesktop
          navLinks={navLinks}
          pathname={pathname}
          isSearchOverlayShown={isSearchOverlayShown}
          handleSearchOverlay={handleSearchOverlay}
          isLoggedIn={isLoggedIn}
        />
      ) : (
        <NavbarMobile
          navLinks={navLinks}
          pathname={pathname}
          isSearchOverlayShown={isSearchOverlayShown}
          handleSearchOverlay={handleSearchOverlay}
          isLoggedIn={isLoggedIn}
        />
      )}
    </header>
  );
}
