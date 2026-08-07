import NavbarUi from "@/components/layout/navbar/_components/NavbarUi";
import { cookies } from "next/headers";

function getUserIdFromAuthToken(token: string | undefined) {
  if (!token) return null;

  try {
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString("utf8"));
    return typeof payload.sub === "string" && payload.sub.length > 0 ? payload.sub : null;
  } catch {
    return null;
  }
}

export default async function Navbar() {
  const authToken = (await cookies()).get("auth_token")?.value;
  const userId = getUserIdFromAuthToken(authToken);

  return <NavbarUi isLoggedIn={Boolean(authToken)} userId={userId} />;
}
