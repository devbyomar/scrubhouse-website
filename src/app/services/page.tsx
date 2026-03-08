import type { Metadata } from "next";
import { ServicesPageClient } from "./client";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore ScrubHouse's professional cleaning services: residential cleaning, commercial cleaning, and eco-friendly options. Silver, Gold, and Platinum packages available.",
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
