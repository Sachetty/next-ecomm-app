import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import type { Metadata } from "next";
import { getProductById, getProducts } from "@/services/productService";
import ProductDetail from "@/components/products/ProductDetail";
import type { Product } from "@/types/product";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Gera os parâmetros estáticos para SSG.
 * O Next.js vai pré-renderizar uma página para cada produto no build time.
 * Isso é essencial para performance e SEO.
 */
export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    id: String(product.id),
  }));
}

/**
 * Gera metadata dinâmica para SEO.
 * Cada página de produto terá title e description únicos.
 */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId) || productId <= 0) {
    return { title: "Produto não encontrado - FakeStore" };
  }

  try {
    const product = await getProductById(productId);

    return {
      title: `${product.title} - FakeStore`,
      description: product.description.slice(0, 160),
    };
  } catch {
    return { title: "Produto não encontrado - FakeStore" };
  }
}

/**
 * Página de detalhe do produto (PDP).
 *
 * Esta é um Server Component que busca os dados no servidor.
 * Combinada com generateStaticParams, aplica SSG:
 * as páginas são pré-renderizadas no build time.
 *
 * Princípios de renderização do Next.js aplicados:
 * - SSG via generateStaticParams (páginas estáticas pré-geradas)
 * - Server Component (fetch no servidor, sem bundle no client)
 * - Metadata dinâmica para SEO
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId) || productId <= 0) {
    notFound();
  }

  let product: Product;

  try {
    product = await getProductById(productId);
  } catch {
    notFound();
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ProductDetail product={product} />
    </Container>
  );
}
