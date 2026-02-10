"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/productService";
import type {
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
 * Hook para buscar todos os produtos com paginação client-side.
 *
 * A FakeStore API não suporta paginação server-side com offset,
 * então buscamos todos os produtos e paginamos no client.
 *
 * Princípio da Inversão de Dependência (DIP):
 * O hook depende da abstração (productService) e não da implementação (fetch).
 */
export function useProducts(
  pagination: PaginationParams,
  params?: GetProductsParams
) {
  return useQuery<PaginatedProducts>({
    queryKey: productKeys.list(params),
    queryFn: async () => {
      const allProducts = await getProducts(params);

      const { page, itemsPerPage } = pagination;
      const totalItems = allProducts.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const products = allProducts.slice(startIndex, endIndex);

      return {
        products,
        totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage,
      };
    },
  });
}
