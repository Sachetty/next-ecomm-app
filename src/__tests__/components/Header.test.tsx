import { render, screen } from "@testing-library/react";
import Header from "@/components/layout/Header";

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Header", () => {
  it("deve renderizar o nome da loja", () => {
    render(<Header />);

    expect(screen.getByText("FakeStore")).toBeInTheDocument();
  });

  it("deve renderizar links de navegação", () => {
    render(<Header />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Produtos")).toBeInTheDocument();
  });

  it("deve ter botão de menu mobile", () => {
    render(<Header />);

    const menuButton = screen.getByLabelText("menu");
    expect(menuButton).toBeInTheDocument();
  });
});
