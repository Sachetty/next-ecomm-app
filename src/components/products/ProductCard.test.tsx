import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/products/ProductCard";
import { mockProduct } from "@/test-utils/mocks";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe("ProductCard", () => {
  it("deve renderizar título do produto", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
  });

  it("deve renderizar preço formatado", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("$109.95")).toBeInTheDocument();
  });

  it("deve renderizar categoria", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
  });

  it("deve renderizar contagem de avaliações", () => {
    render(<ProductCard product={mockProduct} />);

    expect(
      screen.getByText(`(${mockProduct.rating.count})`)
    ).toBeInTheDocument();
  });

  it("deve ter link para a página de detalhe", () => {
    render(<ProductCard product={mockProduct} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/product/${mockProduct.id}`);
  });

  it("deve renderizar imagem do produto", () => {
    render(<ProductCard product={mockProduct} />);

    const img = screen.getByAltText(mockProduct.title);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockProduct.image);
  });
});
