"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/services/productService";
import { productKeys } from "./useProducts";
import type { Product } from "@/types/product";


export function useProduct(id: number) {
  return useQuery<Product>({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: id > 0,
    staleTime: 5 * 60 * 1000,
  });
}
