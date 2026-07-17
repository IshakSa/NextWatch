"use server";

import { RegisterValues } from "./page";
import { request } from "@/lib/requestHandler";

export async function registerUser({ username, email, password, tos }: RegisterValues) {
  await request("/api/user/register", "failed to register", {
    method: "POST",
    body: JSON.stringify({ username, email, password, acceptedTos: tos }),
  });
  return true;
}
