"use server";

import { LoginValues } from "./page";
import { cookies } from "next/headers";
import { request } from "@/lib/requestHandler";

type LoginResponse = {
  token: string;
  expirationTimeMs: number;
};

function getUserIdFromAuthToken(token: string) {
  try {
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString("utf8"));
    return typeof payload.sub === "string" && payload.sub.length > 0 ? payload.sub : null;
  } catch {
    return null;
  }
}

export async function loginUser({ email, password }: LoginValues) {
  const data: LoginResponse = await request("/api/user/login", "login failed", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const jwtToken = data.token;
  const expirationTimeSeconds = data.expirationTimeMs / 1000;

  const userId = getUserIdFromAuthToken(jwtToken);

  if (!userId) {
    throw new Error("Authentication token does not contain a user identifier");
  }

  const cookieStore = await cookies();
  cookieStore.set("auth_token", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: expirationTimeSeconds,
  });

  return { userId };
}
