"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useProduct } from "@/hooks/useProduct";
import ProductDetail from "./ProductDetail";

interface ProductDetailPageProps {
  productId: number;
}

export default function ProductDetailPage({
  productId,
}: ProductDetailPageProps) {
  const { data: product, isLoading, isError, error } = useProduct(productId);

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="text" width={300} height={24} sx={{ mb: 3 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 6 },
          }}
        >
          <Skeleton
            variant="rounded"
            sx={{
              flex: { md: "0 0 45%" },
              height: { xs: 300, md: 450 },
              borderRadius: 3,
            }}
          />
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <Skeleton variant="rounded" width={100} height={28} />
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "2rem", width: "70%" }} />
            <Skeleton variant="text" width={200} height={24} />
            <Skeleton variant="text" sx={{ fontSize: "2.5rem", width: "30%" }} />
            <Skeleton variant="rectangular" height={1} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "80%" }} />
          </Box>
        </Box>
      </Container>
    );
  }

  if (isError || !product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error instanceof Error
            ? error.message
            : "Erro ao carregar o produto."}
        </Alert>
        <Button
          component={Link}
          href="/"
          variant="text"
          startIcon={<ArrowBackIcon />}
        >
          Voltar para produtos
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ProductDetail product={product} />
    </Container>
  );
}
