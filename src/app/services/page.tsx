import type { Metadata } from "next";
import { ServicesPageClient } from "./client";
import {
  JsonLd,
  generateBreadcrumbSchema,
  generateServiceSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Professional Cleaning Services | Residential & Commercial",
  description:
    "Explore ScrubHouse's professional cleaning services: residential cleaning, commercial cleaning, and eco-friendly options. Silver, Gold, and Platinum packages available across the GTA.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Professional Cleaning Services | ScrubHouse Cleaning",
    description:
      "Residential, commercial & eco-friendly cleaning packages. Transparent pricing, no hidden fees.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ])}
      />
      <JsonLd
        data={generateServiceSchema({
          name: "Residential Cleaning Services",
          description:
            "Professional house cleaning including regular maintenance, deep cleaning, move-in/move-out cleaning across the Greater Toronto Area.",
          url: "/services",
          priceRange: "$$",
        })}
      />
      <JsonLd
        data={generateServiceSchema({
          name: "Commercial Cleaning Services",
          description:
            "Professional office and commercial space cleaning. Flexible scheduling, reliable teams serving the GTA.",
          url: "/services",
          priceRange: "$$",
        })}
      />
      <ServicesPageClient />
    </>
  );
}
