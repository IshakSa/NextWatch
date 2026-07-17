import { cookies } from "next/headers";

export async function request(
  input: string | URL | Request,
  errorMessage: string,
  init?: RequestInit,
) {
  const token = (await cookies()).get("auth_token")?.value;

  const customHeaders = {
    "Content-type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...init?.headers,
  };
  const response = await fetch(`${process.env.BACKEND_URL}${input}`, {
    ...init,
    headers: customHeaders,
  });

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  // Check if body is empty to prevent error "unexpected end of JSON input"
  const text = await response.text();

  return text ? JSON.parse(text) : null;
}
