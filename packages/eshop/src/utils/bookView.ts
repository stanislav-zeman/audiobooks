import grpc from "grpc-ts/eshop_pb";

export type AuthorView = {
  id: string;
  name: string;
};

export type BookView = {
  id: string;
  is_owned: boolean;
  authors: AuthorView[];
  name: string;
  description: string;
  cover_url: string;
  price: number;
  isbn: string;
  tag: string;
};

export const toBookView = (book: grpc.Book): BookView => {
  const authors: AuthorView[] = book.getAuthorsList().map((author) => ({
    id: author.getId(),
    name: author.getName(),
  }));

  return {
    id: book.getId(),
    name: book.getName(),
    authors,
    cover_url: book.getCoverUrl(),
    description: book.getDescription(),
    isbn: book.getIsbn(),
    is_owned: book.getIsOwned(),
    price: book.getPrice(),
    tag: book.getTag(),
  };
};

export const fromBookView = (book: BookView): grpc.Book => {
  const authors: grpc.Author[] = book.authors.map((author) => {
    const a = new grpc.Author();
    a.setId(author.id);
    a.setName(author.name);
    return a;
  });

  const b = new grpc.Book();
  b.setId(book.id);
  b.setName(book.name);
  b.setAuthorsList(authors);
  b.setCoverUrl(book.cover_url);
  b.setDescription(book.description);
  b.setIsbn(book.isbn);
  b.setIsOwned(book.is_owned);
  b.setPrice(book.price);
  b.setTag(book.tag);
  return b;
};
