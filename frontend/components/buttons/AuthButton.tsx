import Link from "next/link";
import { Button } from "../ui/button";

export default function AuthButton({ type }: { type: "Login" | "Register" }) {
  return (
    <>
      {type === "Login" ? (
        <Link href={"/login"}>
          <Button className="px-5 py-4 rounded-lg">Login</Button>
        </Link>
      ) : (
        <Link href={"/register"}>
          <Button variant={"outline"} className="px-5 py-4 rounded-lg">
            Sign Up
          </Button>
        </Link>
      )}
    </>
  );
}
