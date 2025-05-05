export type Book = {
    _id: string;
    title: string;
    author: string;
    description: string;
    coverImage: string;
    slug: string;
    createdAt: string;
}

export type Books = Book[];