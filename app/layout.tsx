import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

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
      <body className={plusJakartaSans.className}>{children}</body>
    </html>
  );
}

