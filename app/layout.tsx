import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fortegado Premium | Suplemento Mineral Bovino",
  description:
    "Suplemento mineral bovino premium para desempenho, saúde, ganho de peso e produtividade do rebanho.",
  keywords: [
    "suplemento mineral bovino",
    "mineral para gado",
    "nutrição bovina",
    "pecuária de corte",
    "Fortegado Premium",
    "produtividade no rebanho"
  ],
  openGraph: {
    title: "Fortegado Premium",
    description: "Fortaleça, nutra e transforme a performance do seu rebanho.",
    type: "website",
    locale: "pt_BR"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
