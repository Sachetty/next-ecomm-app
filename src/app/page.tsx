import Container from "@mui/material/Container";
import ProductList from "@/components/products/ProductList";

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ProductList />
    </Container>
  );
}
