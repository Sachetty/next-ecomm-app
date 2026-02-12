"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import StorefrontIcon from "@mui/icons-material/Storefront";

const CURRENT_YEAR = 2026;

export default function Footer() {

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        backgroundColor: "#1B1B1B",
        color: "white",
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <StorefrontIcon sx={{ color: "#FF6B00", fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                FakeStore
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "grey.400", maxWidth: 300 }}>
              Sua loja online com os melhores produtos. Qualidade e praticidade
              em um só lugar.
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Navegação
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="/"
                color="inherit"
                underline="hover"
                sx={{ color: "grey.400", "&:hover": { color: "white" } }}
              >
                Home
              </Link>
              <Link
                href="/"
                color="inherit"
                underline="hover"
                sx={{ color: "grey.400", "&:hover": { color: "white" } }}
              >
                Produtos
              </Link>
            </Box>
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Informações
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="body2" sx={{ color: "grey.400" }}>
                API: FakeStore API
              </Typography>
              <Typography variant="body2" sx={{ color: "grey.400" }}>
                Framework: Next.js
              </Typography>
              <Typography variant="body2" sx={{ color: "grey.400" }}>
                UI: Material UI + Tailwind
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "grey.800", my: 3 }} />

        <Typography
          variant="body2"
          align="center"
          sx={{ color: "grey.500" }}
        >
          &copy; {CURRENT_YEAR} FakeStore. Projeto de teste desenvolvido com Next.js.
        </Typography>
      </Container>
    </Box>
  );
}
