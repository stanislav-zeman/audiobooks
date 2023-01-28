import type { Book } from "grpc-ts/eshop_pb";

export type AuthorView = {
    id: string;
    name: string;
}

export type ChapterView = {
    id: string;
    chapter_name: string;
    start: number;
}

export type BookView = {
    id: string;
    is_owned: boolean;
    chapters: ChapterView[];
    authors: AuthorView[];
    length: number;
    name: string;
    description: string;
    file_url: string;
    cover_url: string;
    price: number;
    isbn: string;
    tag: string;
};

export const toBookView = (book: Book): BookView => {
    const chapters: ChapterView[] = book.getChaptersList().map(book => ({
        chapter_name: book.getChapterName(),
        id: book.getId(),
        start: book.getStart(),
    }))

    const authors: AuthorView[] = book.getAuthorsList().map(author => ({
        id: author.getId(),
        name: author.getName(),
    }))

    return {
        id: book.getId(),
        name: book.getName(),
        authors,
        chapters,
        cover_url: book.getCoverUrl(),
        file_url: book.getFileUrl(),
        description: book.getDescription(),
        isbn: book.getIsbn(),
        is_owned: book.getIsOwned(),
        length: book.getLength(),
        price: book.getPrice(),
        tag: book.getTag()
    }
}