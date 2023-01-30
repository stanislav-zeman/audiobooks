import grpc from "grpc-ts/eshop_pb";

export const calculateOffset = (page_number: number, limit: number) => {
  return (page_number - 1) * limit;
};

export const searchFilters = (input: URLSearchParams): grpc.GetBooksRequest => {
  const request = new grpc.GetBooksRequest();
  const filters = new grpc.BookFilters();
  request.setFilters(filters);
  const limit = 16;

  const pagination = new grpc.Pagination();
  request.setPagination(pagination);

  pagination.setLimit(limit);
  pagination.setOffset(calculateOffset(1, limit));

  for (const [key, value] of input.entries()) {
    switch (key) {
      case "search":
        filters.setName(value);
        filters.setAuthorName(value);
        break;
      case "category":
        filters.setTag(value);
        break;
      case "price-to":
        if (value === "") {
          break;
        }
        filters.setPriceto(+value * 100);
        break;
      case "price-from":
        if (value === "") {
          break;
        }
        filters.setPricefrom(+value * 100);
        break;
      case "page":
        pagination.setOffset(calculateOffset(+value, limit));
        break;
      default:
        break;
    }
  }

  return request;
};
