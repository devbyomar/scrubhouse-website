import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ScrubHouse Cleaning | Premium Cleaning Services in the GTA",
    template: "%s | ScrubHouse Cleaning",
  },
  description:
    "Premium professional cleaning services for homes and businesses across the Greater Toronto Area. Residential, commercial, and eco-friendly cleaning. Get your free instant quote today.",
  keywords: [
    "cleaning services",
    "house cleaning",
    "office cleaning",
    "commercial cleaning",
    "residential cleaning",
    "eco-friendly cleaning",
    "Toronto cleaning",
    "Mississauga cleaning",
    "GTA cleaning services",
    "professional cleaners",
    "ScrubHouse",
    "deep cleaning",
    "move-in cleaning",
    "move-out cleaning",
  ],
  authors: [{ name: "ScrubHouse Cleaning" }],
  creator: "ScrubHouse Cleaning",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://scrubhouse.ca",
    siteName: "ScrubHouse Cleaning",
    title: "ScrubHouse Cleaning | Premium Cleaning Services in the GTA",
    description:
      "Premium professional cleaning services for homes and businesses across the Greater Toronto Area.",
    images: [
      {
        url: "/logo-full.jpg",
        width: 1200,
        height: 630,
        alt: "ScrubHouse Cleaning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScrubHouse Cleaning | Premium Cleaning Services in the GTA",
    description:
      "Premium professional cleaning services for homes and businesses across the Greater Toronto Area.",
    images: ["/logo-full.jpg"],
  },
  icons: {
    icon: "/logo-icon.jpg",
    apple: "/logo-icon.jpg",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://scrubhouse.ca"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Local Business Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "ScrubHouse Cleaning",
              description:
                "Premium professional cleaning services for homes and businesses across the Greater Toronto Area.",
              url: "https://scrubhouse.ca",
              telephone: "(416) 903-9982",
              email: "scrubhousecc@gmail.com",
              areaServed: [
                { "@type": "City", name: "Mississauga" },
                { "@type": "City", name: "Toronto" },
                { "@type": "City", name: "Brampton" },
                { "@type": "City", name: "Oakville" },
                { "@type": "City", name: "Milton" },
                { "@type": "City", name: "Etobicoke" },
                { "@type": "City", name: "Vaughan" },
              ],
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "10:00",
                closes: "21:00",
              },
              priceRange: "$$",
              serviceType: [
                "House Cleaning",
                "Office Cleaning",
                "Commercial Cleaning",
                "Eco-Friendly Cleaning",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${plusJakarta.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
