import { test, expect } from "@playwright/test";

test.describe("Página Inicial - Listagem de Produtos", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("deve exibir o header com o nome da loja", async ({ page }) => {
    await expect(page.getByText("FakeStore").first()).toBeVisible();
  });

  test("deve exibir o título da listagem", async ({ page }) => {
    await expect(page.getByText("Nossos Produtos")).toBeVisible();
  });

  test("deve carregar e exibir produtos", async ({ page }) => {
    // Aguarda os cards de produto carregarem
    await expect(page.locator('[class*="MuiCard-root"]').first()).toBeVisible({
      timeout: 15000,
    });

    // Verifica que existem cards de produto na página
    const cards = page.locator('[class*="MuiCard-root"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(8); // ITEMS_PER_PAGE = 8
  });

  test("deve exibir paginação", async ({ page }) => {
    // Aguarda os produtos carregarem
    await expect(page.locator('[class*="MuiCard-root"]').first()).toBeVisible({
      timeout: 15000,
    });

    // Verifica que existe o componente de paginação
    const pagination = page.locator('[class*="MuiPagination-root"]');
    await expect(pagination).toBeVisible();
  });

  test("deve navegar para a segunda página", async ({ page }) => {
    // Aguarda os produtos carregarem
    await expect(page.locator('[class*="MuiCard-root"]').first()).toBeVisible({
      timeout: 15000,
    });

    // Clica na página 2
    await page.getByRole("button", { name: "Go to page 2" }).click();

    // Aguarda a mudança de página
    await page.waitForTimeout(500);

    // Verifica que os cards ainda estão visíveis
    await expect(page.locator('[class*="MuiCard-root"]').first()).toBeVisible();
  });

  test("deve exibir o select de ordenação", async ({ page }) => {
    const sortSelect = page.getByLabel("Ordenar por");
    await expect(sortSelect).toBeVisible();
  });

  test("deve exibir o footer", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });
});
