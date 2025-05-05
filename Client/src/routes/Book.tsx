import { useLoaderData } from "react-router-dom";
import { type Book } from "@/types/index";
export default function Book() {
  const data = useLoaderData() as { book: Book };
  console.log(data);
  return <div>
    <h1>{data?.book?.title || "Book"}</h1>
  </div>;
}
