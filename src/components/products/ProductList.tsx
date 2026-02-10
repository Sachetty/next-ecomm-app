"use client";

import { useState } from "react";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";
import type { GetProductsParams } from "@/types/product";

const ITEMS_PER_PAGE = 8;

/**
 * Skeleton de loading para o ProductCard.
 */
function ProductCardSkeleton() {
  return (
    <Card sx={{ height: "100%" }}>
      <Skeleton variant="rectangular" height={220} />
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Skeleton variant="rounded" width={80} height={24} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "80%" }} />
        <Skeleton variant="text" sx={{ fontSize: "0.8rem", width: "60%" }} />
        <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "40%" }} />
      </CardContent>
    </Card>
  );
}

/**
 * Componente de listagem de produtos com paginação e ordenação.
 *
 * Responsabilidades:
 * - Gerenciar estado de paginação e ordenação
 * - Renderizar grid de ProductCards
 * - Exibir estados de loading e erro
 */
export default function ProductList() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<GetProductsParams["sort"]>(undefined);

  const { data, isLoading, isError, error } = useProducts(
    { page, itemsPerPage: ITEMS_PER_PAGE },
    sort ? { sort } : undefined
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSort(value === "" ? undefined : (value as "asc" | "desc"));
    setPage(1);
  };

  // Estado de erro
  if (isError) {
    return (
      <Alert severity="error" sx={{ my: 4 }}>
        Erro ao carregar produtos:{" "}
        {error instanceof Error ? error.message : "Erro desconhecido"}
      </Alert>
    );
  }

  return (
    <Box>
      {/* Header da listagem: título + ordenação */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Nossos Produtos
          </Typography>
          {data && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {data.totalItems} produtos encontrados
            </Typography>
          )}
        </Box>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="sort-label">Ordenar por</InputLabel>
          <Select
            labelId="sort-label"
            value={sort ?? ""}
            label="Ordenar por"
            onChange={handleSortChange}
          >
            <MenuItem value="">Padrão</MenuItem>
            <MenuItem value="asc">Preço: Menor → Maior</MenuItem>
            <MenuItem value="desc">Preço: Maior → Menor</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Grid de produtos */}
      <Grid container spacing={3}>
        {isLoading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                <ProductCardSkeleton />
              </Grid>
            ))
          : data?.products.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
      </Grid>

      {/* Paginação */}
      {data && data.totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
            mb: 2,
          }}
        >
          <Pagination
            count={data.totalPages}
            page={data.currentPage}
            onChange={handlePageChange}
            color="standard"
            size="large"
            showFirstButton
            showLastButton
            sx={{
              "& .MuiPaginationItem-root": {
                fontWeight: 600,
              },
              "& .Mui-selected": {
                backgroundColor: "primary.main !important",
                color: "white",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
