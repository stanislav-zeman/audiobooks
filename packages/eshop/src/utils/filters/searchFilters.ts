import { GetBooksRequest, BookFilters, Pagination } from "grpc-ts/eshop_pb";

export const calculateOffset = (page_number: number, limit: number) => {
  return page_number * limit;
}

export const searchFilters = (input: URLSearchParams): GetBooksRequest => {
  const filters = new BookFilters();
  const pagination = new Pagination();
  const limit = 16;
  pagination.setLimit(limit);
  pagination.setOffset(0);

  for (const [key, value] of input.entries()) {
    switch (key) {
      case "author_name":
        filters.setAuthorName(value);
        break;
      case "book_name":
        filters.setName(value);
        break;
      case "category":
        filters.setTag(value);
        break;
      case "price_to":
        filters.setPriceto(+value);
        break;
      case "price_from":
        filters.setPricefrom(+value);
        break;
      case "page":
        pagination.setOffset(calculateOffset(+value, limit));
        break;
      default:
        break;
    }
  }

  const request = new GetBooksRequest();
  request.setFilters(filters);
  request.setPagination(pagination);

  return request;
};