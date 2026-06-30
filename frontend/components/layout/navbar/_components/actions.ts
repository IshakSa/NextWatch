"use server";

export async function searchContent(search: string) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/content/search?query=${search}`,
  );

  if (!response.ok) {
    throw Error("search failed");
  }

  return await response.json();
}
