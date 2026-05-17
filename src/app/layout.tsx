import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pet Paradise Shop | Todo lo que tu mascota necesita",
  description:
    "Encontrá productos de calidad y ofertas increíbles para hacer la vida de tu mejor amigo más feliz. Envíos gratis y 3 cuotas sin interés.",
  keywords: [
    "mascotas", "pet shop", "productos para perros", "productos para gatos",
    "accesorios mascotas", "tienda mascotas", "Pet Paradise",
  ],
  openGraph: {
    title: "Pet Paradise Shop",
    description: "Todo lo que tu mascota necesita",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-white text-gray-900 antialiased font-[family-name:var(--font-inter)]">
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main id="MainContent" role="main" tabIndex={-1} className="focus:outline-none min-h-screen">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
