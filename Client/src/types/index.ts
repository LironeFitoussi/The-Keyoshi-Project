export type Book = {
    _id: string;
    title: string;
    author: string;
    description: string;
    coverImage: string;
    slug: string;
    publishedAt: string;
    isTranslated: boolean;
    chapters: Chapter[];
    createdAt: string;
    updatedAt: string;
}

export type Books = Book[];

export type Chapter = {
    _id: string;
    title: string;
    hebrewTitle: string;
    content: string;
    chapterNumber: number;
    bookId: string;
    isTranslated: boolean;
    index: number;
    createdAt: string;
    updatedAt: string;
    // Approval workflow fields
    submittedContent?: string;
    status: 'draft' | 'pending' | 'approved' | 'rejected';
    submittedBy?: string;
    reviewedBy?: string;
    reviewedAt?: string;
    submittedAt?: string;
    rejectionReason?: string;
}

export type User = {
    _id: string;
    firstName: string;
    lastName?: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    role: string;
}

export type CreateUser = Omit<User, '_id'>;