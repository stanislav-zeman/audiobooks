import grpc from "grpc-ts/eshop_pb.js";

export type BookView = {
  id: string;
  is_owned: boolean;
  authors: string;
  name: string;
  description: string;
  cover_url: string;
  price: number;
  isbn: string;
  tag: string;
};

export const toBookView = (book: grpc.Book): BookView => {
  return {
    id: book.getId(),
    name: book.getName(),
    authors: book.getAuthors(),
    cover_url: book.getCoverUrl(),
    description: book.getDescription(),
    isbn: book.getIsbn(),
    is_owned: book.getIsOwned(),
    price: book.getPrice(),
    tag: book.getTag(),
  };
};

export const fromBookView = (book: BookView): grpc.Book => {
  const b = new grpc.Book();
  
  b.setId(book.id);
  b.setName(book.name);
  b.setAuthors(book.authors);
  b.setCoverUrl(book.cover_url);
  b.setDescription(book.description);
  b.setIsbn(book.isbn);
  b.setIsOwned(book.is_owned);
  b.setPrice(book.price);
  b.setTag(book.tag);
  return b;
};
