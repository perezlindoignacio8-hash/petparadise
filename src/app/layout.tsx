import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import TabTitleManager from "@/components/TabTitleManager";
import FloatingNotification from "@/components/FloatingNotification";
import MetaPixel from "@/components/MetaPixel";

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
  title: "Pet Paradise",
  description:
    "Encontrá productos de calidad y ofertas increíbles para hacer la vida de tu mejor amigo más feliz. Envíos gratis y 3 cuotas sin interés.",
  keywords: [
    "mascotas", "pet shop", "productos para perros", "productos para gatos",
    "accesorios mascotas", "tienda mascotas", "Pet Paradise",
  ],

  openGraph: {
    title: "Pet Paradise",
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
    <html lang="es" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '27452045544446714');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=27452045544446714&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className="bg-white text-[#303854] antialiased font-[family-name:var(--font-inter)]" suppressHydrationWarning>
        <CartProvider>
          <MetaPixel />
          <TabTitleManager />
          <AnnouncementBar />
          <Header />
          <main id="MainContent" role="main" tabIndex={-1} className="focus:outline-none min-h-screen">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <FloatingNotification />
        </CartProvider>
      </body>
    </html>
  );
}
