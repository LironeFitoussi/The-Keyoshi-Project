import { getAllBooks } from "@/api/bookService";

export default async function booksLoader() {
  try {
    const books = await getAllBooks();
    if (!books) {
      throw new Error("No books data received");
    }
    return { books };
  } catch (error) {
    console.error("Error loading books:", error);
    throw error; // This will trigger the error boundary
  }
}

