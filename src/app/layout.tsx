import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "FakeStore - Loja Online",
  description:
    "Aplicação e-commerce desenvolvida com Next.js, Material UI e React Query consumindo a FakeStore API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
