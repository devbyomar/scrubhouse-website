import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy | ScrubHouse",
  description: "Learn how ScrubHouse collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-blue-accent" />
        <div className="container-custom relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-white/60 text-sm">Last updated: January 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto prose prose-sm prose-slate">
            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">1. Introduction</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              ScrubHouse (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">2. Information We Collect</h2>
            <p className="text-text-secondary leading-relaxed mb-2">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-4">
              <li><strong>Personal Information:</strong> Name, email address, phone number, mailing address, and other contact details you provide when filling out forms or contacting us.</li>
              <li><strong>Service Information:</strong> Details about your property, cleaning preferences, and service requests submitted through our quote calculator or booking forms.</li>
              <li><strong>Employment Information:</strong> Resume, work history, and responses to application questions submitted through our careers portal.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, pages visited, and referring URLs.</li>
              <li><strong>Cookies:</strong> Small data files stored on your device to improve your browsing experience and for analytics.</li>
            </ul>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-4">
              <li>To provide, maintain, and improve our cleaning services</li>
              <li>To respond to inquiries and communicate about bookings</li>
              <li>To process and manage service quotes and scheduling</li>
              <li>To evaluate employment applications</li>
              <li>To send promotional communications (only with your consent)</li>
              <li>To improve our website functionality and user experience</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">4. Information Sharing</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-4">
              <li><strong>Service Providers:</strong> Trusted partners who help us operate our business (e.g., scheduling, payment processing)</li>
              <li><strong>Legal Requirements:</strong> When required by law, legal process, or governmental request</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">5. Data Security</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">6. Data Retention</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Service-related data is retained for the duration of our business relationship plus any legally required period.
            </p>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">7. Your Rights</h2>
            <p className="text-text-secondary leading-relaxed mb-2">Under applicable privacy laws, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to or restrict processing of your information</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mb-4">
              To exercise any of these rights, please contact us at{" "}
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-cyan hover:underline">{SITE_CONFIG.email}</a>.
            </p>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">8. Cookies</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Our website may use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences. Disabling cookies may affect certain features of our website.
            </p>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">9. Third-Party Links</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
            </p>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">10. Children&apos;s Privacy</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
            </p>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">11. Changes to This Policy</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We may update this Privacy Policy periodically. Changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. Continued use of our website after changes constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">12. Contact Us</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none space-y-1 text-text-secondary mb-8">
              <li><strong>Email:</strong> <a href={`mailto:${SITE_CONFIG.email}`} className="text-cyan hover:underline">{SITE_CONFIG.email}</a></li>
              <li><strong>Phone:</strong> <a href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`} className="text-cyan hover:underline">{SITE_CONFIG.phone}</a></li>
            </ul>

            <div className="border-t border-border pt-6 mt-8">
              <Link href="/" className="text-sm text-cyan hover:underline">← Back to Home</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
