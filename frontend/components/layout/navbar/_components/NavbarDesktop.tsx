import { PopcornIcon, SearchIcon } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import AuthButton from "@/components/actions/AuthButton";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import SearchOverlay from "./SearchOverlay";

export default function NavbarDesktop({
  navLinks,
  pathname,
  isSearchOverlayShown,
  handleSearchOverlay,
}: {
  navLinks: { name: string; href: string }[];
  pathname: string;
  isSearchOverlayShown: boolean;
  handleSearchOverlay: () => void;
}) {
  const shouldDisplayRegister = useMediaQuery("(min-width: 1024px)");

  return (
    <nav className="w-full flex justify-between items-center px-10 h-20 text-white max-w-7xl mx-auto">
      {isSearchOverlayShown && <SearchOverlay handleSearchOverlay={handleSearchOverlay} />}

      <div className="flex items-center flex-1 justify-start space-x-5">
        <Link href={"/"}>
          <PopcornIcon />
        </Link>
        <ModeToggle />
      </div>

      <div className="flex items-center space-x-8 justify-center">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.name}
              href={link.href}
              className={
                isActive
                  ? "pointer-events-none font-semibold"
                  : "hover:text-foreground text-muted-foreground transition-colors"
              }
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-x-2 flex-1 justify-end">
        <Button variant="ghost" onClick={handleSearchOverlay} className="rounded-lg">
          <SearchIcon className="h-5.5! w-5.5!" />
        </Button>

        <div className="flex space-x-3">
          {shouldDisplayRegister && <AuthButton type="register" />}
          <AuthButton type="login" />
        </div>
      </div>
    </nav>
  );
}
