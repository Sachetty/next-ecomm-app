/**
 * Configuração base da API.
 * Centraliza a URL e o fetch para facilitar manutenção (SOLID - SRP).
 */
const BASE_URL = "https://fakestoreapi.com";

/**
 * Fetch wrapper com tratamento de erro padronizado.
 * Princípio da Responsabilidade Única: esta função cuida apenas de
 * fazer o request HTTP e tratar erros genéricos.
 */
export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(
      `API Error: ${response.status} ${response.statusText} - ${url}`
    );
  }

  return response.json() as Promise<T>;
}
