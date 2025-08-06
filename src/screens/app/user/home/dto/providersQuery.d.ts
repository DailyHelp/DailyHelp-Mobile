type ProvidersQuery = PaginationQuery & {
  subCategory?: string;
  mainCategory?: string;
  priceRange?: {
    minPrice?: string;
    maxPrice?: string;
  };
  minRating?: string;
  address?: string;
  search?: string;
  latitude?: string;
  longitude?: string;
};
