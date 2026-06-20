export type ServiceCategorySlug =
  | "laundry"
  | "home-cleaning"
  | "doorstep-car-wash"
  | "pest-control";

export type ServiceSubItem = {
  title: string;
  /** Short line under the title; also used when no bullets are set */
  description: string;
  emoji?: string;
  /** Rich list for detailed service pages */
  bullets?: string[];
};

export type ServiceCategory = {
  slug: ServiceCategorySlug;
  /** Short label for cards and nav */
  cardTitle: string;
  emoji: string;
  /** One-line teaser on category cards */
  teaser: string;
  heading: string;
  description: string;
  /** Optional second intro paragraph (e.g. laundry page) */
  descriptionSecondary?: string;
  /** Overrides default “Sub services” section heading */
  servicesSectionTitle?: string;
  /** Optional emoji before servicesSectionTitle */
  servicesSectionEmoji?: string;
  process?: {
    emoji?: string;
    heading: string;
    steps: string[];
  };
  subServices: ServiceSubItem[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "laundry",
    cardTitle: "Laundry Services",
    emoji: "\u{1F9FA}",
    teaser:
      "Fabric care, pickup & delivery — wash, dry clean, press, and more.",
    heading: "Professional Laundry & Dry Cleaning at Your Doorstep",
    description:
      "At Wash & Wow, we make laundry effortless. From daily wear to premium garments, our expert cleaning process ensures deep cleaning, fabric safety, and long-lasting freshness.",
    descriptionSecondary:
      "We combine modern machines, eco-friendly detergents, and expert fabric care to deliver spotless results — every time.",
    servicesSectionTitle: "Our Laundry Services",
    servicesSectionEmoji: "\u{1F680}",
    subServices: [
      {
        title: "Wash & Fold",
        emoji: "\u{1F455}",
        description: "Perfect for everyday clothes.",
        bullets: [
          "Machine wash with premium detergents",
          "Hygienic cleaning & drying",
          "Neatly folded and packed",
        ],
      },
      {
        title: "Wash & Iron",
        emoji: "\u{1F454}",
        description: "For a ready-to-wear experience.",
        bullets: [
          "Deep cleaning + steam ironing",
          "Wrinkle-free finish",
          "Ideal for office wear & daily outfits",
        ],
      },
      {
        title: "Dry Cleaning",
        emoji: "\u{1F9E5}",
        description: "Special care for delicate and premium fabrics.",
        bullets: [
          "Suit, blazer, saree, lehenga, coats",
          "Chemical-safe, fabric-friendly cleaning",
          "Stain removal & odor treatment",
        ],
      },
      {
        title: "Premium Garment Care",
        emoji: "\u{1F457}",
        description: "For high-value clothing.",
        bullets: [
          "Designer wear & ethnic outfits",
          "Color protection & fabric preservation",
          "Hand-finished detailing",
        ],
      },
      {
        title: "Bulk & Household Laundry",
        emoji: "\u{1F6CF}\uFE0F",
        description: "Large items cleaned professionally.",
        bullets: [
          "Bedsheets, blankets, curtains",
          "Sofa covers & cushion covers",
          "Towels & quilts",
        ],
      },
      {
        title: "Shoe Cleaning",
        emoji: "\u{1F45F}",
        description: "Restore your footwear.",
        bullets: [
          "Deep cleaning & deodorizing",
          "Sneaker whitening & polishing",
        ],
      },
      {
        title: "Soft Toy Cleaning",
        emoji: "\u{1F9F8}",
        description: "Safe cleaning for kids' toys.",
        bullets: ["Chemical-safe wash", "Germ & odor removal"],
      },
    ],
  },
  {
    slug: "home-cleaning",
    cardTitle: "Home Cleaning",
    emoji: "\u{1F9F9}",
    teaser:
      "Deep cleaning for every room — trained pros, safe products, spotless results.",
    heading: "Professional Home Cleaning Services",
    description:
      "Transform your living space into a spotless, healthy environment. Our trained professionals use modern equipment and safe chemicals for deep and effective cleaning.",
    subServices: [
      {
        title: "Full Home Deep Cleaning",
        description:
          "Complete cleaning of entire house (kitchen, bathroom, rooms).",
      },
      {
        title: "Kitchen Deep Cleaning",
        description: "Degreasing, chimney, cabinets, tiles.",
      },
      {
        title: "Bathroom Cleaning",
        description: "Stain removal, disinfection, fittings cleaning.",
      },
      {
        title: "Sofa & Carpet Cleaning",
        description: "Shampooing and stain removal.",
      },
      {
        title: "Floor Scrubbing & Polishing",
        description: "Machine-based deep cleaning.",
      },
      {
        title: "Move-in / Move-out Cleaning",
        description: "Perfect for tenants and landlords.",
      },
    ],
  },
  {
    slug: "doorstep-car-wash",
    cardTitle: "Doorstep Car Wash",
    emoji: "\u{1F697}",
    teaser:
      "Professional car cleaning at your home — no queues, spotless results.",
    heading: "Professional Car Cleaning at Your Doorstep",
    description:
      "No more waiting in long queues. Wash & Wow brings professional car wash services to your home, saving your time while keeping your vehicle spotless.",
    servicesSectionTitle: "Our Car Wash Services",
    servicesSectionEmoji: "\u{1F698}",
    subServices: [
      {
        title: "Exterior Car Wash",
        emoji: "\u{1F697}",
        description: "",
        bullets: [
          "Dust & mud removal",
          "Foam wash & rinse",
          "Scratch-free microfiber cleaning",
        ],
      },
      {
        title: "Interior Cleaning",
        emoji: "\u{1F9FC}",
        description: "",
        bullets: [
          "Dashboard cleaning",
          "Seat vacuuming",
          "Carpet & mat cleaning",
        ],
      },
      {
        title: "Complete Car Detailing",
        emoji: "\u{2728}",
        description: "",
        bullets: [
          "Interior + exterior cleaning",
          "Polishing & shine enhancement",
          "Odor removal",
        ],
      },
      {
        title: "Seat & Upholstery Cleaning",
        emoji: "\u{1F4BA}",
        description: "",
        bullets: ["Fabric & leather seat care", "Deep stain removal"],
      },
      {
        title: "Tyre & Alloy Cleaning",
        emoji: "\u{1F6DE}",
        description: "",
        bullets: ["Dirt & grease removal", "Tyre polishing"],
      },
      {
        title: "Waterless / Eco Car Wash",
        emoji: "\u{1F331}",
        description: "",
        bullets: ["Minimal water usage", "Eco-friendly cleaning products"],
      },
    ],
  },
  {
    slug: "pest-control",
    cardTitle: "Pest Control",
    emoji: "\u{1F6E1}",
    teaser:
      "Government-approved, safe chemicals — ants, cockroaches, mosquitoes, rodents, termites, and more.",
    heading: "Safe & Effective Pest Control Services",
    description:
      "Protect your home and family from harmful pests with Wash & Wow’s professional pest control solutions. We use government-approved, safe chemicals to eliminate pests while keeping your home secure.",
    servicesSectionTitle: "Our Pest Control Services",
    servicesSectionEmoji: "\u{1F41E}",
    subServices: [
      {
        title: "Cockroach Control",
        emoji: "\u{1FAB3}",
        description: "",
        bullets: ["Gel-based treatment", "Long-lasting protection"],
      },
      {
        title: "Ant Control",
        emoji: "\u{1F41C}",
        description: "",
        bullets: ["Colony elimination", "Preventive solutions"],
      },
      {
        title: "Mosquito Control",
        emoji: "\u{1F99F}",
        description: "",
        bullets: ["Spray & fogging treatment", "Breeding prevention"],
      },
      {
        title: "Rodent Control",
        emoji: "\u{1F400}",
        description: "",
        bullets: ["Rat & mouse removal", "Entry point sealing"],
      },
      {
        title: "Termite Treatment",
        emoji: "\u{1F41B}",
        description: "",
        bullets: [
          "Pre & post-construction solutions",
          "Wood protection",
        ],
      },
      {
        title: "General Pest Control",
        emoji: "\u{1F577}",
        description: "",
        bullets: ["Spiders, lizards, insects", "Full home treatment"],
      },
    ],
    process: {
      emoji: "\u{2699}\uFE0F",
      heading: "Our Process",
      steps: [
        "Inspection",
        "Treatment planning",
        "Safe chemical application",
        "Follow-up if needed",
      ],
    },
  },
];

export function getCategoryBySlug(
  slug: string,
): ServiceCategory | undefined {
  return SERVICE_CATEGORIES.find((c) => c.slug === slug);
}

export function categoryPath(slug: ServiceCategorySlug): string {
  return `/services/${slug}`;
}
