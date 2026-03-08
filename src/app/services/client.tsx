"use client";

import Link from "next/link";
import {
  Home,
  Building2,
  Leaf,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/motion";
import {
  RESIDENTIAL_PACKAGES,
  COMMERCIAL_PACKAGES,
  type PackageDefinition,
} from "@/lib/pricing-engine";

function PageHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-blue-accent" />
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan rounded-full blur-[120px]" />
      </div>
      <div className="container-custom relative z-10">
        <FadeIn>
          <Badge variant="secondary" className="bg-cyan/20 text-cyan border-cyan/30 mb-4">
            <Sparkles className="h-3 w-3 mr-1" />
            Our Services
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-sm mb-4">
            Cleaning Solutions<br />
            <span className="text-cyan">Tailored to You</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            From daily home maintenance to comprehensive commercial cleaning programs — we have the perfect solution for every space.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function PackageCards({ packages, type }: { packages: PackageDefinition[]; type: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {packages.map((pkg, i) => (
        <FadeIn key={pkg.id} delay={i * 0.1}>
          <Card className={`h-full relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${pkg.recommended ? "border-2 border-cyan shadow-xl ring-1 ring-cyan/20" : "border shadow-lg"}`}>
            {pkg.recommended && (
              <div className="absolute top-0 left-0 right-0 bg-cyan text-navy-dark text-xs font-bold text-center py-1.5 uppercase tracking-wider">
                Most Popular
              </div>
            )}
            <CardContent className={`p-8 ${pkg.recommended ? "pt-12" : ""}`}>
              <h3 className="text-2xl font-bold text-text-primary mb-1">{pkg.name}</h3>
              <p className="text-sm text-text-muted mb-6">{pkg.description}</p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                    <CheckCircle2 className="h-4 w-4 text-cyan flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={pkg.recommended ? "cyan" : "outline"} className="w-full" asChild>
                <Link href="/quote">Get a Quote</Link>
              </Button>
            </CardContent>
          </Card>
        </FadeIn>
      ))}
    </div>
  );
}

function ResidentialSection() {
  return (
    <section id="residential" className="section-padding">
      <div className="container-custom">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-14 w-14 rounded-2xl bg-navy/5 flex items-center justify-center">
            <Home className="h-7 w-7 text-navy" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-text-primary">Residential Cleaning</h2>
            <p className="text-text-muted">Professional cleaning services for every home</p>
          </div>
        </div>
        <p className="text-text-secondary leading-relaxed max-w-3xl mb-10">
          Your home should be a sanctuary. Our residential cleaning services are designed to give you back your time while ensuring every surface sparkles. Choose from our Silver, Gold, or Platinum packages — or let us create a custom plan that fits your needs perfectly.
        </p>
        <PackageCards packages={RESIDENTIAL_PACKAGES} type="residential" />
      </div>
    </section>
  );
}

function CommercialSection() {
  return (
    <section id="commercial" className="section-padding bg-surface-raised">
      <div className="container-custom">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-14 w-14 rounded-2xl bg-navy/5 flex items-center justify-center">
            <Building2 className="h-7 w-7 text-navy" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-text-primary">Commercial Cleaning</h2>
            <p className="text-text-muted">Reliable cleaning for professional workspaces</p>
          </div>
        </div>
        <p className="text-text-secondary leading-relaxed max-w-3xl mb-10">
          A clean workplace isn&apos;t just about appearances — it boosts productivity, reduces sick days, and makes a lasting impression on clients and visitors. Our commercial cleaning solutions are tailored to businesses of all sizes across the GTA.
        </p>
        <PackageCards packages={COMMERCIAL_PACKAGES} type="commercial" />
      </div>
    </section>
  );
}

function EcoSection() {
  return (
    <section id="eco-friendly" className="section-padding">
      <div className="container-custom">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-14 w-14 rounded-2xl bg-green-50 flex items-center justify-center">
            <Leaf className="h-7 w-7 text-green-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-text-primary">Eco-Friendly Cleaning</h2>
            <p className="text-text-muted">Sustainable cleaning without compromise</p>
          </div>
        </div>
        <p className="text-text-secondary leading-relaxed max-w-3xl mb-10">
          Choose sustainability without sacrificing quality. Our eco-friendly cleaning option upgrades any Silver, Gold, or Platinum package with 100% non-toxic, biodegradable products that are safe for children, pets, and the environment. Same meticulous clean — greener footprint.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Non-Toxic Products", desc: "All cleaning agents are plant-based, biodegradable, and free from harsh chemicals." },
            { title: "Safe for Everyone", desc: "Perfect for families with young children, pets, or anyone with chemical sensitivities." },
            { title: "Same Premium Quality", desc: "Eco-friendly doesn't mean less effective. Our green products deliver the same spotless results." },
          ].map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.1}>
              <Card className="h-full border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center mb-4">
                    <Leaf className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-bold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function AddOnsSection() {
  const addOns = [
    "Inside Fridge Cleaning",
    "Inside Oven Cleaning",
    "Interior Window Cleaning",
    "Baseboard Detailing",
    "Laundry (Wash, Dry & Fold)",
    "Dishes",
    "Extra Bathroom",
    "Basement Cleaning",
    "Post-Renovation Heavy Duty",
    "Light Organization",
    "Inside Cabinets",
  ];

  return (
    <section className="section-padding bg-surface-raised">
      <div className="container-custom">
        <SectionHeading
          badge="Customize"
          title="Add-Ons & Extras"
          description="Personalize any package with additional services. Mix and match to create the perfect cleaning experience."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {addOns.map((addon, i) => (
            <FadeIn key={addon} delay={i * 0.05}>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-border hover:border-cyan/30 hover:shadow-sm transition-all">
                <CheckCircle2 className="h-5 w-5 text-cyan flex-shrink-0" />
                <span className="text-sm font-medium text-text-secondary">{addon}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function FrequencySection() {
  const frequencies = [
    { label: "One-Time", desc: "Perfect for spring cleaning, move-in/out, or a deep refresh.", icon: Sparkles },
    { label: "Weekly", desc: "Maintain a consistently spotless space with our most popular frequency.", icon: Clock, popular: true },
    { label: "Bi-Weekly", desc: "A great balance between freshness and budget for busy households.", icon: Clock },
    { label: "Monthly", desc: "Keep things tidy with a thorough monthly deep clean.", icon: Clock },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeading
          badge="Scheduling"
          title="Frequency Options"
          description="Choose the cleaning frequency that works best for your lifestyle. Recurring clients enjoy exclusive savings."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {frequencies.map((freq, i) => (
            <FadeIn key={freq.label} delay={i * 0.1}>
              <Card className={`h-full text-center ${freq.popular ? "border-2 border-cyan shadow-lg" : ""}`}>
                <CardContent className="p-6">
                  {freq.popular && (
                    <Badge variant="secondary" className="mb-3">Best Value</Badge>
                  )}
                  <freq.icon className="h-8 w-8 text-cyan mx-auto mb-3" />
                  <h3 className="font-bold text-text-primary mb-2">{freq.label}</h3>
                  <p className="text-xs text-text-muted">{freq.desc}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesFAQ() {
  const faqs = [
    { q: "Can I switch between packages?", a: "Absolutely! You can upgrade or change your package at any time. Just let us know before your next scheduled cleaning." },
    { q: "What's included in the eco-friendly upgrade?", a: "The eco-friendly upgrade replaces all standard cleaning products with non-toxic, biodegradable alternatives. Same thorough cleaning — gentler on the environment." },
    { q: "How long does a typical cleaning take?", a: "Duration depends on your property size and package. A standard clean for a 2-bedroom apartment typically takes 2-3 hours. Deep cleans and larger properties take longer." },
    { q: "Do I need to be home during the cleaning?", a: "Not at all. Many of our clients provide access instructions and we clean while they're out. Your home is fully insured during our visit." },
    { q: "Can I customize my cleaning checklist?", a: "Yes! While our packages cover specific tasks, we're happy to accommodate special requests or focus areas. Just let us know in the notes when booking." },
  ];

  return (
    <section className="section-padding bg-surface-raised">
      <div className="container-custom">
        <SectionHeading badge="FAQ" title="Service Questions" description="Common questions about our cleaning services and packages." />
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <details className="group bg-white rounded-xl border border-border shadow-sm hover:shadow-md transition-all">
                <summary className="flex items-center justify-between cursor-pointer p-6 text-left">
                  <span className="font-semibold text-text-primary pr-4">{faq.q}</span>
                  <ChevronRight className="h-5 w-5 text-text-muted flex-shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-sm text-text-muted leading-relaxed">{faq.a}</p>
                </div>
              </details>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-blue-accent" />
      <div className="container-custom relative z-10 py-20 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-sm mb-4">
            Ready for a Spotless Space?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Get your personalized quote in under 2 minutes. Choose your package, customize your add-ons, and let us handle the rest.
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
  );
}

export function ServicesPageClient() {
  return (
    <>
      <PageHero />
      <ResidentialSection />
      <CommercialSection />
      <EcoSection />
      <AddOnsSection />
      <FrequencySection />
      <ServicesFAQ />
      <ServicesCTA />
    </>
  );
}
