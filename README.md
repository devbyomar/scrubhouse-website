# ScrubHouse — Professional Cleaning Website

A premium, modern, high-converting website for **ScrubHouse**, a professional cleaning company serving the Greater Toronto Area.

Built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, and a centralized pricing engine.

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 15](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://motion.dev/) | Scroll-triggered animations |
| [React Hook Form](https://react-hook-form.com/) | Form management |
| [Zod v4](https://zod.dev/) | Schema validation |
| [Radix UI](https://www.radix-ui.com/) | Accessible UI primitives |
| [Lucide React](https://lucide.dev/) | Icon system |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Homepage (9 sections)
│   ├── layout.tsx                # Root layout with SEO metadata
│   ├── globals.css               # Design system & CSS variables
│   ├── services/                 # Services page
│   ├── quote/                    # Multi-step instant quote calculator
│   ├── careers/                  # Career application portal
│   ├── reviews/                  # Client reviews/testimonials
│   ├── about/                    # About / company story
│   ├── contact/                  # Contact form
│   ├── service-areas/            # GTA service areas
│   ├── privacy/                  # Privacy policy
│   ├── terms/                    # Terms of service
│   └── api/
│       ├── contact/route.ts      # Contact form API
│       ├── quote/route.ts        # Quote submission API
│       └── careers/route.ts      # Career application API
├── components/
│   ├── ui/                       # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── badge.tsx
│   │   ├── section-heading.tsx
│   │   └── motion.tsx
│   └── layout/
│       ├── header.tsx            # Sticky header with mobile menu
│       └── footer.tsx            # Footer with sitemap
└── lib/
    ├── config.ts                 # Site-wide configuration
    ├── pricing-engine.ts         # Centralized pricing calculator
    ├── validations.ts            # Zod form schemas
    └── utils.ts                  # Utility functions
```

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/devbyomar/scrubhouse-website.git
cd scrubhouse-website

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Configuration

### Business Constants (Pricing)

All pricing parameters are centralized in `src/lib/pricing-engine.ts`:

```typescript
// Base rates
BASE_HOURLY_RATE = 55         // What you charge per hour
CLEANER_HOURLY_PAY = 22       // What you pay per hour
EMPLOYER_BURDEN_PERCENT = 0.18 // CPP, EI, WSIB overhead

// Minimums
MINIMUM_BOOKING = 120          // Minimum charge per visit
TARGET_MARGIN = 0.35           // 35% target profit margin

// Discounts
FREQUENCY_DISCOUNTS = {
  "one-time": 0, "monthly": 5, "bi-weekly": 10, "weekly": 15
}
```

**To update pricing:** Simply edit the constants at the top of `pricing-engine.ts`. The entire quote calculator and all pricing displays will update automatically.

### Site Configuration

Edit `src/lib/config.ts` to update:
- Business name, phone, email
- Business hours
- Social media links
- Navigation links
- Service areas

### Design System

All brand colors, fonts, and utilities are defined in `src/app/globals.css` using CSS variables:

```css
--navy: #1B2E6E;      /* Primary brand color */
--cyan: #00C2FF;       /* Accent color */
--navy-dark: #0F1D4A;  /* Dark variant */
```

---

## 📧 Email Notifications

All three API routes send branded HTML emails via [Resend](https://resend.com):

| Route | Notification → Team | Confirmation → Customer |
|-------|---------------------|------------------------|
| `/api/contact` | ✅ New contact message | — |
| `/api/quote` | ✅ Quote details + breakdown | ✅ Personalised quote summary |
| `/api/careers` | ✅ Application + resume attached | ✅ "Application received" confirmation |

### Setup

1. Sign up at [resend.com](https://resend.com)
2. Add and verify your sending domain (e.g. `scrubhouse.ca`)
3. Create an API key
4. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_your_key_here
   RESEND_FROM_EMAIL="ScrubHouse <noreply@scrubhouse.ca>"
   NOTIFY_EMAIL=scrubhousecc@gmail.com
   ```

> **Note:** If `RESEND_API_KEY` is not set, emails are skipped gracefully — the forms still work and log submissions to the console.

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository at [vercel.com](https://vercel.com).

### Build

```bash
npm run build
npm start
```

---

## 📋 Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero, services overview, packages, reviews, FAQ |
| Services | `/services` | Residential, commercial, eco-friendly, add-ons |
| Instant Quote | `/quote` | 5-step interactive quote calculator |
| Service Areas | `/service-areas` | 9 GTA locations with details |
| Reviews | `/reviews` | Client testimonials and ratings |
| About | `/about` | Company story, values, commitment |
| Careers | `/careers` | Job info + full application form |
| Contact | `/contact` | Contact form + business info |
| Privacy | `/privacy` | Privacy policy |
| Terms | `/terms` | Terms of service |

---

## 🔒 Security Features

- **Honeypot fields** on all forms (anti-spam)
- **Server-side validation** with Zod on API routes
- **CSRF-safe** API design (JSON POST only)
- **Input sanitization** for file uploads
- **File type & size validation** for resume uploads

---

## 📱 Responsive Design

Fully responsive across:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

---

## 🧰 Development

```bash
# Development server
npm run dev

# Type checking
npx tsc --noEmit

# Build
npm run build

# Production server
npm start

# Lint
npm run lint
```

---

## 📄 License

Proprietary — © 2025 ScrubHouse. All rights reserved.
