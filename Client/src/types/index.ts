export type Book = {
    _id: string;
    title: string;
    author: string;
    description: string;
    coverImage: string;
    slug: string;
    createdAt: string;
    chapters: Chapter[];
}

export type Books = Book[];

export type Chapter = {
    _id: string;
    title: string;
    hebrewTitle: string;
    content: string;
    isTranslated: boolean;
    index: number;
    
}