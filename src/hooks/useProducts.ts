"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/productService";
import type {
  Product,
  GetProductsParams,
  PaginatedProducts,
  PaginationParams,
} from "@/types/product";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (params?: GetProductsParams) =>
    [...productKeys.lists(), params ?? {}] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
  categories: () => [...productKeys.all, "categories"] as const,
};

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
