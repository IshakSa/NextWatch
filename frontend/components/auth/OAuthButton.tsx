import { Button } from "../ui/button";
import GoogleIcon from "../icons/GoogleIcon";

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
        <GoogleIcon className="size-5" />
        <p>Continue with Google</p>
      </Button>
    </>
  );
}
