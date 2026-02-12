import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailPage from "@/components/products/ProductDetailPage";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId) || productId <= 0) {
    return { title: "Produto não encontrado - FakeStore" };
  }

  return {
    title: `Produto #${productId} - FakeStore`,
    description: "Veja os detalhes deste produto na FakeStore.",
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId) || productId <= 0) {
    notFound();
  }

  return <ProductDetailPage productId={productId} />;
}
