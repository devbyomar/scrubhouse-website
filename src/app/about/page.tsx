import type { Metadata } from "next";
import { AboutPageClient } from "./client";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about ScrubHouse Cleaning — our mission, values, and commitment to delivering premium cleaning services across the Greater Toronto Area.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
