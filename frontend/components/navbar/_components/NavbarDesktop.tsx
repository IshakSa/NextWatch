import { PopcornIcon, SearchIcon } from "lucide-react";
import { ModeToggle } from "../../ModeToggle";
import { Button } from "../../ui/button";
import Link from "next/link";
import LoginButton from "@/components/buttons/LoginButton";

export default function NavbarDesktop({
  navLinks,
  pathname,
}: {
  navLinks: { name: string; href: string }[];
  pathname: string;
}) {
  return (
    <nav className="w-full flex justify-between items-center px-10 h-20 text-white max-w-7xl mx-auto">
      <div className="flex items-center flex-1 justify-start">
        <Link href={"/"}>
          <PopcornIcon />
        </Link>
      </div>

      <div className="flex items-center space-x-8 justify-center">
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

      <div className="flex items-center gap-x-5 flex-1 justify-end">
        <SearchIcon />
        <div className="flex space-x-3">
          <Button variant={"outline"} className="px-5 py-4 rounded-lg">
            Sign Up
          </Button>
          <LoginButton />
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
}
