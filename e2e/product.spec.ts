import { test, expect } from "@playwright/test";

test.describe("Página de Detalhe do Produto (PDP)", () => {
  test("deve exibir detalhes do produto", async ({ page }) => {
    await page.goto("/product/1");

    // Aguarda o conteúdo carregar
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible({
      timeout: 15000,
    });

    // Verifica breadcrumbs (usa first() pois "Home" aparece no header e footer também)
    await expect(
      page.locator('[class*="MuiBreadcrumbs"]').getByText("Home")
    ).toBeVisible();

    // Verifica que existe um preço (formato $XX.XX)
    await expect(page.locator("text=/\\$\\d+\\.\\d{2}/").first()).toBeVisible();

    // Verifica botão de adicionar ao carrinho
    await expect(
      page.getByRole("button", { name: /Adicionar ao Carrinho/ })
    ).toBeVisible();

    // Verifica link de voltar
    await expect(page.getByText("Voltar para produtos")).toBeVisible();
  });

  test("deve navegar de volta para a listagem", async ({ page }) => {
    await page.goto("/product/1");

    // Aguarda carregar
    await expect(page.getByText("Voltar para produtos")).toBeVisible({
      timeout: 15000,
    });

    // Clica em voltar
    await page.getByText("Voltar para produtos").click();

    // Verifica que voltou para a home
    await expect(page).toHaveURL("/");
    await expect(page.getByText("Nossos Produtos")).toBeVisible();
  });

  test("deve navegar da listagem para o detalhe do produto", async ({
    page,
  }) => {
    await page.goto("/");

    // Aguarda os cards carregarem
    await expect(page.locator('[class*="MuiCard-root"]').first()).toBeVisible({
      timeout: 15000,
    });

    // Clica no primeiro produto (o Link envolve o Card)
    await page.locator('a[href^="/product/"]').first().click();

    // Verifica que navegou para a página de detalhe
    await expect(page).toHaveURL(/\/product\/\d+/, { timeout: 10000 });

    // Verifica que o conteúdo do detalhe carregou
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("deve exibir 404 para produto inexistente", async ({ page }) => {
    const response = await page.goto("/product/99999");

    // Verifica que retorna 404
    expect(response?.status()).toBe(404);
  });
});
