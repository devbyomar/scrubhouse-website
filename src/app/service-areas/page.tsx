import type { Metadata } from "next";
import { ServiceAreasPageClient } from "./client";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "ScrubHouse Cleaning serves Mississauga, Toronto, Brampton, Oakville, Milton, Etobicoke, Vaughan, and surrounding GTA communities.",
};

export default function ServiceAreasPage() {
  return <ServiceAreasPageClient />;
}
