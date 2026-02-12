"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/productService";
import type {
  Product,
  GetProductsParams,
  PaginatedProducts,
  PaginationParams,
} from "@/types/product";

/**
 * Query key factory para produtos.
 * Centraliza as keys para evitar colisões e facilitar invalidação.
 */
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (params?: GetProductsParams) =>
    [...productKeys.lists(), params ?? {}] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
  categories: () => [...productKeys.all, "categories"] as const,
};

/**
 * Pagina um array de produtos.
 * Função pura, separada para facilitar testes (SRP).
 */
function paginateProducts(
  allProducts: Product[],
  { page, itemsPerPage }: PaginationParams
): PaginatedProducts {
  const totalItems = allProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const products = allProducts.slice(startIndex, startIndex + itemsPerPage);

  return {
    products,
    totalItems,
    totalPages,
    currentPage: page,
    itemsPerPage,
  };
}

/**
 * Hook para buscar todos os produtos com paginação client-side.
 *
 * A ordenação é feita pela API (?sort=asc|desc).
 * A paginação é feita no `select` (sem re-fetch ao trocar de página).
 *
 * Quando o sort muda, a queryKey muda e o React Query re-fetcha da API.
 */
export function useProducts(
  pagination: PaginationParams,
  params?: GetProductsParams
) {
  return useQuery<Product[], Error, PaginatedProducts>({
    queryKey: productKeys.list(params),
    queryFn: () => getProducts(params),
    select: (allProducts) => paginateProducts(allProducts, pagination),
  });
}
