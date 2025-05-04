import type { LoaderFunctionArgs } from "react-router-dom";
import { getBookBySlug } from "@/api/bookService";
export default async function bookLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const slug = url.pathname.split("/").pop();
  if (!slug) {
    return { error: "Slug is required" };
  }
  const book = await getBookBySlug(slug);
  return { book };
}
