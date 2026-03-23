/**
 * ============================================
 * SCRUBHOUSE - QUOTE PRICING ENGINE
 * ============================================
 *
 * This is the centralized pricing configuration for the ScrubHouse
 * Instant Quote Engine. All business assumptions, rates, and multipliers
 * are defined here in one place.
 *
 * To adjust pricing:
 * 1. Modify the constants below
 * 2. The quote calculator will automatically reflect changes
 * 3. No UI code needs to change
 *
 * All monetary values are in CAD.
 */

// ============================================
// BASE RATES & LABOR
// ============================================

/** Base hourly rate charged to the customer (CAD/hour) */
export const BASE_HOURLY_RATE = 55;

/** Average cleaner hourly wage (CAD/hour) */
export const CLEANER_HOURLY_PAY = 20;

/** Employer burden as a percentage (CPP, EI, WSIB, benefits, etc.) */
export const EMPLOYER_BURDEN_PERCENT = 0;

/** Effective cost per cleaner per hour including burden */
export const EFFECTIVE_CLEANER_COST =
  CLEANER_HOURLY_PAY * (1 + EMPLOYER_BURDEN_PERCENT);

// ============================================
// SUPPLIES & OVERHEAD
// ============================================

/** Estimated supply cost per cleaning hour (CAD) */
export const SUPPLIES_COST_PER_HOUR = 4;

/** Eco-friendly supplies surcharge per hour (CAD) */
export const ECO_FRIENDLY_SURCHARGE_PER_HOUR = 3;

// ============================================
// TIME ESTIMATION
// ============================================

/** Base time estimates in hours for different property types (single cleaner) */
export const BASE_TIME_ESTIMATES: Record<string, number> = {
  condo: 2.0,
  apartment: 2.0,
  house: 3.0,
  townhouse: 2.5,
  office: 2.5,
  commercial: 3.0,
  airbnb: 2.5,
};

/** Additional time per bedroom (hours) — residential */
export const TIME_PER_BEDROOM = 0.4;

/** Additional time per bathroom (hours) — residential */
export const TIME_PER_BATHROOM = 0.5;

/** Additional time per extra floor/level (hours) */
export const TIME_PER_FLOOR = 0.5;

// ============================================
// COMMERCIAL TIME ESTIMATION
// ============================================

/** Time per 500 sq ft of commercial space (hours) */
export const TIME_PER_500_SQFT = 0.5;

/** Additional time per office/private room (hours) */
export const TIME_PER_OFFICE = 0.3;

/** Additional time per commercial washroom (hours) */
export const TIME_PER_WASHROOM = 0.5;

/** Additional time per common area — boardroom, reception, kitchen, open workspace, etc. (hours) */
export const TIME_PER_COMMON_AREA = 0.4;

/** Additional time if space has stairs (hours) */
export const TIME_FOR_STAIRS = 0.3;

// ============================================
// SERVICE TYPE MULTIPLIERS
// ============================================

/** Multiplier applied to base time for each service type */
export const SERVICE_TYPE_MULTIPLIERS: Record<string, number> = {
  standard: 1.0,
  deep: 1.5,
  "move-in-out": 1.7,
  recurring: 1.0,
  office: 1.0,
  "post-renovation": 2.0,
};

// ============================================
// CONDITION / DIFFICULTY MULTIPLIERS
// ============================================

/** Multiplier based on current cleanliness condition */
export const CONDITION_MULTIPLIERS: Record<string, number> = {
  clean: 0.85,
  average: 1.0,
  messy: 1.2,
  "very-dirty": 1.5,
};

// ============================================
// FREQUENCY DISCOUNTS
// ============================================

/** Discount percentage for recurring service frequency */
export const FREQUENCY_DISCOUNTS: Record<string, number> = {
  "one-time": 0,
  weekly: 0.2,
  "bi-weekly": 0.15,
  monthly: 0.1,
};

// ============================================
// ADD-ON PRICING (flat fee per add-on)
// ============================================

