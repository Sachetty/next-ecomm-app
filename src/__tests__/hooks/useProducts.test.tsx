import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProducts } from "@/hooks/useProducts";
import { mockProducts } from "../__mocks__/products";
import type React from "react";

// Mock do productService
jest.mock("@/services/productService", () => ({
  getProducts: jest.fn(),
}));

import { getProducts } from "@/services/productService";
const mockedGetProducts = getProducts as jest.MockedFunction<
  typeof getProducts
>;

/**
 * Wrapper com QueryClientProvider para testes de hooks.
 */
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe("useProducts", () => {
  beforeEach(() => {
    mockedGetProducts.mockClear();
  });

  it("deve retornar produtos paginados (página 1)", async () => {
    mockedGetProducts.mockResolvedValueOnce(mockProducts);

    const { result } = renderHook(
      () => useProducts({ page: 1, itemsPerPage: 2 }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.products).toHaveLength(2);
    expect(result.current.data?.totalItems).toBe(5);
    expect(result.current.data?.totalPages).toBe(3);
    expect(result.current.data?.currentPage).toBe(1);
    expect(result.current.data?.products[0].id).toBe(1);
    expect(result.current.data?.products[1].id).toBe(2);
  });

  it("deve retornar produtos paginados (página 2)", async () => {
    mockedGetProducts.mockResolvedValueOnce(mockProducts);

    const { result } = renderHook(
      () => useProducts({ page: 2, itemsPerPage: 2 }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.products).toHaveLength(2);
    expect(result.current.data?.currentPage).toBe(2);
    expect(result.current.data?.products[0].id).toBe(3);
    expect(result.current.data?.products[1].id).toBe(4);
  });

  it("deve retornar última página parcial", async () => {
    mockedGetProducts.mockResolvedValueOnce(mockProducts);

    const { result } = renderHook(
      () => useProducts({ page: 3, itemsPerPage: 2 }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.products).toHaveLength(1);
    expect(result.current.data?.products[0].id).toBe(5);
  });

  it("deve passar sort params para o service", async () => {
    mockedGetProducts.mockResolvedValueOnce(mockProducts);

    const { result } = renderHook(
      () => useProducts({ page: 1, itemsPerPage: 10 }, { sort: "desc" }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedGetProducts).toHaveBeenCalledWith({ sort: "desc" });
  });
});
