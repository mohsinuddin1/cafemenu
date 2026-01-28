import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Saffron & Spice | Premium Dining Experience",
    description: "Discover our exquisite menu featuring carefully crafted dishes that celebrate flavors from around the world. Scan, browse, and savor.",
    keywords: ["restaurant", "menu", "dining", "food", "cuisine", "premium"],
    authors: [{ name: "Saffron & Spice" }],
    openGraph: {
        title: "Saffron & Spice | Premium Dining Experience",
        description: "Discover our exquisite menu featuring carefully crafted dishes",
        type: "website",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#0a0a0b",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <body className="min-h-screen bg-dark-900 text-white antialiased">
                {children}
            </body>
        </html>
    );
}
