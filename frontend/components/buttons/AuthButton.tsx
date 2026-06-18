import Link from "next/link";
import { Button } from "../ui/button";

export default function AuthButton({ type }: { type: "Login" | "Register" }) {
  return (
    <>
      {type === "Login" ? (
        <Button className="px-5 py-4 rounded-lg">
          <Link href={"/login"}>Login</Link>
        </Button>
      ) : (
        <Button variant={"outline"} className="px-5 py-4 rounded-lg">
          <Link href={"/register"}>Sign Up</Link>
        </Button>
      )}
    </>
  );
}
