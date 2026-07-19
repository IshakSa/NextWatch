import NavbarUi from "@/components/layout/navbar/_components/NavbarUi";
import { cookies } from "next/headers";

export default async function Navbar() {
  const isLoggedIn = (await cookies()).has("auth_token");

  return <NavbarUi isLoggedIn={isLoggedIn} />;
}
