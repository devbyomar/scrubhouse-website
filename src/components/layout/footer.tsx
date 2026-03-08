import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS, SERVICE_AREAS } from "@/lib/config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      {/* Main Footer */}
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/logo-icon.jpg"
                alt="ScrubHouse"
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight leading-none text-white">
                  SCRUB<span className="text-cyan">HOUSE</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] leading-none text-white/50">
                  Cleaning
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Premium professional cleaning services for homes and businesses across
              the Greater Toronto Area. Experience the ScrubHouse difference.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/[^0-9]/g, "")}`}
                className="flex items-center gap-3 text-sm text-white/80 hover:text-cyan transition-colors"
              >
                <Phone className="h-4 w-4 text-cyan" />
                {SITE_CONFIG.phone}
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-3 text-sm text-white/80 hover:text-cyan transition-colors"
              >
                <Mail className="h-4 w-4 text-cyan" />
                {SITE_CONFIG.email}
              </a>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <Clock className="h-4 w-4 text-cyan" />
                {SITE_CONFIG.hoursShort}
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <MapPin className="h-4 w-4 text-cyan" />
                {SITE_CONFIG.address}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-cyan transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">
              Service Areas
            </h3>
            <ul className="space-y-3">
              {SERVICE_AREAS.slice(0, 8).map((area) => (
                <li key={area.slug}>
                  <Link
                    href="/service-areas"
                    className="text-sm text-white/60 hover:text-cyan transition-colors"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & CTA */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">
              Get Started
            </h3>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              Ready for a spotless space? Get your free instant quote in under
              2 minutes.
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 bg-cyan text-navy-dark font-bold px-6 py-3 rounded-lg hover:bg-cyan-light transition-colors text-sm"
            >
              Get Instant Quote
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-xs text-white/40 hover:text-cyan transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-xs text-white/40 hover:text-cyan transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {currentYear} {SITE_CONFIG.fullName}. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Serving the Greater Toronto Area with pride.
          </p>
        </div>
      </div>
    </footer>
  );
}
