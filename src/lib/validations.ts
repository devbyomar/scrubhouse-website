import { z } from "zod";

/**
 * ============================================
 * SCRUBHOUSE - FORM VALIDATION SCHEMAS
 * ============================================
 * Compatible with Zod v4 API
 */

// ============================================
// CONTACT FORM
// ============================================

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .max(20, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
  // Honeypot field for anti-spam
  website: z.string().max(0, "").optional(),
  consent: z.literal(true, "You must consent to be contacted"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ============================================
// QUOTE FORM
// ============================================

export const quoteFormSchema = z.object({
  // Step 1: Property
  propertyType: z.enum(
    ["condo", "apartment", "house", "townhouse", "office", "commercial", "airbnb"],
    { error: "Please select a property type" }
  ),
  // Residential fields
  bedrooms: z.number().min(0).max(10),
  bathrooms: z.number().min(1).max(10),
  floors: z.number().min(1).max(5),
  // Commercial fields
  squareFootage: z.number().min(0).max(100000).optional(),
  offices: z.number().min(0).max(100).optional(),
  washrooms: z.number().min(0).max(20).optional(),
  commonAreas: z.array(z.string()).optional(),
  hasStairs: z.boolean().optional(),

  // Step 2: Service
  serviceType: z.enum(
    ["standard", "deep", "move-in-out", "recurring", "office", "post-renovation"],
    { error: "Please select a service type" }
  ),
  packageTier: z.enum(["silver", "gold", "platinum"], {
    error: "Please select a package",
  }),
  frequency: z.enum(["one-time", "weekly", "bi-weekly", "monthly"], {
    error: "Please select a frequency",
  }),

  // Step 3: Details
  condition: z.enum(["clean", "average", "messy", "very-dirty"], {
    error: "Please select the current condition",
  }),
  hasPets: z.boolean(),
  clientProvidesSupplies: z.boolean(),
  ecoFriendly: z.boolean(),
  addOns: z.array(z.string()),

  // Step 4: Location & Scheduling
  area: z.string().min(1, "Please select your area"),
  parking: z.enum(["easy", "moderate", "difficult"], {
    error: "Please select parking difficulty",
  }),
  urgency: z.enum(["none", "next-day", "same-day"]),
  preferredDate: z.string().optional(),
  postalCode: z
    .string()
    .min(3, "Please enter your postal code")
    .max(7, "Invalid postal code"),

  // Step 5: Contact
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .max(20, "Phone number is too long"),
  notes: z.string().max(2000, "Notes must be less than 2000 characters").optional(),
  // Honeypot
  company: z.string().max(0, "").optional(),
  consent: z.literal(true, "You must agree to be contacted regarding your quote"),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

// ============================================
// CAREER APPLICATION FORM
// ============================================

export const careerFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .max(20, "Phone number is too long"),
  city: z.string().min(2, "Please enter your city"),
  yearsExperience: z.enum(["0", "1-2", "3-5", "5+"], {
    error: "Please select your experience level",
  }),
  cleaningType: z.enum(["residential", "commercial", "both"], {
    error: "Please select cleaning type preference",
  }),
  hasVehicle: z.boolean(),
  legallyEligible: z.literal(true, "You must be legally eligible to work in Canada"),
  availability: z
    .array(z.string())
    .min(1, "Please select at least one availability option"),
  willingToTravel: z.boolean(),
  comfortWithPets: z.boolean(),
  canPerformPhysicalWork: z.literal(true, "This role requires physical capability"),
  referencesAvailable: z.boolean(),

  // Short answer questions
  whyWork: z
    .string()
    .min(20, "Please provide a more detailed answer (at least 20 characters)")
    .max(1000, "Response is too long"),
  whatMakesGreat: z
    .string()
    .min(20, "Please provide a more detailed answer (at least 20 characters)")
    .max(1000, "Response is too long"),
  difficultSituation: z
    .string()
    .min(20, "Please provide a more detailed answer (at least 20 characters)")
    .max(1000, "Response is too long"),
  attentionToDetail: z
    .string()
    .min(20, "Please provide a more detailed answer (at least 20 characters)")
    .max(1000, "Response is too long"),

  // Confirmations
  confirmAccuracy: z.literal(true, "Please confirm the accuracy of your information"),
  consentContact: z.literal(true, "Please consent to being contacted about your application"),

  // Honeypot
  website: z.string().max(0, "").optional(),
});

export type CareerFormData = z.infer<typeof careerFormSchema>;
