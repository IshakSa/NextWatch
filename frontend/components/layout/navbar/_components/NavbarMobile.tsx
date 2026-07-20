import { MenuIcon, SearchIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "../../../ui/sheet";
import Link from "next/link";
import { ModeToggle } from "@/components/layout/navbar/_components/ModeToggle";
import AuthButton from "@/components/actions/AuthButton";
import { Button } from "@/components/ui/button";
import SearchOverlay from "./SearchOverlay";
import UserMenu from "@/components/layout/navbar/_components/UserMenu";
import Logo from "@/components/layout/navbar/_components/Logo";

export default function NavbarMobile({
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
  return (
    <nav className="p-5 justify-between text-white flex items-center container">
      <div className="flex gap-5">
        <Sheet>
          <SheetTrigger>
            <MenuIcon />
          </SheetTrigger>

          <SheetContent side="top">
            <SheetHeader>
              <SheetDescription
                render={<p className="pb-2 text-muted-foreground/60">Navigation</p>}
              />

              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                  <SheetClose key={link.name}>
                    <Link
                      href={link.href}
                      className={`flex text-3xl
                      ${isActive ? "pointer-events-none font-semibold" : "text-muted-foreground"}
                    `}
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                );
              })}
              <div className="mt-5 pt-4 border-t-2 flex justify-end">
                <ModeToggle />
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Link href={"/"}>
          <Logo />
        </Link>
      </div>

      <div className="flex items-center justify-end space-x-3">
        <Button variant="ghost" onClick={handleSearchOverlay} className="rounded-lg" size="icon">
          <SearchIcon className="h-5.5! w-5.5!" />
        </Button>

        {isLoggedIn ? <UserMenu /> : <AuthButton type="login" />}
      </div>
      {isSearchOverlayShown && <SearchOverlay handleSearchOverlay={handleSearchOverlay} />}
    </nav>
  );
}
