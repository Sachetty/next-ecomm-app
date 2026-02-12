import type { Product, GetProductsParams } from "@/types/product";
import { apiFetch } from "./api";

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

export async function getProductById(id: number): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`);
}

export async function getCategories(): Promise<string[]> {
  return apiFetch<string[]>("/products/categories");
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  return apiFetch<Product[]>(
    `/products/category/${encodeURIComponent(category)}`
  );
}
