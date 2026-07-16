"use server";

import { RegisterValues } from "./page";

export async function registerUser({ username, email, password, tos }: RegisterValues) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/user/register`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ username, email, password, acceptedTos: tos }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }

  return true;
}
