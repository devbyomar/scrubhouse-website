import type { Metadata } from "next";
import { QuotePageClient } from "./client";
import { JsonLd, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free Instant Cleaning Quote | Get Pricing in 2 Minutes",
  description:
    "Get your free instant cleaning quote in under 2 minutes. Transparent pricing for residential, commercial, and eco-friendly cleaning services across the GTA. No hidden fees.",
  alternates: {
    canonical: "/quote",
  },
  openGraph: {
    title: "Free Instant Cleaning Quote | ScrubHouse Cleaning",
    description:
      "Transparent pricing in under 2 minutes. Residential, commercial & eco-friendly options.",
    url: "/quote",
  },
};

export default function QuotePage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Instant Quote", href: "/quote" },
        ])}
      />
      <QuotePageClient />
    </>
  );
}
