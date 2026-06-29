"use server";

import { LoginValues } from "./page";

export async function loginUser({email, password}: LoginValues) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/user/login`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }

  return true;
}
