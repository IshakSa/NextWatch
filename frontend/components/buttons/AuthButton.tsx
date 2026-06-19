import Link from "next/link";
import { Button } from "../ui/button";

export default function AuthButton({ type }: { type: "login" | "register" }) {
  return (
    <>
      {type === "login" ? (
        <Link href={"/login"}>
          <Button className="px-5 py-4 rounded-lg">Login</Button>
        </Link>
      ) : (
        <Link href={"/register"}>
          <Button variant={"outline"} className="text-foreground px-5 py-4 rounded-lg">
            Sign up
          </Button>
        </Link>
      )}
    </>
  );
}
