import { Button } from "../ui/button";

export default function AuthButton({ type }: { type: "Login" | "Register" }) {
  return (
    <>
      {type === "Login" ? (
        <Button className="px-5 py-4 rounded-lg">Login</Button>
      ) : (
        <Button variant={"outline"} className="px-5 py-4 rounded-lg">
          Sign Up
        </Button>
      )}
    </>
  );
}
