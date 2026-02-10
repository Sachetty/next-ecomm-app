"use client";

import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import type { Product } from "@/types/product";

interface ProductDetailProps {
  product: Product;
}

/**
 * Componente de detalhe do produto (PDP).
 * Responsabilidade única: exibir todas as informações de um produto.
 * Recebe o produto como prop (dados buscados no server component).
 */
export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <Box>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link href="/" className="no-underline hover:underline">
          <Typography variant="body2" color="text.secondary">
            Home
          </Typography>
        </Link>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textTransform: "capitalize" }}
        >
          {product.category}
        </Typography>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{
            maxWidth: 200,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {product.title}
        </Typography>
      </Breadcrumbs>

      {/* Layout principal: imagem + info */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 3, md: 6 },
        }}
      >
        {/* Imagem */}
        <Box
          sx={{
            flex: { md: "0 0 45%" },
            backgroundColor: "#FAFAFA",
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
            minHeight: { xs: 300, md: 450 },
          }}
        >
          <Image
            src={product.image}
            alt={product.title}
            width={350}
            height={400}
            style={{
              objectFit: "contain",
              maxHeight: "100%",
              width: "auto",
            }}
            priority
          />
        </Box>

        {/* Informações */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Categoria */}
          <Chip
            label={product.category}
            size="small"
            sx={{
              alignSelf: "flex-start",
              textTransform: "capitalize",
              backgroundColor: "#F0F0F0",
              color: "text.secondary",
              fontWeight: 500,
            }}
          />

          {/* Título */}
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            {product.title}
          </Typography>

          {/* Rating */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rating
              value={product.rating.rate}
              precision={0.5}
              readOnly
            />
            <Typography variant="body2" color="text.secondary">
              {product.rating.rate} ({product.rating.count} avaliações)
            </Typography>
          </Box>

          {/* Preço */}
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, color: "secondary.main" }}
          >
            ${product.price.toFixed(2)}
          </Typography>

          <Divider />

          {/* Descrição */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 1 }}
            >
              Descrição
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.8 }}
            >
              {product.description}
            </Typography>
          </Box>

          <Divider />

          {/* Benefícios */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocalShippingOutlinedIcon
                fontSize="small"
                sx={{ color: "text.secondary" }}
              />
              <Typography variant="body2" color="text.secondary">
                Frete grátis para todo o Brasil
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <VerifiedOutlinedIcon
                fontSize="small"
                sx={{ color: "text.secondary" }}
              />
              <Typography variant="body2" color="text.secondary">
                Garantia de 12 meses
              </Typography>
            </Box>
          </Box>

          {/* Botão de compra */}
          <Button
            variant="contained"
            size="large"
            startIcon={<ShoppingCartOutlinedIcon />}
            sx={{
              mt: 2,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            Adicionar ao Carrinho
          </Button>

          {/* Voltar */}
          <Button
            component={Link}
            href="/"
            variant="text"
            startIcon={<ArrowBackIcon />}
            sx={{ alignSelf: "flex-start", color: "text.secondary" }}
          >
            Voltar para produtos
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
