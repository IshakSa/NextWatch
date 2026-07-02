import Image from "next/image";
import { Button } from "../ui/button";

export default function OAuthButton() {
  return (
    <>
      <div className="flex items-center my-4 lg:my-5 2xl:my-6 w-full">
        <div className="grow h-px bg-border" />

        <span className="shrink mx-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Or
        </span>

        <div className="grow h-px bg-border" />
      </div>

      <Button variant="outline" className="w-full gap-3 rounded-lg mb-3">
        <Image src={"/icons/google.svg"} alt="Google logo" width={20} height={20} />
        <p>Continue with Google</p>
      </Button>
    </>
  );
}