export interface AddOnItem {
  id: string;
  label: string;
  price: number;
  estimatedTime: number; // additional hours
}

export const ADD_ONS: AddOnItem[] = [
  { id: "inside-fridge", label: "Inside Fridge Cleaning", price: 40, estimatedTime: 0.5 },
  { id: "inside-oven", label: "Inside Oven Cleaning", price: 45, estimatedTime: 0.5 },
  { id: "interior-windows", label: "Interior Window Cleaning", price: 50, estimatedTime: 0.75 },
  { id: "baseboards", label: "Baseboard Detailing", price: 35, estimatedTime: 0.5 },
  { id: "laundry", label: "Laundry (Wash, Dry & Fold)", price: 30, estimatedTime: 0.5 },
  { id: "dishes", label: "Dishes", price: 20, estimatedTime: 0.3 },
  { id: "extra-bathroom", label: "Extra Bathroom", price: 45, estimatedTime: 0.5 },
  { id: "basement", label: "Basement Cleaning", price: 60, estimatedTime: 1.0 },
  { id: "post-renovation", label: "Post-Renovation Heavy Duty", price: 150, estimatedTime: 2.0 },
  { id: "organizing", label: "Light Organization", price: 40, estimatedTime: 0.5 },
  { id: "cabinet-interior", label: "Inside Cabinets", price: 50, estimatedTime: 0.75 },
];

/** Add-ons specific to commercial/office spaces */
export const COMMERCIAL_ADD_ONS: AddOnItem[] = [
  { id: "desk-sanitization", label: "Desk & Workstation Sanitization", price: 60, estimatedTime: 0.75 },
  { id: "interior-windows", label: "Interior Window & Glass Cleaning", price: 50, estimatedTime: 0.75 },
  { id: "carpet-spot-clean", label: "Carpet Spot Cleaning & Deodorizing", price: 75, estimatedTime: 1.0 },
  { id: "kitchen-deep", label: "Kitchen / Breakroom Deep Clean", price: 55, estimatedTime: 0.75 },
  { id: "floor-wax-buff", label: "Floor Waxing & Buffing", price: 100, estimatedTime: 1.5 },
  { id: "high-touch-sanitize", label: "High-Touch Surface Sanitization", price: 40, estimatedTime: 0.5 },
  { id: "restroom-restock", label: "Restroom Consumable Restocking", price: 35, estimatedTime: 0.3 },
  { id: "post-construction", label: "Post-Construction Heavy Duty", price: 200, estimatedTime: 2.5 },
  { id: "trash-recycling", label: "Trash & Recycling Removal", price: 30, estimatedTime: 0.3 },
  { id: "furniture-moving", label: "Move & Clean Around Furniture", price: 50, estimatedTime: 0.5 },
];

// ============================================
// SERVICE AREA & TRAVEL
// ============================================

/** Travel fee adjustments by area (CAD) */
export const TRAVEL_FEES: Record<string, number> = {
  mississauga: 0,
  toronto: 10,
  brampton: 10,
  oakville: 15,
  milton: 20,
  etobicoke: 5,
  vaughan: 15,
  "richmond-hill": 20,
  markham: 20,
  "other-gta": 25,
};

// ============================================
// PARKING / ACCESS DIFFICULTY
// ============================================

export const PARKING_FEES: Record<string, number> = {
  easy: 0,
  moderate: 10,
  difficult: 25,
};

// ============================================
// PET ADJUSTMENT
// ============================================

/** Additional fee if pets are present */
export const PET_FEE = 15;

// ============================================
// SUPPLIES ADJUSTMENT
// ============================================

/** Discount if client provides their own supplies */
export const CLIENT_SUPPLIES_DISCOUNT = 10;

// ============================================
// URGENCY / SHORT-NOTICE
// ============================================

/** Surcharge for requests within 24 hours */
export const URGENCY_SURCHARGE_SAME_DAY = 40;

