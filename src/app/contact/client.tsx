"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  Clock,
  MapPin,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/motion";
import { SITE_CONFIG, SERVICE_AREAS } from "@/lib/config";
import { contactFormSchema } from "@/lib/validations";

type ContactFormData = z.infer<typeof contactFormSchema>;

const CONTACT_METHODS = [
  {
    icon: Phone,
    title: "Call Us",
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`,
    desc: "Speak with us directly",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
    desc: "We reply within 24 hours",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: SITE_CONFIG.hours,
    href: null,
    desc: "Monday – Saturday",
  },
  {
    icon: MapPin,
    title: "Service Area",
    value: "Greater Toronto Area",
    href: "/service-areas",
    desc: `${SERVICE_AREAS.length} locations served`,
  },
];

export function ContactPageClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot check
    if (data.website) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setIsSubmitted(true);
      reset();
    } catch {
      // TODO: Show toast / error
      console.error("Contact form submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <section className="relative pt-32 pb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-blue-accent" />
          <div className="container-custom relative z-10 text-center py-20">
            <FadeIn>
              <div className="max-w-lg mx-auto">
                <div className="h-20 w-20 rounded-full bg-cyan/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-10 w-10 text-cyan" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-sm mb-4">Message Sent!</h1>
                <p className="text-white/80 mb-8">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="cyan" size="lg" asChild>
                    <Link href="/">Back to Home</Link>
                  </Button>
                  <Button variant="outline-light" size="lg" onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-blue-accent" />
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 right-20 w-96 h-96 bg-cyan rounded-full blur-[120px]" />
        </div>
        <div className="container-custom relative z-10">
          <FadeIn>
            <Badge variant="secondary" className="bg-cyan/20 text-cyan border-cyan/30 mb-4">
              <Mail className="h-3 w-3 mr-1" /> Get In Touch
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-sm mb-4">
              We&apos;d Love to <span className="text-cyan">Hear From You</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Questions, special requests, or ready to book? Reach out and our team will respond within 24 hours.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-white border-b border-border">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONTACT_METHODS.map((m) => (
              <StaggerItem key={m.title}>
                {m.href ? (
                  <Link href={m.href}>
                    <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <div className="h-12 w-12 rounded-xl bg-navy/5 flex items-center justify-center mx-auto mb-4">
                          <m.icon className="h-6 w-6 text-navy" />
                        </div>
                        <p className="text-xs text-text-muted mb-1">{m.title}</p>
                        <p className="font-semibold text-text-primary text-sm mb-1">{m.value}</p>
                        <p className="text-xs text-text-light">{m.desc}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <Card className="h-full border-0 shadow-md">
                    <CardContent className="p-6 text-center">
                      <div className="h-12 w-12 rounded-xl bg-navy/5 flex items-center justify-center mx-auto mb-4">
                        <m.icon className="h-6 w-6 text-navy" />
                      </div>
                      <p className="text-xs text-text-muted mb-1">{m.title}</p>
                      <p className="font-semibold text-text-primary text-sm mb-1">{m.value}</p>
                      <p className="text-xs text-text-light">{m.desc}</p>
                    </CardContent>
                  </Card>
                )}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <FadeIn>
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
                  Send Us a Message
                </h2>
                <p className="text-sm text-text-muted mb-8">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Honeypot */}
                  <input type="text" {...register("website")} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-text-primary mb-2">
                        First Name *
                      </label>
                      <Input
                        id="firstName"
                        placeholder="First name"
                        error={errors.firstName?.message}
                        {...register("firstName", { required: "First name is required" })}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-text-primary mb-2">
                        Last Name *
                      </label>
                      <Input
                        id="lastName"
                        placeholder="Last name"
                        error={errors.lastName?.message}
                        {...register("lastName", { required: "Last name is required" })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        error={errors.email?.message}
                        {...register("email", { required: "Email is required" })}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
                        Phone <span className="text-text-light">(optional)</span>
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(416) 555-1234"
                        {...register("phone")}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder="Tell us about your cleaning needs, ask a question, or share feedback..."
                      error={errors.message?.message}
                      {...register("message", { required: "Message is required", minLength: { value: 10, message: "Please provide more detail" } })}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      className="mt-1 h-4 w-4 rounded border-border accent-cyan"
                      {...register("consent", { required: "You must consent to be contacted" })}
                    />
                    <label htmlFor="consent" className="text-xs text-text-muted leading-relaxed">
                      I consent to ScrubHouse collecting and using my information to respond to my inquiry.
                      See our <Link href="/privacy" className="text-cyan underline">Privacy Policy</Link>.
                    </label>
                  </div>
                  {errors.consent && <p className="text-xs text-red-500">{errors.consent.message}</p>}

                  <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Send Message
                      </>
                    )}
                  </Button>
                </form>
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <ScaleIn>
                <div className="bg-gradient-to-br from-navy to-navy-dark rounded-3xl p-8 text-white sticky top-28">
                  <h3 className="text-xl font-bold text-white mb-6">Need a Quick Quote?</h3>
                  <p className="text-sm text-white/80 mb-6">
                    Skip the back-and-forth. Our instant quote calculator gives you an accurate estimate in minutes.
                  </p>
                  <Button variant="cyan" size="lg" asChild className="w-full mb-8">
                    <Link href="/quote" className="group">
                      Instant Quote Calculator
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>

                  <div className="border-t border-white/10 pt-6 space-y-4">
                    <h4 className="text-sm font-semibold text-white/80">Service Areas</h4>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_AREAS.map((a) => (
                        <span key={a.slug} className="text-xs bg-white/10 rounded-full px-3 py-1 text-white/80">
                          {a.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6 mt-6 space-y-3">
                    <h4 className="text-sm font-semibold text-white/80">Follow Us</h4>
                    <div className="flex gap-4">
                      {SITE_CONFIG.socialLinks.instagram && (
                        <a href={SITE_CONFIG.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-cyan text-sm transition-colors">
                          Instagram
                        </a>
                      )}
                      {SITE_CONFIG.socialLinks.facebook && (
                        <a href={SITE_CONFIG.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-cyan text-sm transition-colors">
                          Facebook
                        </a>
                      )}
                      {SITE_CONFIG.socialLinks.google && (
                        <a href={SITE_CONFIG.socialLinks.google} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-cyan text-sm transition-colors">
                          Google
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </ScaleIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
