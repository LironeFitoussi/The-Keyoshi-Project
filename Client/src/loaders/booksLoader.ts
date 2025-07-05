import { getAllBooks } from "@/api/bookService";

export default async function booksLoader() {
  try {
    const books = await getAllBooks();
    // Empty array is valid (no books case)
    if (books === null || books === undefined) {
      throw new Error("No books data received");
    }
    return { books };
  } catch (error) {
    // Log the error for debugging
    console.error("Error loading books:", error);
    
    // Return a structured error object that the error boundary can handle
    throw {
      message: error instanceof Error ? error.message : 'Failed to load books',
      status: 500,
      statusText: 'Error loading books'
    };
  }
}

