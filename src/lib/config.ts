/**
 * ============================================
 * SCRUBHOUSE - SITE CONFIGURATION
 * ============================================
 *
 * Central configuration for site-wide content,
 * contact information, and business details.
 */

export const SITE_CONFIG = {
  name: "ScrubHouse",
  tagline: "Cleaning",
  fullName: "ScrubHouse Cleaning",
  description:
    "Premium professional cleaning services for homes and businesses across the Greater Toronto Area. Experience spotless spaces with ScrubHouse.",
  url: "https://scrubhouse.ca",
  phone: "(416) 903-9982",
  email: "scrubhousecc@gmail.com",
  address: "Greater Toronto Area, Ontario, Canada",
  hours: "Monday – Friday, 10:00 AM – 9:00 PM",
  hoursShort: "Mon–Fri, 10AM–9PM",
  founded: "2023",
  socialLinks: {
    // TODO: Add real social media links when available
    instagram: "https://instagram.com/scrubhousecleaning",
    facebook: "https://facebook.com/scrubhousecleaning",
    google: "https://g.page/scrubhouse",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/quote", label: "Instant Quote" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

export const SERVICE_AREAS = [
  { name: "Mississauga", slug: "mississauga", primary: true },
  { name: "Toronto", slug: "toronto", primary: true },
  { name: "Brampton", slug: "brampton", primary: true },
  { name: "Oakville", slug: "oakville", primary: true },
  { name: "Milton", slug: "milton", primary: false },
  { name: "Etobicoke", slug: "etobicoke", primary: true },
  { name: "Vaughan", slug: "vaughan", primary: false },
  { name: "Richmond Hill", slug: "richmond-hill", primary: false },
  { name: "Markham", slug: "markham", primary: false },
] as const;

export const TRUST_STATS = [
  { value: "100+", label: "Homes Cleaned" },
  { value: "5.0★", label: "Average Rating" },
  { value: "100%", label: "Satisfaction Guarantee" },
  { value: "24hr", label: "Response Time" },
] as const;
