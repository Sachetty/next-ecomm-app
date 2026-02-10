import type { Product, GetProductsParams } from "@/types/product";
import { apiFetch } from "./api";

/**
 * Serviço de Produtos - FakeStore API.
 *
 * Segue o princípio da Responsabilidade Única (SRP):
 * cada função é responsável por uma única operação de dados.
 *
 * Segue o princípio Aberto/Fechado (OCP):
 * novas operações podem ser adicionadas sem modificar as existentes.
 */

/**
 * Busca todos os produtos.
 * GET /products?sort=asc|desc
 */
export async function getProducts(
  params?: GetProductsParams
): Promise<Product[]> {
  const searchParams = new URLSearchParams();

  if (params?.sort) {
    searchParams.set("sort", params.sort);
  }

  const query = searchParams.toString();
  const endpoint = `/products${query ? `?${query}` : ""}`;

  return apiFetch<Product[]>(endpoint);
}

/**
 * Busca um produto pelo ID.
 * GET /products/:id
 */
export async function getProductById(id: number): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`);
}

/**
 * Busca todas as categorias disponíveis.
 * GET /products/categories
 */
export async function getCategories(): Promise<string[]> {
  return apiFetch<string[]>("/products/categories");
}

/**
 * Busca produtos de uma categoria específica.
 * GET /products/category/:category
 */
export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  return apiFetch<Product[]>(
    `/products/category/${encodeURIComponent(category)}`
  );
}
