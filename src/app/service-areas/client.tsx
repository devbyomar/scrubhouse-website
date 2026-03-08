"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  MapPin,
  Phone,
  CheckCircle2,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/motion";
import { SITE_CONFIG, SERVICE_AREAS } from "@/lib/config";

const AREA_DETAILS: Record<string, { desc: string; services: string[] }> = {
  toronto: {
    desc: "Our home base. We serve all Toronto neighbourhoods from downtown condos to suburban homes.",
    services: ["Residential Cleaning", "Condo & Apartment Cleaning", "Commercial Office Cleaning", "Airbnb & Short-Term Rental"],
  },
  mississauga: {
    desc: "Full coverage across Mississauga including Square One, Port Credit, Streetsville, and surrounding areas.",
    services: ["Residential Cleaning", "Deep Cleaning", "Move-In/Move-Out", "Commercial Cleaning"],
  },
  brampton: {
    desc: "Serving the entire city of Brampton with flexible scheduling and reliable service.",
    services: ["Residential Cleaning", "Deep Cleaning", "Post-Construction", "Regular Maintenance"],
  },
  oakville: {
    desc: "Premium cleaning services tailored for Oakville's beautiful homes and businesses.",
    services: ["Residential Cleaning", "Deep Cleaning", "Eco-Friendly Cleaning", "Commercial Cleaning"],
  },
  vaughan: {
    desc: "Full service coverage across Vaughan including Woodbridge, Maple, and Thornhill areas.",
    services: ["Residential Cleaning", "Deep Cleaning", "Move-In/Move-Out", "Commercial Cleaning"],
  },
  etobicoke: {
    desc: "Covering all Etobicoke neighbourhoods with consistent, high-quality cleaning.",
    services: ["Residential Cleaning", "Condo Cleaning", "Deep Cleaning", "Regular Maintenance"],
  },
  markham: {
    desc: "Professional cleaning services for homes and businesses throughout Markham.",
    services: ["Residential Cleaning", "Deep Cleaning", "Commercial Cleaning", "Post-Renovation"],
  },
  "richmond-hill": {
    desc: "Reliable cleaning services across Richmond Hill with evening and weekend availability.",
    services: ["Residential Cleaning", "Deep Cleaning", "Eco-Friendly Cleaning", "Move-In/Move-Out"],
  },
  milton: {
    desc: "Expanding service to meet Milton's growing community with flexible cleaning options.",
    services: ["Residential Cleaning", "Deep Cleaning", "Regular Maintenance", "Post-Construction"],
  },
};

export function ServiceAreasPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-blue-accent" />
        <div className="absolute inset-0 opacity-15">
          <div className="absolute bottom-0 left-20 w-96 h-96 bg-cyan rounded-full blur-[120px]" />
        </div>
        <div className="container-custom relative z-10">
          <FadeIn>
            <Badge variant="secondary" className="bg-cyan/20 text-cyan border-cyan/30 mb-4">
              <MapPin className="h-3 w-3 mr-1" /> Where We Serve
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-sm mb-4">
              Service Areas Across the <span className="text-cyan">GTA</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              ScrubHouse proudly serves homeowners and businesses across the Greater Toronto Area. Find your area below.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Areas Map Overview */}
      <section className="py-12 bg-white border-b border-border">
        <div className="container-custom">
          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {SERVICE_AREAS.map((area) => (
                <a
                  key={area.slug}
                  href={`#${area.slug}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 hover:bg-cyan/10 text-text-primary hover:text-cyan transition-all text-sm font-medium"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  {area.name}
                  {area.primary && (
                    <span className="text-[10px] bg-cyan/20 text-cyan px-1.5 py-0.5 rounded-full">Primary</span>
                  )}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Area Details */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            badge="Our Locations"
            title="Premium Cleaning, Wherever You Are"
            description="We provide the same high standard of service across all our GTA locations."
          />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {SERVICE_AREAS.map((area) => {
              const details = AREA_DETAILS[area.slug];
              return (
                <StaggerItem key={area.slug}>
                  <Card
                    id={area.slug}
                    className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 scroll-mt-28 group"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-12 w-12 rounded-xl bg-navy/5 flex items-center justify-center group-hover:bg-cyan/10 transition-colors">
                          <MapPin className="h-6 w-6 text-navy group-hover:text-cyan transition-colors" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-text-primary">{area.name}</h3>
                          {area.primary && (
                            <Badge variant="success" className="text-[10px]">Primary Zone</Badge>
                          )}
                        </div>
                      </div>
                      {details && (
                        <>
                          <p className="text-sm text-text-secondary mb-4 leading-relaxed">{details.desc}</p>
                          <div className="space-y-2">
                            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Services Available</p>
                            {details.services.map((s) => (
                              <div key={s} className="flex items-center gap-2">
                                <CheckCircle2 className="h-3.5 w-3.5 text-cyan shrink-0" />
                                <span className="text-xs text-text-secondary">{s}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Not Listed */}
      <section className="py-16 bg-surface border-y border-border">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                Don&apos;t See Your Area?
              </h2>
              <p className="text-text-secondary mb-6">
                We&apos;re always expanding our service coverage across the GTA. If your area isn&apos;t listed, reach out — we may still be able to help. Travel fees may apply for locations outside our primary service zones.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg" asChild>
                  <Link href="/contact" className="group">
                    <Phone className="h-4 w-4" /> Contact Us
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/quote">
                    <ArrowRight className="h-4 w-4" /> Get a Quote
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <SectionHeading
                badge="Why ScrubHouse"
                title="The Same Quality, Everywhere We Go"
                description="No matter which GTA location you're in, you'll experience the same premium ScrubHouse standard."
                align="left"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {[
                  "Vetted, insured professionals",
                  "Consistent quality checklists",
                  "Eco-friendly product options",
                  "Flexible day & evening slots",
                  "100% satisfaction guarantee",
                  "24-hour response time",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cyan shrink-0 mt-0.5" />
                    <p className="text-sm text-text-secondary">{item}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
            <ScaleIn>
              <div className="bg-gradient-to-br from-navy to-navy-dark rounded-3xl p-10 text-center">
                <div className="h-20 w-20 rounded-full bg-cyan/20 flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-10 w-10 text-cyan" />
                </div>
                <h3 className="text-2xl font-bold text-white drop-shadow-sm mb-3">
                  {SERVICE_AREAS.length} Locations Served
                </h3>
                <p className="text-white/80 text-sm mb-6">
                  Across the Greater Toronto Area with growing coverage
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/10 rounded-xl p-4">
                    <Clock className="h-6 w-6 text-cyan mx-auto mb-2" />
                    <p className="text-xs text-white/60">Same-Day Available</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <Star className="h-6 w-6 text-cyan mx-auto mb-2" />
                    <p className="text-xs text-white/60">5.0★ Everywhere</p>
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-blue-accent" />
        <div className="container-custom relative z-10 py-20 text-center">
          <FadeIn>
            <Sparkles className="h-10 w-10 text-cyan mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-sm mb-4">
              Ready for a Spotless Space?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Get an instant quote for your GTA home or office in just a few clicks.
            </p>
            <Button variant="cyan" size="xl" asChild>
              <Link href="/quote" className="group">
                Get Instant Quote
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
