import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProduct } from "@/hooks/useProduct";
import { mockProduct } from "../__mocks__/products";
import type React from "react";

// Mock do productService
jest.mock("@/services/productService", () => ({
  getProductById: jest.fn(),
}));

import { getProductById } from "@/services/productService";
const mockedGetProductById = getProductById as jest.MockedFunction<
  typeof getProductById
>;

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

describe("useProduct", () => {
  beforeEach(() => {
    mockedGetProductById.mockClear();
  });

  it("deve buscar produto pelo ID", async () => {
    mockedGetProductById.mockResolvedValueOnce(mockProduct);

    const { result } = renderHook(() => useProduct(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.id).toBe(1);
    expect(result.current.data?.title).toBe(mockProduct.title);
    expect(mockedGetProductById).toHaveBeenCalledWith(1);
  });

  it("não deve fazer fetch quando ID é 0", () => {
    renderHook(() => useProduct(0), {
      wrapper: createWrapper(),
    });

    expect(mockedGetProductById).not.toHaveBeenCalled();
  });

  it("não deve fazer fetch quando ID é negativo", () => {
    renderHook(() => useProduct(-1), {
      wrapper: createWrapper(),
    });

    expect(mockedGetProductById).not.toHaveBeenCalled();
  });
});
