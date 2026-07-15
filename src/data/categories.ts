export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "pooja-samagri",
    name: "Pooja Samagri & Ritual Kits",
    tagline: "Every ceremony, bundled and ready to ship",
    description:
      "Kalash to kumkum, havan to haldi — every ritual item pre-packed into one kit so you order once instead of chasing ten different shops.",
    image: "/images/real/ritual-ceremony.jpg",
  },
  {
    slug: "invitations",
    name: "Invitations & Stationery",
    tagline: "Set the tone before the first RSVP",
    description:
      "Foil-stamped cards, minimal suites, and digital save-the-dates — the first impression of your celebration.",
    image: "/images/categories/invitations.svg",
  },
  {
    slug: "bridal-wear",
    name: "Bridal Wear",
    tagline: "Lehengas, gowns & everything the bride wears",
    description:
      "From regal bridal lehengas to reception gowns, curated for every ceremony on your calendar.",
    image: "/images/categories/bridal-wear.svg",
  },
  {
    slug: "groom-wear",
    name: "Groom Wear",
    tagline: "Sherwanis, suits & groom essentials",
    description:
      "Sharp silhouettes and rich fabrics for the sangeet, the pheras, and everything after.",
    image: "/images/categories/groom-wear.svg",
  },
  {
    slug: "jewelry",
    name: "Jewelry",
    tagline: "Heirloom-inspired pieces for every ceremony",
    description:
      "Kundan, polki, and temple jewelry crafted to feel like they've been in the family for generations.",
    image: "/images/categories/jewelry.svg",
  },
  {
    slug: "decor-florals",
    name: "Decor & Florals",
    tagline: "Mandaps, florals & venue styling",
    description:
      "Full-scale decor design — mandaps, backdrops, and floral installations built around your theme.",
    image: "/images/categories/decor-florals.svg",
  },
  {
    slug: "catering",
    name: "Catering",
    tagline: "Menus guests will talk about for years",
    description:
      "Multi-cuisine spreads, live counters, and dessert stations tailored to your guest list.",
    image: "/images/categories/catering.svg",
  },
  {
    slug: "photography",
    name: "Photography & Films",
    tagline: "Photographers & cinematic wedding films",
    description:
      "Candid photographers and cinematic filmmakers who capture the moments you'll want to replay.",
    image: "/images/categories/photography.svg",
  },
  {
    slug: "gifts-favors",
    name: "Gifts & Favors",
    tagline: "Thoughtful tokens for guests & family",
    description:
      "Personalized hampers, trousseau packing, and return gifts guests actually keep.",
    image: "/images/categories/gifts-favors.svg",
  },
  {
    slug: "venues",
    name: "Venues",
    tagline: "Banquets, resorts & destination properties",
    description:
      "Palaces, beachside resorts, and rooftop gardens — venues for every guest count and budget.",
    image: "/images/categories/venues.svg",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