/** Surcharge for requests within 48 hours */
export const URGENCY_SURCHARGE_NEXT_DAY = 20;

// ============================================
// BUSINESS RULES
// ============================================

/** Minimum booking amount (CAD) */
export const MINIMUM_BOOKING = 120;

/** Target gross margin (percentage) */
export const TARGET_MARGIN = 0.35;

/** Threshold hours above which a second cleaner is dispatched */
export const SECOND_CLEANER_THRESHOLD_HOURS = 4;

/** Threshold hours above which a third cleaner is dispatched */
export const THIRD_CLEANER_THRESHOLD_HOURS = 7;

// ============================================
// PACKAGE DEFINITIONS
// ============================================

export interface PackageDefinition {
  id: string;
  name: string;
  description: string;
  features: string[];
  multiplier: number; // applied to base pricing
  recommended?: boolean;
}

export const RESIDENTIAL_PACKAGES: PackageDefinition[] = [
  {
    id: "silver",
    name: "Silver",
    description: "Essential cleaning for a fresh, tidy home",
    features: [
      "Dusting all surfaces",
      "Vacuuming carpets and rugs",
      "Sweeping and mopping floors",
      "Cleaning mirrors and glass surfaces",
      "Sanitizing bathrooms",
      "Wiping down kitchen surfaces",
    ],
    multiplier: 1.0,
  },
  {
    id: "gold",
    name: "Gold",
    description: "Comprehensive cleaning with added attention to detail",
    features: [
      "Everything in Silver, plus:",
      "Detailed kitchen cleaning",
      "Bathroom deep clean including grout scrubbing",
      "Dusting blinds and window ledges",
      "Cleaning under furniture (as accessible)",
      "Baseboard cleaning",
    ],
    multiplier: 1.35,
    recommended: true,
  },
  {
    id: "platinum",
    name: "Platinum",
    description: "The ultimate deep clean experience for your home",
    features: [
      "Everything in Gold, plus:",
      "Deep carpet cleaning (spot cleaning & deodorizing)",
      "Upholstery cleaning",
      "Interior window & window track cleaning",
      "Inside refrigerator and oven cleaning",
      "Detailed organization of personal items",
      "Seasonal deep cleaning tasks",
    ],
    multiplier: 1.75,
  },
];

export const COMMERCIAL_PACKAGES: PackageDefinition[] = [
  {
    id: "silver",
    name: "Silver",
    description: "Core office cleaning for a professional workspace",
    features: [
      "Dusting all surfaces, desks, and shelves",
      "Vacuuming carpets and area rugs",
      "Sweeping and mopping hard surface floors",
      "Sanitizing bathrooms (toilets, sinks, floors)",
      "Emptying trash and replacing bin liners",
      "Wiping down common equipment",
    ],
    multiplier: 1.0,
  },
  {
    id: "gold",
    name: "Gold",
    description: "Enhanced cleaning with sanitization focus",
    features: [
      "Everything in Silver, plus:",
      "Deep cleaning of all flooring",
      "Detailed breakroom and kitchen cleaning",
      "Sanitizing door handles and light switches",
      "Interior window and glass surface cleaning",
      "Spot cleaning of walls and doors",
    ],
    multiplier: 1.35,
    recommended: true,
  },
  {
    id: "platinum",
    name: "Platinum",
    description: "Complete commercial cleaning and hygiene solution",
    features: [
      "Everything in Gold, plus:",
      "Comprehensive carpet and upholstery deep clean",
      "Detailed cleaning of all furniture (including behind/under)",
      "Restroom hygiene services with consumable restocking",
      "Post-cleaning walkthrough and quality assurance",
    ],
    multiplier: 1.75,
  },
];

// ============================================
// QUOTE CALCULATION ENGINE
// ============================================

