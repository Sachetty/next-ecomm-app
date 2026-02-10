"use client";

import Image from "next/image";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

/**
 * Card de produto individual.
 * Responsabilidade única: exibir os dados de um produto em formato card.
 */
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="no-underline">
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
      >
        {/* Imagem */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 220,
            backgroundColor: "#FAFAFA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Image
            src={product.image}
            alt={product.title}
            width={160}
            height={180}
            style={{
              objectFit: "contain",
              maxHeight: "100%",
              width: "auto",
            }}
          />
        </Box>

        {/* Conteúdo */}
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: 2,
            "&:last-child": { pb: 2 },
          }}
        >
          {/* Categoria */}
          <Chip
            label={product.category}
            size="small"
            sx={{
              alignSelf: "flex-start",
              fontSize: "0.7rem",
              textTransform: "capitalize",
              backgroundColor: "#F0F0F0",
              color: "text.secondary",
            }}
          />

          {/* Título */}
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.4,
              minHeight: "2.8em",
            }}
          >
            {product.title}
          </Typography>

          {/* Rating */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Rating
              value={product.rating.rate}
              precision={0.5}
              size="small"
              readOnly
            />
            <Typography variant="caption" color="text.secondary">
              ({product.rating.count})
            </Typography>
          </Box>

          {/* Preço */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "secondary.main",
              mt: "auto",
            }}
          >
            ${product.price.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
