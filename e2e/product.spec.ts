import { test, expect } from "@playwright/test";
import { mockFakeStoreAPI } from "./helpers/api-mock";

test.describe("Página de Detalhe do Produto (PDP)", () => {
  test.beforeEach(async ({ page }) => {
    await mockFakeStoreAPI(page);
  });

  test("deve exibir detalhes do produto", async ({ page }) => {
    await page.goto("/product/1");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible({
      timeout: 15000,
    });

    await expect(
      page.locator('[class*="MuiBreadcrumbs"]').getByText("Home")
    ).toBeVisible();

    await expect(page.locator("text=/\\$\\d+\\.\\d{2}/").first()).toBeVisible();

    await expect(
      page.getByRole("button", { name: /Adicionar ao Carrinho/ })
    ).toBeVisible();

    await expect(page.getByText("Voltar para produtos")).toBeVisible();
  });

  test("deve navegar de volta para a listagem", async ({ page }) => {
    await page.goto("/product/1");

    await expect(page.getByText("Voltar para produtos")).toBeVisible({
      timeout: 15000,
    });

    await page.getByText("Voltar para produtos").click();

    await expect(page).toHaveURL("/");
    await expect(page.getByText("Nossos Produtos")).toBeVisible();
  });

  test("deve navegar da listagem para o detalhe do produto", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator('[class*="MuiCard-root"]').first()).toBeVisible({
      timeout: 15000,
    });

    await page.locator('a[href^="/product/"]').first().click();

    await expect(page).toHaveURL(/\/product\/\d+/, { timeout: 10000 });

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("deve exibir erro para produto inexistente", async ({ page }) => {
    await page.goto("/product/99999");

    await expect(page.locator('[role="alert"]')).toBeVisible({
      timeout: 15000,
    });

    await expect(page.getByText("Voltar para produtos")).toBeVisible();
  });
});
