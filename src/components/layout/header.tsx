"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="ScrubHouse Home">
            <Image
              src="/logo-full.jpg"
              alt="ScrubHouse Cleaning"
              width={180}
              height={60}
              className="h-10 w-auto transition-transform group-hover:scale-[1.02]"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-cyan bg-cyan/10"
                    : scrolled
                      ? "text-text-secondary hover:text-navy hover:bg-navy/5"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/[^0-9]/g, "")}`}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                scrolled
                  ? "text-text-secondary hover:text-navy"
                  : "text-white/90 hover:text-white"
              )}
            >
              <Phone className="h-4 w-4" />
              {SITE_CONFIG.phone}
            </a>
            <Button variant="cyan" size="default" asChild>
              <Link href="/quote">Get Instant Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              scrolled ? "hover:bg-navy/5" : "hover:bg-white/10"
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className={cn("h-6 w-6", scrolled ? "text-navy" : "text-white")} />
            ) : (
              <Menu className={cn("h-6 w-6", scrolled ? "text-navy" : "text-white")} />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 mt-2 border-t border-border">
                <div className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "px-4 py-3 rounded-lg text-base font-medium transition-colors",
                        pathname === link.href
                          ? "text-cyan bg-cyan/10"
                          : "text-text-secondary hover:text-navy hover:bg-navy/5"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
                  <a
                    href={`tel:${SITE_CONFIG.phone.replace(/[^0-9]/g, "")}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary"
                  >
                    <Phone className="h-4 w-4" />
                    {SITE_CONFIG.phone}
                  </a>
                  <div className="px-4">
                    <Button variant="cyan" size="lg" className="w-full" asChild>
                      <Link href="/quote">Get Instant Quote</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
