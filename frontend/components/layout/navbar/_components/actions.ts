"use server";

import { request } from "@/lib/requestHandler";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function searchContent(search: string) {
  return await request(`/api/content/search?query=${search}`, "search failed");
}

export async function logoutUser() {
  (await cookies()).delete("auth_token");
  redirect("/");
}

export async function deleteUserAccount() {
  await request("/api/user", "deletion failed", {
    method: "DELETE",
  });
  await logoutUser();
}
