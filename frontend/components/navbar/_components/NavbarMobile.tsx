import { MenuIcon, PopcornIcon, SearchIcon } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetClose,
} from "../../ui/sheet";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import AuthButton from "@/components/buttons/AuthButton";

export default function NavbarMobile({
  navLinks,
  pathname,
}: {
  navLinks: { name: string; href: string }[];
  pathname: string;
}) {
  return (
    <nav className="p-5 max-w-150 justify-between flex items-center mx-auto">
      <div className="flex">
        <Sheet>
          <SheetTrigger>
            <MenuIcon />
          </SheetTrigger>

          <SheetContent side="top">
            <SheetHeader>
              <SheetDescription
                render={
                  <p className="pb-2 text-muted-foreground/60">Navigation</p>
                }
              />

              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(`${link.href}/`));

                return (
                  <SheetClose key={link.name}>
                    <Link
                      href={link.href}
                      className={`flex text-3xl
                      ${
                        isActive
                          ? "pointer-events-none font-semibold"
                          : "text-muted-foreground"
                      }
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

        <Link href={"/"} className="ml-5">
          <PopcornIcon />
        </Link>
      </div>

      <div className="flex items-center justify-end space-x-5">
        <Link href={"/search"}>
          <SearchIcon />
        </Link>

        <AuthButton type="Login" />
      </div>
    </nav>
  );
}
