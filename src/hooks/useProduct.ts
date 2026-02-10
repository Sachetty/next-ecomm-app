"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/services/productService";
import { productKeys } from "./useProducts";
import type { Product } from "@/types/product";

/**
 * Hook para buscar um produto específico pelo ID.
 *
 * - `enabled`: só executa quando o ID é válido (> 0).
 * - `staleTime`: 5 minutos, pois dados de produto mudam pouco.
 *
 * Princípio da Responsabilidade Única (SRP):
 * Este hook cuida exclusivamente da busca de um produto individual.
 */
export function useProduct(id: number) {
  return useQuery<Product>({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: id > 0,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}
