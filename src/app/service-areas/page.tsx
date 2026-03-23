import type { Metadata } from "next";
import { ServiceAreasPageClient } from "./client";
import { JsonLd, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Service Areas | Cleaning Services Across the GTA",
  description:
    "ScrubHouse Cleaning serves Mississauga, Toronto, Brampton, Oakville, Milton, Etobicoke, Vaughan, Richmond Hill, Markham and surrounding GTA communities. Book today.",
  alternates: {
    canonical: "/service-areas",
  },
  openGraph: {
    title: "Service Areas | ScrubHouse Cleaning",
    description:
      "Professional cleaning services across Mississauga, Toronto, Brampton, Oakville & the entire GTA.",
    url: "/service-areas",
  },
};

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
        ])}
      />
      <ServiceAreasPageClient />
    </>
  );
}
