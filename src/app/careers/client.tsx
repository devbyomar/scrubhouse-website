"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Upload,
  CheckCircle2,
  ArrowRight,
  Users,
  Clock,
  Heart,
  Award,
  Car,
  PawPrint,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { isValidResumeFile, sanitizeFilename } from "@/lib/utils";

const PERKS = [
  { icon: Clock, title: "Flexible Hours", desc: "Work schedules that fit your lifestyle" },
  { icon: Heart, title: "Supportive Team", desc: "Join a team that values your contribution" },
  { icon: Award, title: "Competitive Pay", desc: "Fair compensation and growth opportunities" },
  { icon: Users, title: "Professional Growth", desc: "Training and development support" },
];

export function CareersPageClient() {
  const [step, setStep] = useState<"info" | "form" | "success">("info");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const [formData, setFormData] = useState<Record<string, unknown>>({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    yearsExperience: "",
    cleaningType: "",
    hasVehicle: false,
    legallyEligible: false,
    availability: [] as string[],
    willingToTravel: false,
    comfortWithPets: false,
    canPerformPhysicalWork: false,
    referencesAvailable: false,
    whyWork: "",
    whatMakesGreat: "",
    difficultSituation: "",
    attentionToDetail: "",
    confirmAccuracy: false,
    consentContact: false,
  });

  const updateField = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleAvailability = (val: string) => {
    setFormData((prev) => {
      const current = (prev.availability as string[]) || [];
      return {
        ...prev,
        availability: current.includes(val)
          ? current.filter((a) => a !== val)
          : [...current, val],
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!isValidResumeFile(file)) {
      setResumeError("Please upload a PDF, DOC, or DOCX file under 5MB.");
      setResumeFile(null);
      return;
    }
    setResumeError("");
    setResumeFile(file);
  };

  const handleSubmit = async () => {
    // TODO: Send to API route with FormData for file upload
    const sanitized = resumeFile ? sanitizeFilename(resumeFile.name) : "none";
    console.log("Career application:", { ...formData, resumeFileName: sanitized });
    setStep("success");
  };

  if (step === "success") {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container-custom max-w-2xl mx-auto text-center">
          <FadeIn>
            <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Application Submitted!</h1>
            <p className="text-lg text-text-muted mb-8">
              Thank you for your interest in joining ScrubHouse. Our hiring team will review your application and reach out if your profile is a match. We appreciate your time.
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </FadeIn>
        </div>
      </div>
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
              <Briefcase className="h-3 w-3 mr-1" /> We&apos;re Hiring
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-sm mb-4">
              Join the <span className="text-cyan">ScrubHouse</span> Team
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mb-8">
              We&apos;re looking for reliable, detail-oriented cleaning professionals who take pride in their work. If you&apos;re ready to join a growing team that values quality and respect, we want to hear from you.
            </p>
            {step === "info" && (
              <Button variant="cyan" size="xl" onClick={() => setStep("form")}>
                Apply Now <ArrowRight className="h-5 w-5" />
              </Button>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Perks */}
      {step === "info" && (
        <section className="section-padding">
          <div className="container-custom">
            <SectionHeading badge="Why Join Us" title="What We Offer" description="At ScrubHouse, we believe great work deserves great support." />
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PERKS.map((perk) => (
                <StaggerItem key={perk.title}>
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-8 text-center">
                      <div className="h-12 w-12 rounded-xl bg-cyan/10 flex items-center justify-center mx-auto mb-4">
                        <perk.icon className="h-6 w-6 text-cyan" />
                      </div>
                      <h3 className="font-bold text-text-primary mb-2">{perk.title}</h3>
                      <p className="text-sm text-text-muted">{perk.desc}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeIn delay={0.4}>
              <div className="text-center mt-16">
                <SectionHeading badge="What We Look For" title="Ideal Candidates" description="We value reliability, attention to detail, professionalism, and a genuine commitment to customer service." />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {[
                    "Reliable and punctual",
                    "Detail-oriented",
                    "Professional attitude",
                    "Strong communication",
                    "Physically capable",
                    "Comfortable with pets",
                    "Team player",
                    "Self-motivated",
                    "Experience preferred",
                  ].map((trait) => (
                    <div key={trait} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-border">
                      <CheckCircle2 className="h-4 w-4 text-cyan flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{trait}</span>
                    </div>
                  ))}
                </div>

                <Button variant="cyan" size="xl" className="mt-12" onClick={() => setStep("form")}>
                  Start Your Application <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Application Form */}
      {step === "form" && (
        <section className="section-padding">
          <div className="container-custom max-w-3xl mx-auto">
            <FadeIn>
              <SectionHeading align="left" title="Application Form" description="Fill out the form below to apply. All fields marked are required." />
            </FadeIn>

            <div className="space-y-8">
              {/* Personal Info */}
              <FadeIn delay={0.1}>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-bold text-text-primary">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1.5">Full Name *</label>
                        <Input placeholder="Your full name" value={formData.fullName as string} onChange={(e) => updateField("fullName", e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1.5">Email *</label>
                        <Input type="email" placeholder="you@example.com" value={formData.email as string} onChange={(e) => updateField("email", e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1.5">Phone *</label>
                        <Input type="tel" placeholder="(416) 000-0000" value={formData.phone as string} onChange={(e) => updateField("phone", e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1.5">City *</label>
                        <Input placeholder="Your city" value={formData.city as string} onChange={(e) => updateField("city", e.target.value)} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Experience */}
              <FadeIn delay={0.15}>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-bold text-text-primary">Experience & Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1.5">Years of Experience *</label>
                        <div className="grid grid-cols-4 gap-2">
                          {["0", "1-2", "3-5", "5+"].map((exp) => (
                            <button key={exp} onClick={() => updateField("yearsExperience", exp)} className={`p-2 rounded-lg border-2 text-sm font-medium transition-all ${formData.yearsExperience === exp ? "border-cyan bg-cyan/5 text-cyan" : "border-border text-text-secondary hover:border-navy/20"}`}>
                              {exp} {exp === "0" ? "yr" : "yrs"}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1.5">Cleaning Type Preference *</label>
                        <div className="grid grid-cols-3 gap-2">
                          {["residential", "commercial", "both"].map((ct) => (
                            <button key={ct} onClick={() => updateField("cleaningType", ct)} className={`p-2 rounded-lg border-2 text-sm font-medium capitalize transition-all ${formData.cleaningType === ct ? "border-cyan bg-cyan/5 text-cyan" : "border-border text-text-secondary hover:border-navy/20"}`}>
                              {ct}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Availability *</label>
                      <div className="flex flex-wrap gap-2">
                        {["Weekday Mornings", "Weekday Afternoons", "Evenings", "Weekends"].map((av) => (
                          <button key={av} onClick={() => toggleAvailability(av)} className={`px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${(formData.availability as string[]).includes(av) ? "border-cyan bg-cyan/5 text-cyan" : "border-border text-text-secondary hover:border-navy/20"}`}>
                            {av}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { key: "hasVehicle", label: "Access to a vehicle", icon: Car },
                        { key: "willingToTravel", label: "Willing to travel within service areas", icon: Car },
                        { key: "comfortWithPets", label: "Comfortable working around pets", icon: PawPrint },
                        { key: "referencesAvailable", label: "References available", icon: Users },
                      ].map((item) => (
                        <button key={item.key} onClick={() => updateField(item.key, !formData[item.key])} className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all text-sm ${formData[item.key] ? "border-cyan bg-cyan/5" : "border-border hover:border-navy/20"}`}>
                          <div className={`h-4 w-4 rounded border-2 flex items-center justify-center ${formData[item.key] ? "bg-cyan border-cyan" : "border-border"}`}>
                            {formData[item.key] ? <CheckCircle2 className="h-3 w-3 text-white" /> : null}
                          </div>
                          <item.icon className="h-4 w-4 text-text-muted" />
                          <span className="text-text-secondary">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Resume Upload */}
              <FadeIn delay={0.2}>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-bold text-text-primary">Resume Upload</h3>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-cyan/40 transition-colors">
                      <Upload className="h-8 w-8 text-text-muted mx-auto mb-3" />
                      <p className="text-sm text-text-secondary mb-1">
                        {resumeFile ? resumeFile.name : "Upload your resume"}
                      </p>
                      <p className="text-xs text-text-muted mb-4">PDF, DOC, or DOCX · Max 5MB</p>
                      <label className="inline-flex items-center gap-2 bg-navy/5 hover:bg-navy/10 text-navy text-sm font-medium px-4 py-2 rounded-lg cursor-pointer transition-colors">
                        <Upload className="h-4 w-4" />
                        Choose File
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                      </label>
                      {resumeError && <p className="text-xs text-error mt-2">{resumeError}</p>}
                    </div>
                    <p className="text-xs text-text-muted">
                      Your resume will be stored securely and used only for the purpose of evaluating your application. It will not be shared with third parties.
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Short Answer Questions */}
              <FadeIn delay={0.25}>
                <Card>
                  <CardContent className="p-6 space-y-5">
                    <h3 className="font-bold text-text-primary">Tell Us About Yourself</h3>
                    {[
                      { key: "whyWork", label: "Why do you want to work with ScrubHouse?" },
                      { key: "whatMakesGreat", label: "What makes you a great cleaner?" },
                      { key: "difficultSituation", label: "Describe a time you handled a difficult customer or challenging cleaning situation." },
                      { key: "attentionToDetail", label: "What does attention to detail mean to you in a cleaning role?" },
                    ].map((q) => (
                      <div key={q.key}>
                        <label className="block text-sm font-medium text-text-secondary mb-1.5">{q.label} *</label>
                        <Textarea placeholder="Your answer..." value={formData[q.key] as string} onChange={(e) => updateField(q.key, e.target.value)} className="min-h-[100px]" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Confirmations */}
              <FadeIn delay={0.3}>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-bold text-text-primary">Confirmations</h3>
                    {[
                      { key: "legallyEligible", label: "I am legally eligible to work in Canada *" },
                      { key: "canPerformPhysicalWork", label: "I am able to perform physically demanding work *" },
                      { key: "confirmAccuracy", label: "I confirm the information provided is accurate *" },
                      { key: "consentContact", label: "I consent to being contacted regarding my application *" },
                    ].map((item) => (
                      <button key={item.key} onClick={() => updateField(item.key, !formData[item.key])} className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all w-full ${formData[item.key] ? "border-cyan bg-cyan/5" : "border-border hover:border-navy/20"}`}>
                        <div className={`h-5 w-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${formData[item.key] ? "bg-cyan border-cyan" : "border-border"}`}>
                          {formData[item.key] ? <CheckCircle2 className="h-3.5 w-3.5 text-white" /> : null}
                        </div>
                        <span className="text-sm text-text-secondary">{item.label}</span>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Honeypot */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              {/* Submit */}
              <FadeIn delay={0.35}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="ghost" onClick={() => setStep("info")} className="sm:flex-1">
                    Back
                  </Button>
                  <Button variant="cyan" size="lg" onClick={handleSubmit} className="sm:flex-2">
                    Submit Application <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-text-muted mt-4 text-center">
                  By submitting this application, you agree to our{" "}
                  <Link href="/privacy" className="text-navy hover:text-cyan underline">Privacy Policy</Link>.
                  Your information will be used solely for recruitment purposes.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
