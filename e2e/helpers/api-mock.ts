import type { Page } from "@playwright/test";

const mockProducts = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and target for weekend getaways.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Slim-fitting style, contrast raglan long sleeve.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description: "Great outerwear jackets for Spring/Autumn/Winter.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 },
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description: "The color could be slightly different between on the screen.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: { rate: 2.1, count: 430 },
  },
  {
    id: 5,
    title: "John Hardy Women's Surfside Bracelet",
    price: 695,
    description: "From our Naga Collection, handcrafted in Bali.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 4.6, count: 400 },
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave",
    price: 168,
    description: "Satisfaction Guaranteed. Return or exchange within 30 days.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 3.9, count: 70 },
  },
  {
    id: 7,
    title: "White Gold Plated Princess",
    price: 9.99,
    description: "Classic Created Wedding Engagement Solitaire Diamond.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 3.0, count: 400 },
  },
  {
    id: 8,
    title: "Pierced Owl Rose Gold Plated",
    price: 10.99,
    description: "Rose Gold Plated Double Flared Tunnel Plug Earrings.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 1.9, count: 100 },
  },
  {
    id: 9,
    title: "WD 2TB Elements Portable External Hard Drive",
    price: 64,
    description: "USB 3.0 and USB 2.0 Compatibility.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    rating: { rate: 3.3, count: 203 },
  },
  {
    id: 10,
    title: "SanDisk SSD PLUS 1TB Internal SSD",
    price: 109,
    description: "Easy upgrade for faster boot up, shutdown, app load.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    rating: { rate: 2.9, count: 470 },
  },
];

const mockCategories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

export async function mockFakeStoreAPI(page: Page) {
  await page.route("**/fakestoreapi.com/**", async (route) => {
    const url = route.request().url();

    const productMatch = url.match(/\/products\/(\d+)$/);
    if (productMatch) {
      const id = parseInt(productMatch[1]);
      const product = mockProducts.find((p) => p.id === id);

      if (product) {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(product),
        });
      }

      return route.fulfill({
        status: 404,
        contentType: "application/json",
        body: JSON.stringify({ message: "Product not found" }),
      });
    }

    if (url.includes("/products/categories")) {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockCategories),
      });
    }

    if (url.match(/\/products(\?.*)?$/)) {
      let products = [...mockProducts];

      if (url.includes("sort=desc")) {
        products = products.reverse();
      }

      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(products),
      });
    }

    return route.fulfill({
      status: 404,
      contentType: "application/json",
      body: JSON.stringify({ message: "Not found" }),
    });
  });
}
