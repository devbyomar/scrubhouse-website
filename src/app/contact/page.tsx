import type { Metadata } from "next";
import { ContactPageClient } from "./client";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with ScrubHouse Cleaning. Call, email, or fill out our contact form. We serve the Greater Toronto Area.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
