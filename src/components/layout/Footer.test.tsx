import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("deve renderizar o nome da loja", () => {
    render(<Footer />);

    expect(screen.getByText("FakeStore")).toBeInTheDocument();
  });

  it("deve renderizar descrição", () => {
    render(<Footer />);

    expect(
      screen.getByText(/Sua loja online com os melhores produtos/)
    ).toBeInTheDocument();
  });

  it("deve renderizar seção de navegação", () => {
    render(<Footer />);

    expect(screen.getByText("Navegação")).toBeInTheDocument();
  });

  it("deve renderizar seção de informações", () => {
    render(<Footer />);

    expect(screen.getByText("Informações")).toBeInTheDocument();
  });

  it("deve renderizar ano de copyright", () => {
    render(<Footer />);

    expect(screen.getByText(/2026 FakeStore/)).toBeInTheDocument();
  });

  it("deve renderizar info das tecnologias", () => {
    render(<Footer />);

    expect(screen.getByText(/Material UI \+ Tailwind/)).toBeInTheDocument();
    expect(screen.getByText(/Framework: Next.js/)).toBeInTheDocument();
  });
});
