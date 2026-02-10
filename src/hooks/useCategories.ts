"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/productService";
import { productKeys } from "./useProducts";

/**
 * Hook para buscar todas as categorias de produtos.
 *
 * - `staleTime`: 10 minutos, pois categorias são praticamente estáticas.
 *
 * Princípio da Responsabilidade Única (SRP):
 * Este hook cuida exclusivamente da busca de categorias.
 */
export function useCategories() {
  return useQuery<string[]>({
    queryKey: productKeys.categories(),
    queryFn: getCategories,
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
}
