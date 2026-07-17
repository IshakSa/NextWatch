"use server";

import { LoginValues } from "./page";
import { cookies } from "next/headers";
import { request } from "@/lib/requestHandler";

type LoginResponse = {
  token: string;
  expirationTimeMs: number;
};

export async function loginUser({ email, password }: LoginValues) {
  const data: LoginResponse = await request("/api/user/login", "login failed", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const jwtToken = data.token;
  const expirationTimeSeconds = data.expirationTimeMs / 1000;

  const cookieStore = await cookies();
  cookieStore.set("auth_token", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: expirationTimeSeconds,
  });
}
