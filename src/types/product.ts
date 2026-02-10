/**
 * Representa a avaliação de um produto da FakeStore API.
 */
export interface ProductRating {
  rate: number;
  count: number;
}

/**
 * Representa um produto retornado pela FakeStore API.
 *
 * Endpoints:
 * - GET /products
 * - GET /products/:id
 * - GET /products?limit=N&sort=asc|desc
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

/**
 * Parâmetros para busca de produtos com paginação e ordenação.
 * A FakeStore API usa `limit` e `sort` como query params.
 * Como não há offset nativo, a paginação é feita client-side.
 */
export interface GetProductsParams {
  sort?: "asc" | "desc";
}

/**
 * Parâmetros de paginação client-side.
 */
export interface PaginationParams {
  page: number;
  itemsPerPage: number;
}

/**
 * Resultado paginado de produtos.
 */
export interface PaginatedProducts {
  products: Product[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}
