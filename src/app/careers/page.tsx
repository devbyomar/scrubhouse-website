import type { Metadata } from "next";
import { CareersPageClient } from "./client";
import { JsonLd, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Careers | Join the ScrubHouse Team",
  description:
    "Join the ScrubHouse team. We're hiring reliable, detail-oriented cleaning professionals across the Greater Toronto Area. Competitive pay, flexible hours. Apply today.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers at ScrubHouse Cleaning",
    description:
      "We're hiring! Join the GTA's fastest-growing cleaning team. Competitive pay & flexible schedules.",
    url: "/careers",
  },
};

export default function CareersPage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Careers", href: "/careers" },
        ])}
      />
      <CareersPageClient />
    </>
  );
}
