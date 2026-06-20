import { PopcornIcon, SearchIcon } from "lucide-react";
import { ModeToggle } from "../../ModeToggle";
import Link from "next/link";
import AuthButton from "@/components/buttons/AuthButton";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function NavbarDesktop({
  navLinks,
  pathname,
}: {
  navLinks: { name: string; href: string }[];
  pathname: string;
}) {
  const shouldDisplayRegister = useMediaQuery("(min-width: 1024px)");
  return (
    <nav className="w-full flex justify-between items-center px-10 h-20 text-white max-w-7xl mx-auto">
      <div className="flex items-center flex-1 justify-start space-x-5">
        <Link href={"/"}>
          <PopcornIcon />
        </Link>
        <ModeToggle />
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
        <Link href={"/search"}>
          <SearchIcon />
        </Link>

        <div className="flex space-x-3">
          {shouldDisplayRegister && <AuthButton type="register" />}
          <AuthButton type="login" />
        </div>
      </div>
    </nav>
  );
}
