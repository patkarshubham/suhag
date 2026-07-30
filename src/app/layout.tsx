import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { getCurrentUserId } from "@/lib/customerSession";
import { getCartCount } from "@/lib/cart";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://suhag.example"),
  title: {
    default: "Suhag — Every Wedding Essential, One Place",
    template: "%s | Suhag",
  },
  description:
    "Suhag brings together pooja samagri kits, invitations, bridal & groom wear, jewelry, decor, catering, photography, gifts, and venues — everything you need for your wedding, in one curated place.",
  openGraph: {
    title: "Suhag — Every Wedding Essential, One Place",
    description:
      "Pooja samagri kits, invitations, wear, jewelry, decor, catering, photography, gifts, and venues — curated in one place.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await getCurrentUserId();
  const cartCount = await getCartCount(userId);

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-charcoal">
        <Navbar cartCount={cartCount} isLoggedIn={Boolean(userId)} />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  );
}