export interface QuoteInput {
  propertyType: string;
  // Residential fields
  bedrooms: number;
  bathrooms: number;
  floors: number;
  // Commercial fields
  squareFootage?: number;
  offices?: number;
  washrooms?: number;
  commonAreas?: string[];
  hasStairs?: boolean;
  // Shared fields
  serviceType: string;
  frequency: string;
  condition: string;
  hasPets: boolean;
  clientProvidesSupplies: boolean;
  ecoFriendly: boolean;
  addOns: string[];
  area: string;
  parking: string;
  urgency: "none" | "next-day" | "same-day";
  packageTier: string;
}

export interface QuoteResult {
  estimatedHours: number;
  numberOfCleaners: number;
  subtotal: number;
  addOnsTotal: number;
  travelFee: number;
  parkingFee: number;
  petFee: number;
  suppliesAdjustment: number;
  urgencySurcharge: number;
  frequencyDiscount: number;
  frequencyDiscountPercent: number;
  totalBeforeDiscount: number;
  total: number;
  perCleaningCost: number;
  breakdown: QuoteBreakdownItem[];
}

export interface QuoteBreakdownItem {
  label: string;
  amount: number;
  type: "base" | "addon" | "fee" | "discount" | "surcharge";
}

export function calculateQuote(input: QuoteInput): QuoteResult {
  const isCommercial = input.propertyType === "office" || input.propertyType === "commercial";

  // 1. Calculate base estimated hours
  const baseTime = BASE_TIME_ESTIMATES[input.propertyType] || 2.5;
  let estimatedHours: number;

  if (isCommercial) {
    // Commercial: based on sq footage, offices, washrooms, common areas
    const sqftTime = Math.max(0, ((input.squareFootage || 1000) / 500)) * TIME_PER_500_SQFT;
    const officeTime = (input.offices || 0) * TIME_PER_OFFICE;
    const washroomTime = (input.washrooms || 1) * TIME_PER_WASHROOM;
    const commonAreaTime = (input.commonAreas?.length || 0) * TIME_PER_COMMON_AREA;
    const stairsTime = input.hasStairs ? TIME_FOR_STAIRS : 0;

    estimatedHours = baseTime + sqftTime + officeTime + washroomTime + commonAreaTime + stairsTime;
  } else {
    // Residential: based on bedrooms, bathrooms, floors
    const bedroomTime = input.bedrooms * TIME_PER_BEDROOM;
    const bathroomTime = input.bathrooms * TIME_PER_BATHROOM;
    const floorTime = Math.max(0, input.floors - 1) * TIME_PER_FLOOR;

    estimatedHours = baseTime + bedroomTime + bathroomTime + floorTime;
  }

  // 2. Apply service type multiplier
  const serviceMultiplier = SERVICE_TYPE_MULTIPLIERS[input.serviceType] || 1.0;
  estimatedHours *= serviceMultiplier;

  // 3. Apply condition multiplier
  const conditionMultiplier = CONDITION_MULTIPLIERS[input.condition] || 1.0;
  estimatedHours *= conditionMultiplier;

  // 4. Apply package tier multiplier
  const allPackages = [...RESIDENTIAL_PACKAGES, ...COMMERCIAL_PACKAGES];
  const selectedPackage = allPackages.find((p) => p.id === input.packageTier);
  const packageMultiplier = selectedPackage?.multiplier || 1.0;

  // 5. Calculate number of cleaners
  let numberOfCleaners = 1;
  if (estimatedHours > THIRD_CLEANER_THRESHOLD_HOURS) {
    numberOfCleaners = 3;
  } else if (estimatedHours > SECOND_CLEANER_THRESHOLD_HOURS) {
    numberOfCleaners = 2;
  }

  // Effective hours per cleaner (parallel work)
  const effectiveHours = estimatedHours / numberOfCleaners;

  // 6. Base cost calculation
  const laborCost = estimatedHours * BASE_HOURLY_RATE * packageMultiplier;

  // 7. Supplies cost
  const suppliesCost = estimatedHours * SUPPLIES_COST_PER_HOUR;
  const ecoSurcharge = input.ecoFriendly
    ? estimatedHours * ECO_FRIENDLY_SURCHARGE_PER_HOUR
    : 0;

  let subtotal = laborCost + suppliesCost + ecoSurcharge;

  // 8. Add-on costs
  const addOnList = isCommercial ? COMMERCIAL_ADD_ONS : ADD_ONS;
  const selectedAddOns = addOnList.filter((a) => input.addOns.includes(a.id));
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);

  // 9. Travel fee
  const travelFee = TRAVEL_FEES[input.area] ?? TRAVEL_FEES["other-gta"] ?? 25;

  // 10. Parking fee
  const parkingFee = PARKING_FEES[input.parking] || 0;

  // 11. Pet fee
  const petFee = input.hasPets ? PET_FEE : 0;

  // 12. Supplies adjustment
  const suppliesAdjustment = input.clientProvidesSupplies
    ? -CLIENT_SUPPLIES_DISCOUNT
    : 0;

  // 13. Urgency surcharge
  let urgencySurcharge = 0;
  if (input.urgency === "same-day") {
    urgencySurcharge = URGENCY_SURCHARGE_SAME_DAY;
  } else if (input.urgency === "next-day") {
    urgencySurcharge = URGENCY_SURCHARGE_NEXT_DAY;
  }

  // 14. Total before frequency discount
  const totalBeforeDiscount =
    subtotal +
    addOnsTotal +
    travelFee +
    parkingFee +
    petFee +
    suppliesAdjustment +
    urgencySurcharge;

  // 15. Frequency discount
  const frequencyDiscountPercent =
    FREQUENCY_DISCOUNTS[input.frequency] || 0;
  const frequencyDiscount = totalBeforeDiscount * frequencyDiscountPercent;

  // 16. Final total (enforce minimum)
  let total = Math.max(
    MINIMUM_BOOKING,
    Math.round(totalBeforeDiscount - frequencyDiscount)
  );

  // Build breakdown for display
  const breakdown: QuoteBreakdownItem[] = [
    { label: "Base Cleaning Service", amount: Math.round(laborCost), type: "base" },
  ];

  if (ecoSurcharge > 0) {
    breakdown.push({
      label: "Eco-Friendly Products",
      amount: Math.round(ecoSurcharge),
      type: "fee",
    });
  }

  selectedAddOns.forEach((addon) => {
    breakdown.push({ label: addon.label, amount: addon.price, type: "addon" });
  });

  if (travelFee > 0) {
    breakdown.push({ label: "Service Area Travel", amount: travelFee, type: "fee" });
  }

  if (parkingFee > 0) {
    breakdown.push({ label: "Parking / Access", amount: parkingFee, type: "fee" });
  }

  if (petFee > 0) {
    breakdown.push({ label: "Pet Cleaning Adjustment", amount: petFee, type: "fee" });
  }

  if (suppliesAdjustment < 0) {
    breakdown.push({
      label: "Client Provides Supplies",
      amount: suppliesAdjustment,
      type: "discount",
    });
  }

  if (urgencySurcharge > 0) {
    breakdown.push({
      label: "Short Notice Surcharge",
      amount: urgencySurcharge,
      type: "surcharge",
    });
  }

  if (frequencyDiscount > 0) {
    breakdown.push({
      label: `Recurring Discount (${Math.round(frequencyDiscountPercent * 100)}%)`,
      amount: -Math.round(frequencyDiscount),
      type: "discount",
    });
  }

  return {
    estimatedHours: Math.round(effectiveHours * 10) / 10,
    numberOfCleaners,
    subtotal: Math.round(subtotal),
    addOnsTotal,
    travelFee,
    parkingFee,
    petFee,
    suppliesAdjustment,
    urgencySurcharge,
    frequencyDiscount: Math.round(frequencyDiscount),
    frequencyDiscountPercent,
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    total,
    perCleaningCost: total,
    breakdown,
  };
}
