type ProvidersQuery = {
  subCategory?: string;
  mainCategory?: string;
  minRating?: string;
  priceRange?: {
    minPrice: number;
    maxPrice: number;
  };
  minRating?: number;
  search?: string;
  isSearchPage?: boolean;
  engaged?: boolean;
};
