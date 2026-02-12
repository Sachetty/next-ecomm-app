import {
  getProducts,
  getProductById,
  getCategories,
  getProductsByCategory,
} from "@/services/productService";
import { mockProducts, mockProduct } from "../__mocks__/products";

// Mock do módulo api
jest.mock("@/services/api", () => ({
  apiFetch: jest.fn(),
}));

import { apiFetch } from "@/services/api";
const mockedApiFetch = apiFetch as jest.MockedFunction<typeof apiFetch>;

describe("productService", () => {
  beforeEach(() => {
    mockedApiFetch.mockClear();
  });

  describe("getProducts", () => {
    it("deve buscar todos os produtos sem parâmetros", async () => {
      mockedApiFetch.mockResolvedValueOnce(mockProducts);

      const result = await getProducts();

      expect(mockedApiFetch).toHaveBeenCalledWith("/products");
      expect(result).toEqual(mockProducts);
    });

    it("deve buscar produtos com sort=asc", async () => {
      mockedApiFetch.mockResolvedValueOnce(mockProducts);

      await getProducts({ sort: "asc" });

      expect(mockedApiFetch).toHaveBeenCalledWith("/products?sort=asc");
    });

    it("deve buscar produtos com sort=desc", async () => {
      mockedApiFetch.mockResolvedValueOnce(mockProducts);

      await getProducts({ sort: "desc" });

      expect(mockedApiFetch).toHaveBeenCalledWith("/products?sort=desc");
    });
  });

  describe("getProductById", () => {
    it("deve buscar um produto pelo ID", async () => {
      mockedApiFetch.mockResolvedValueOnce(mockProduct);

      const result = await getProductById(1);

      expect(mockedApiFetch).toHaveBeenCalledWith("/products/1");
      expect(result).toEqual(mockProduct);
    });
  });

  describe("getCategories", () => {
    it("deve buscar todas as categorias", async () => {
      const categories = ["electronics", "jewelery", "men's clothing"];
      mockedApiFetch.mockResolvedValueOnce(categories);

      const result = await getCategories();

      expect(mockedApiFetch).toHaveBeenCalledWith("/products/categories");
      expect(result).toEqual(categories);
    });
  });

  describe("getProductsByCategory", () => {
    it("deve buscar produtos por categoria", async () => {
      mockedApiFetch.mockResolvedValueOnce(mockProducts.slice(0, 2));

      const result = await getProductsByCategory("men's clothing");

      expect(mockedApiFetch).toHaveBeenCalledWith(
        "/products/category/men's%20clothing"
      );
      expect(result).toHaveLength(2);
    });
  });
});
