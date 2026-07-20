import { SearchIcon } from "lucide-react";
import Link from "next/link";
import AuthButton from "@/components/actions/AuthButton";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import SearchOverlay from "./SearchOverlay";
import UserMenu from "@/components/layout/navbar/_components/UserMenu";
import Logo from "./Logo";
import { ModeToggle } from "@/components/layout/navbar/_components/ModeToggle";

export default function NavbarDesktop({
  navLinks,
  pathname,
  isSearchOverlayShown,
  handleSearchOverlay,
  isLoggedIn,
}: {
  navLinks: { name: string; href: string }[];
  pathname: string;
  isSearchOverlayShown: boolean;
  handleSearchOverlay: () => void;
  isLoggedIn: boolean;
}) {
  const shouldDisplayRegister = useMediaQuery("(min-width: 1280px)");

  return (
    <nav className="w-full flex justify-between items-center px-10 h-20 text-white container">
      {isSearchOverlayShown && <SearchOverlay handleSearchOverlay={handleSearchOverlay} />}

      <div className="flex items-center flex-1">
        <Link href={"/"}>
          <Logo />
        </Link>
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

      <div className="flex items-center gap-x-5 flex-1 justify-end">
        <Button variant="ghost" onClick={handleSearchOverlay} className="rounded-lg" size="icon">
          <SearchIcon className="h-5.5! w-5.5!" />
        </Button>

        <div className="flex space-x-3">
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <>
              {shouldDisplayRegister && <AuthButton type="register" />}
              <AuthButton type="login" />
            </>
          )}
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
}
