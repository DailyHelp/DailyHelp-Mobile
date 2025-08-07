type ProvidersQuery = {
  filter?: {
    subCategory?: string;
    mainCategory?: string;
    minRating?: string;
    priceRange?: {
      minPrice: number;
      maxPrice: number;
    };
    minRating?: number;
    search?: string;
  };
  pagination?: PaginationQuery;
};
