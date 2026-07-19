"use client";

import { useRouter } from "next/navigation";

export default function ProtectedButton({
  isLoggedIn,
  buttonAction,
  children,
}: {
  isLoggedIn: boolean;
  buttonAction: () => void;
  children: React.ReactNode;
}) {
  const router = useRouter();
  function handleClick(event: React.MouseEvent) {
    if (isLoggedIn) {
      buttonAction();
    } else {
      event.preventDefault();
      event.stopPropagation();
      router.push("/login");
    }
  }

  return <div onClick={handleClick}>{children}</div>;
}
