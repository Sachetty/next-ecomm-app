import { apiFetch } from "@/services/api";

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("apiFetch", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("deve fazer fetch com a URL completa", async () => {
    const mockData = { id: 1, name: "Test" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await apiFetch("/products");

    expect(mockFetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/products",
      expect.objectContaining({
        headers: expect.any(Object),
      })
    );
    expect(result).toEqual(mockData);
  });

  it("deve lançar erro quando response não é ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    await expect(apiFetch("/products/999")).rejects.toThrow(
      "API Error: 404 Not Found"
    );
  });

  it("deve aceitar options customizadas", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    await apiFetch("/products", {
      headers: { Authorization: "Bearer token" },
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/products",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer token",
        }),
      })
    );
  });
});
