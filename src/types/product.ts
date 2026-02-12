export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

export interface GetProductsParams {
  sort?: "asc" | "desc";
}

export interface PaginationParams {
  page: number;
  itemsPerPage: number;
}

export interface PaginatedProducts {
  products: Product[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}
