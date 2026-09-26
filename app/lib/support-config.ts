/**
 * Clean7 Support & Customer Service Configuration
 * Centralized constants for all contact and support details.
 */

export const SUPPORT_CONFIG = {
  // Brand & Support Identity
  brandName: "Clean7",
  
  // Real Clean7 Contact Details
  email: "support@clean7.in",
  emailMailto: "mailto:support@clean7.in",
  
  phoneDisplay: "+91 70784 97263",
  phoneRaw: "+917078497263",
  phoneTel: "tel:+917078497263",
  
  whatsappDisplay: "+91 70784 97263",
  whatsappUrl: "https://wa.me/917078497263",
  
  operatingHours: "9:00 AM – 8:00 PM, All Days",
  responseTime: "Within 24 hours",

  // Business & Registered Addresses
  businessAddress: "NH 58 Rohta Bypass Flyover Service Road Khadoli, Meerut, Uttar Pradesh",
  registeredAddress: "123, Mullapur Road, Thana Bhawan, Shamli, Uttar Pradesh, 247777",
  mapsUrl: "https://maps.google.com/maps?q=28.992972,77.645833+(Clean7)&z=15&output=embed",

  // Services offered on the Clean7 platform
  services: [
    "Laundry",
    "Wash & Fold",
    "Dry Cleaning",
    "Shoe Cleaning",
    "Blanket & Curtain Cleaning",
    "Home Cleaning",
    "Household / Home Help",
    "Doorstep Car Wash",
    "Other",
  ] as const,

  // Issue types for categorization
  issueTypes: [
    "Booking",
    "Pickup",
    "Delivery",
    "Service",
    "Payment",
    "Cancellation",
    "Refund",
    "Account",
    "Other",
  ] as const,
};

export type Clean7Service = (typeof SUPPORT_CONFIG.services)[number];
export type Clean7IssueType = (typeof SUPPORT_CONFIG.issueTypes)[number];
