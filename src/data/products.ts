export type Product = {
  slug: string;
  name: string;
  categorySlug: string;
  image: string;
  gallery: string[];
  description: string;
  highlights: string[];
  badge?: string;
  /** Seed-only, in rupees (converted to paise at seed time). Omit for "enquire only" products. */
  mrpRupees?: number;
  priceRupees?: number;
};

function productImages(key: string) {
  return [
    `/images/products/${key}-a.svg`,
    `/images/products/${key}-b.svg`,
  ];
}

type RawProduct = Omit<Product, "image" | "gallery"> & {
  imageKey?: string;
  /** Real photos, in order. When present, these replace the generated placeholder pair. */
  images?: string[];
};

const raw: RawProduct[] = [
  // Pooja Samagri & Ritual Kits — bundled combo packs, not loose SKUs,
  // so shoppers can order one ceremony's worth of items in a single click.
  {
    slug: "complete-wedding-pooja-kit",
    name: "Complete Wedding Pooja Kit",
    categorySlug: "pooja-samagri",
    badge: "Bestseller",
    imageKey: "complete-wedding-pooja-kit",
    images: [
      "/images/real/kalash.jpg",
      "/images/real/mangalsutra.jpg",
      "/images/real/sindoor-vermilion.jpg",
      "/images/real/haldi-turmeric.jpg",
      "/images/real/garlands-varmala.jpg",
      "/images/real/sacred-thread.jpg",
      "/images/real/puffed-rice-lava.jpg",
      "/images/real/panchamrit.jpg",
      "/images/real/camphor.jpg",
      "/images/real/gangajal.jpg",
      "/images/real/aarti-thali-bell.jpg",
    ],
    description:
      "Our flagship all-in-one kit — every core ritual item for the wedding day, pre-packed so you skip sourcing from ten different shops.",
    highlights: [
      "Kalash (sacred pot)",
      "Mangalsutra",
      "Sindoor (vermilion)",
      "Haldi (turmeric)",
      "Garlands (varmala)",
      "Sacred thread (mauli/kalava)",
      "Puffed rice (lava)",
      "Panchamrit & camphor",
      "Gangajal (holy water)",
      "Pooja thali with bell",
    ],
  },
  {
    slug: "core-wedding-ritual-kit",
    name: "Core Wedding Ritual Kit",
    categorySlug: "pooja-samagri",
    badge: "Most Popular",
    imageKey: "core-wedding-ritual-kit",
    images: [
      "/images/real/kalash.jpg",
      "/images/real/mangalsutra.jpg",
      "/images/real/sindoor-vermilion.jpg",
      "/images/real/haldi-turmeric.jpg",
      "/images/real/garlands-varmala.jpg",
      "/images/real/sacred-thread.jpg",
      "/images/real/puffed-rice-lava.jpg",
    ],
    description:
      "The seven essentials every phera and sankalp calls for, bundled into one ready-to-use kit.",
    highlights: [
      "Kalash (sacred pot)",
      "Mangalsutra",
      "Sindoor (vermilion)",
      "Haldi (turmeric)",
      "Garlands (varmala)",
      "Sacred thread (mauli/kalava)",
      "Puffed rice (lava)",
    ],
  },
  {
    slug: "havan-essentials-kit",
    name: "Havan Essentials Kit",
    categorySlug: "pooja-samagri",
    badge: "Priest Recommended",
    imageKey: "havan-essentials-kit",
    images: [
      "/images/real/havan-wood.jpg",
      "/images/real/havan-ghee.jpg",
      "/images/real/rice-sugar.jpg",
      "/images/real/dry-coconut.jpg",
      "/images/real/panchamrit.jpg",
      "/images/real/camphor.jpg",
      "/images/real/dhoop-sticks.jpg",
      "/images/real/navdhanyam.jpg",
      "/images/real/gangajal.jpg",
    ],
    description:
      "Everything the fire ritual needs in one box — from the havan kund to the last ahuti offering.",
    highlights: [
      "Havan kund (fire pit)",
      "Havan samidha (dry wood sticks)",
      "Pure ghee for havan",
      "Rice & sugar (for ahuti)",
      "Dry coconut (for ahuti)",
      "Panchamrit (milk, curd, ghee, honey, sugar)",
      "Camphor (Bhimseni/regular)",
      "Incense & dhoop sticks",
      "Navdhanya (nine sacred grains)",
      "Gangajal (holy water)",
    ],
  },
  {
    slug: "general-offering-samagri-kit",
    name: "General Offering Samagri Kit",
    categorySlug: "pooja-samagri",
    imageKey: "general-offering-samagri-kit",
    images: [
      "/images/real/coconut.jpg",
      "/images/real/flower.jpg",
      "/images/real/betel-leaves.jpg",
      "/images/real/betel-nut.jpg",
      "/images/real/rice-akshat.jpg",
      "/images/real/kumkum.jpg",
      "/images/real/chandan.jpg",
      "/images/real/turmeric-powder-bowl.jpg",
      "/images/real/abir-gulal.jpg",
    ],
    description:
      "The everyday offering staples every ceremony needs on hand, restocked in one order.",
    highlights: [
      "Coconut (whole, dry)",
      "Flowers (loose & garlands)",
      "Betel leaves (paan)",
      "Betel nuts (supari)",
      "Rice (akshat)",
      "Kumkum",
      "Chandan (sandalwood paste/powder)",
      "Turmeric powder",
      "Abir/gulal",
    ],
  },
  {
    slug: "diya-and-lighting-kit",
    name: "Diya & Lighting Kit",
    categorySlug: "pooja-samagri",
    imageKey: "diya-and-lighting-kit",
    images: [
      "/images/real/brass-diya.jpg",
      "/images/real/ghee-diyas.jpg",
      "/images/real/cotton-wicks.jpg",
      "/images/real/matchbox.jpg",
      "/images/real/deepams.jpg",
    ],
    description:
      "Every lamp and wick you'll need to keep the mandap and pooja corner lit through the night.",
    highlights: [
      "Small brass diyas (reusable)",
      "Pure cow ghee diyas (ready-to-light)",
      "Cotton wicks (batti)",
      "Matchbox / lighter",
      "Deepams & oil lamps for mandap decor",
    ],
  },
  {
    slug: "pooja-thali-organization-set",
    name: "Pooja Thali & Organization Set",
    categorySlug: "pooja-samagri",
    imageKey: "pooja-thali-organization-set",
    images: [
      "/images/real/pooja-thali-set.jpg",
      "/images/real/brass-bowls.jpg",
      "/images/real/clean-cloth.jpg",
      "/images/real/aarti-thali-bell.jpg",
    ],
    description:
      "Keep every small item in its place — a full thali and storage set for the priest and family.",
    highlights: [
      "Pooja thali set with compartments",
      "Small steel/brass katoris",
      "Clean cloth for covering & wiping",
      "Aarti thali with bell",
    ],
  },
  {
    slug: "haldi-ceremony-kit",
    name: "Haldi Ceremony Kit",
    categorySlug: "pooja-samagri",
    badge: "Ceremony Favorite",
    imageKey: "haldi-ceremony-kit",
    images: ["/images/real/haldi-turmeric.jpg", "/images/real/turmeric-powder.jpg"],
    description:
      "Everything for the haldi function, from the ubtan paste to the marigold decor — ready the morning of.",
    highlights: [
      "Haldi paste / ubtan mix",
      "Yellow flowers & marigold strings",
      "Yellow cloth/dupatta for the function",
      "Haldi decor props (umbrella, pots)",
    ],
  },
  {
    slug: "mehendi-ceremony-kit",
    name: "Mehendi Ceremony Kit",
    categorySlug: "pooja-samagri",
    badge: "Ceremony Favorite",
    imageKey: "mehendi-ceremony-kit",
    description:
      "Henna and decor for the bride and every guest who wants a design of their own.",
    highlights: [
      "Henna cones (bridal & guest)",
      "Mehendi plates/stencils",
      "Floral jhoola & backdrop decor",
    ],
  },
  {
    slug: "sangeet-reception-decor-kit",
    name: "Sangeet & Reception Decor Kit",
    categorySlug: "pooja-samagri",
    imageKey: "sangeet-reception-decor-kit",
    description:
      "String lights, backdrops, and photo-corner props to turn any hall into a sangeet stage.",
    highlights: [
      "Fairy lights & string lights",
      "Backdrop drapes/curtains",
      "Photo booth props",
      "Welcome sign boards",
    ],
  },
  {
    slug: "bridal-adornment-kit",
    name: "Bridal Adornment Kit",
    categorySlug: "pooja-samagri",
    badge: "Trending",
    imageKey: "bridal-adornment-kit",
    description:
      "The finishing pieces every bridal look needs, from chura to maang tikka, in one set.",
    highlights: [
      "Bridal chura (bangles)",
      "Kalire",
      "Bindi set",
      "Nath (nose ring)",
      "Payal (anklets)",
      "Maang tikka",
    ],
  },
  {
    slug: "groom-ceremonial-kit",
    name: "Groom Ceremonial Kit",
    categorySlug: "pooja-samagri",
    imageKey: "groom-ceremonial-kit",
    description:
      "The groom's headgear essentials, ready for the baraat and the pheras.",
    highlights: ["Sehra (groom's headgear)", "Turban/pagdi", "Kalgi (turban brooch)"],
  },
  {
    slug: "mandap-decor-kit",
    name: "Mandap Decor Kit",
    categorySlug: "pooja-samagri",
    imageKey: "mandap-decor-kit",
    description:
      "Everything to dress the mandap — florals, drapes, torans, and ambient lighting in one set.",
    highlights: [
      "Mandap flower decoration set",
      "Drapes and fabric for the mandap",
      "Rangoli colors/stencils",
      "Torans (door hangings)",
      "Ambient decor lighting",
    ],
  },
  {
    slug: "gifting-and-return-favor-kit",
    name: "Gifting & Return Favor Kit",
    categorySlug: "pooja-samagri",
    imageKey: "gifting-and-return-favor-kit",
    description:
      "Shagun envelopes, favor boxes, and packing supplies for every guest walking out the door.",
    highlights: [
      "Shagun envelopes",
      "Wedding favor boxes",
      "Trousseau packing items",
      "Gift wrapping supplies",
    ],
  },
  {
    slug: "pre-wedding-ritual-kit",
    name: "Pre-Wedding Ritual Kit",
    categorySlug: "pooja-samagri",
    imageKey: "pre-wedding-ritual-kit",
    images: ["/images/real/parents-coconut-ritual.jpg"],
    description:
      "Covers the ganesh puja, roka, and tilak ceremonies that happen before the big day.",
    highlights: [
      "Ganesh puja items (griha shanti / first invitation)",
      "Roka ceremony thali items",
      "Engagement ring box/tray",
      "Tilak ceremony tray (tikka, rice, coconut, dry fruits)",
    ],
  },
  {
    slug: "bulk-utility-pack",
    name: "Bulk Utility Pack",
    categorySlug: "pooja-samagri",
    badge: "For Bulk Orders",
    imageKey: "bulk-utility-pack",
    description:
      "Disposable-ware and backup essentials for large gatherings, catering teams, and event planners.",
    highlights: [
      "Disposable pooja plates & cups",
      "Cotton wicks & extra ghee stock",
      "Extra matchboxes",
      "Storage/organizer boxes for samagri kits",
    ],
  },

  // Invitations & Stationery
  {
    slug: "royal-gold-foil-invitation-set",
    name: "Royal Gold Foil Invitation Set",
    categorySlug: "invitations",
    description:
      "A hand-assembled invitation suite with gold foil detailing, layered cardstock, and a matching envelope liner.",
    highlights: ["Gold foil stamping", "Layered cardstock", "Custom wording & fonts", "Matching RSVP cards"],
  },
  {
    slug: "minimal-ivory-suite",
    name: "Minimal Ivory Suite",
    categorySlug: "invitations",
    description:
      "Clean typography on textured ivory paper for couples who want elegance without the embellishment.",
    highlights: ["Textured cotton paper", "Modern calligraphy", "Optional wax seal", "Eco-friendly inks"],
  },
  {
    slug: "digital-save-the-date-film",
    name: "Digital Save-the-Date Film",
    categorySlug: "invitations",
    description:
      "A short animated video invite, perfect for reaching guests instantly across every messaging app.",
    highlights: ["30–60 second film", "Personalized animation", "Multi-language voiceover", "Shareable in one tap"],
  },

  // Bridal Wear
  {
    slug: "regal-red-bridal-lehenga",
    name: "Regal Red Bridal Lehenga",
    categorySlug: "bridal-wear",
    description:
      "A hand-embroidered bridal lehenga in classic red, finished with zardozi work and a flowing dupatta.",
    highlights: ["Hand zardozi embroidery", "Custom fitting", "Matching dupatta", "Made-to-order"],
  },
  {
    slug: "pastel-rose-reception-gown",
    name: "Pastel Rose Reception Gown",
    categorySlug: "bridal-wear",
    description:
      "A flowing reception gown in soft rose tones with delicate sequin work for a lighter, romantic look.",
    highlights: ["Flowing silhouette", "Hand sequin detailing", "Lightweight lining", "Sizes to order"],
  },
  {
    slug: "banarasi-silk-saree-set",
    name: "Banarasi Silk Saree Set",
    categorySlug: "bridal-wear",
    description:
      "A traditional Banarasi silk saree with matching blouse, woven with intricate gold motifs.",
    highlights: ["Pure Banarasi silk", "Woven gold motifs", "Matching blouse piece", "Traditional draping guide"],
  },

  // Groom Wear
  {
    slug: "ivory-silk-sherwani",
    name: "Ivory Silk Sherwani",
    categorySlug: "groom-wear",
    description:
      "A regal ivory sherwani in raw silk with subtle thread work, paired with a matching stole.",
    highlights: ["Raw silk fabric", "Subtle thread embroidery", "Matching stole included", "Tailored fit"],
  },
  {
    slug: "classic-bandhgala-suit",
    name: "Classic Bandhgala Suit",
    categorySlug: "groom-wear",
    description:
      "A sharply tailored bandhgala suit for the sangeet or reception, available in several rich tones.",
    highlights: ["Structured tailoring", "Multiple colorways", "Pocket square included", "Alterations available"],
  },
  {
    slug: "indo-western-nehru-jacket-set",
    name: "Indo-Western Nehru Jacket Set",
    categorySlug: "groom-wear",
    description:
      "A modern Nehru jacket set that blends Indian tailoring with a contemporary silhouette.",
    highlights: ["Contemporary fit", "Mix-and-match separates", "Lightweight fabric", "Ideal for daytime events"],
  },

  // Jewelry
  {
    slug: "kundan-bridal-necklace-set",
    name: "Kundan Bridal Necklace Set",
    categorySlug: "jewelry",
    description:
      "A statement kundan necklace with matching earrings and maang tikka, set in antique gold finish.",
    highlights: ["Antique gold finish", "Matching earrings & tikka", "Adjustable back chain", "Presented in a keepsake box"],
  },
  {
    slug: "polki-choker-and-earrings",
    name: "Polki Choker & Earrings",
    categorySlug: "jewelry",
    description:
      "An uncut-diamond-style polki choker paired with matching earrings for a refined ceremony look.",
    highlights: ["Polki-style stones", "Lightweight setting", "Matching earring set", "Rhodium-safe finish"],
  },
  {
    slug: "temple-jewelry-maang-tikka-set",
    name: "Temple Jewelry Maang Tikka Set",
    categorySlug: "jewelry",
    description:
      "A temple-inspired maang tikka and earring set drawing on traditional South Indian motifs.",
    highlights: ["Temple-motif design", "Earring & tikka combo", "Adjustable fitting", "Gift-ready packaging"],
  },

  // Decor & Florals
  {
    slug: "floral-mandap-setup",
    name: "Floral Mandap Setup",
    categorySlug: "decor-florals",
    description:
      "A full mandap installation dressed in fresh florals, drapes, and layered lighting.",
    highlights: ["Fresh floral installation", "Custom drape colors", "Layered ambient lighting", "On-site setup team"],
  },
  {
    slug: "fairy-light-mehendi-decor",
    name: "Fairy-Light Mehendi Decor",
    categorySlug: "decor-florals",
    description:
      "A warm, string-lit setup with floor seating and floral swings for a relaxed mehendi function.",
    highlights: ["String light canopy", "Floral swing seating", "Themed cushions & rugs", "Photo-corner styling"],
  },
  {
    slug: "rose-and-marigold-stage-backdrop",
    name: "Rose & Marigold Stage Backdrop",
    categorySlug: "decor-florals",
    description:
      "A vivid stage backdrop combining roses and marigolds for a festive, color-rich ceremony.",
    highlights: ["Rose & marigold mix", "Custom stage sizing", "Modular for any venue", "Same-day teardown"],
  },

  // Catering
  {
    slug: "royal-multi-cuisine-wedding-menu",
    name: "Royal Multi-Cuisine Wedding Menu",
    categorySlug: "catering",
    description:
      "A curated multi-cuisine menu spanning regional Indian, continental, and Asian counters.",
    highlights: ["Multi-cuisine counters", "Tasting session included", "Dietary customization", "Staffed live stations"],
  },
  {
    slug: "live-chaat-and-counters-package",
    name: "Live Chaat & Counters Package",
    categorySlug: "catering",
    description:
      "Interactive street-food-style counters serving chaat, rolls, and regional snacks fresh to guests.",
    highlights: ["Live cooking stations", "Regional street-food menu", "Interactive guest experience", "Flexible headcount"],
  },
  {
    slug: "dessert-and-mocktail-station",
    name: "Dessert & Mocktail Station",
    categorySlug: "catering",
    description:
      "A dedicated dessert bar and mocktail counter to close out the evening on a sweet note.",
    highlights: ["Curated dessert spread", "Signature mocktail menu", "Customizable branding", "Add-on to any package"],
  },

  // Photography
  {
    slug: "candid-wedding-photography-package",
    name: "Candid Wedding Photography Package",
    categorySlug: "photography",
    description:
      "Full-day candid coverage across ceremonies, with a same-week highlights preview.",
    highlights: ["Full-day coverage", "Two-photographer team", "Same-week preview gallery", "Printed album option"],
  },
  {
    slug: "cinematic-wedding-film",
    name: "Cinematic Wedding Film",
    categorySlug: "photography",
    description:
      "A cinematic highlight film with color grading and sound design built around your story.",
    highlights: ["4K cinematic capture", "Custom sound design", "3–5 minute highlight film", "Drone coverage available"],
  },
  {
    slug: "pre-wedding-shoot-package",
    name: "Pre-Wedding Shoot Package",
    categorySlug: "photography",
    description:
      "A styled pre-wedding shoot across two locations, edited into a shareable teaser reel.",
    highlights: ["Two locations included", "Styling consultation", "Teaser reel for social media", "Full edited gallery"],
  },

  // Gifts & Favors
  {
    slug: "personalized-wedding-hampers",
    name: "Personalized Wedding Hampers",
    categorySlug: "gifts-favors",
    description:
      "Custom-branded hampers with sweets, dry fruits, and keepsakes for close family and guests.",
    highlights: ["Custom branding", "Mix of sweets & keepsakes", "Bulk order friendly", "Elegant packaging"],
  },
  {
    slug: "dry-fruit-gift-boxes",
    name: "Dry Fruit Gift Boxes",
    categorySlug: "gifts-favors",
    description:
      "Premium dry fruit assortments boxed in wedding-themed packaging for guests and vendors.",
    highlights: ["Premium assortment", "Wedding-themed packaging", "Bulk pricing available", "Custom tags"],
  },
  {
    slug: "return-gift-trousseau-packing",
    name: "Return Gift Trousseau Packing",
    categorySlug: "gifts-favors",
    description:
      "End-to-end trousseau and return-gift packing service, styled to match your wedding palette.",
    highlights: ["Full packing service", "Palette-matched styling", "On-site or off-site setup", "Guest-count flexible"],
  },

  // Venues
  {
    slug: "heritage-palace-banquet",
    name: "Heritage Palace Banquet",
    categorySlug: "venues",
    description:
      "A restored heritage property with courtyards and banquet halls for a grand, traditional celebration.",
    highlights: ["Indoor & outdoor spaces", "In-house catering option", "Guest accommodation on-site", "Up to 1000 guests"],
  },
  {
    slug: "beachside-resort-venue",
    name: "Beachside Resort Venue",
    categorySlug: "venues",
    description:
      "An oceanfront resort venue for destination weddings, with lawns and a private beach deck.",
    highlights: ["Private beach access", "Resort accommodation", "Sunset ceremony deck", "Destination wedding packages"],
  },
  {
    slug: "rooftop-garden-venue",
    name: "Rooftop Garden Venue",
    categorySlug: "venues",
    description:
      "An open-air rooftop garden with skyline views, ideal for intimate sangeet or reception nights.",
    highlights: ["Skyline views", "Open-air garden setting", "Ideal for intimate guest lists", "In-house lighting rig"],
  },

  // Cosmetics & Beauty — priced, cart-enabled products (unlike the
  // enquire-only categories above), demonstrating MRP/discount pricing.
  {
    slug: "bridal-glow-skincare-kit",
    name: "Bridal Glow Skincare Kit",
    categorySlug: "cosmetics",
    badge: "Bestseller",
    mrpRupees: 2999,
    priceRupees: 2199,
    description:
      "A 5-step pre-wedding skincare routine — cleanser, exfoliant, brightening serum, moisturizer, and sheet masks — built for the weeks before the big day.",
    highlights: [
      "5-step routine for 2–4 weeks of prep",
      "Brightening vitamin C serum",
      "6 hydrating sheet masks included",
      "Dermatologically tested",
    ],
  },
  {
    slug: "long-wear-matte-lipstick",
    name: "Long-Wear Matte Lipstick",
    categorySlug: "cosmetics",
    mrpRupees: 899,
    priceRupees: 699,
    description: "A transfer-proof matte lipstick in a rich bridal red, built to last through the pheras.",
    highlights: ["12-hour wear", "Transfer-proof matte finish", "Bridal red shade", "Enriched with vitamin E"],
  },
  {
    slug: "hd-foundation-ivory-beige",
    name: "HD Foundation — Ivory Beige",
    categorySlug: "cosmetics",
    mrpRupees: 1499,
    priceRupees: 1199,
    description: "A lightweight, camera-ready foundation with buildable, natural coverage for every ceremony.",
    highlights: ["HD camera-ready finish", "Buildable coverage", "Lightweight, non-cakey formula", "Ivory Beige shade"],
  },
  {
    slug: "kajal-kohl-duo-pack",
    name: "Kajal & Kohl Duo Pack",
    categorySlug: "cosmetics",
    mrpRupees: 599,
    priceRupees: 449,
    description: "A smudge-proof kajal and kohl duo for definition that survives happy tears.",
    highlights: ["Smudge-proof, waterproof formula", "Intense black pigment", "Duo pack (kajal + kohl)", "Easy glide, no tugging"],
  },
  {
    slug: "bridal-makeup-brush-set",
    name: "Bridal Makeup Brush Set",
    categorySlug: "cosmetics",
    badge: "New",
    mrpRupees: 1999,
    priceRupees: 1499,
    description: "A 12-piece professional brush set for a flawless application, gift-boxed and ready to travel.",
    highlights: ["12 professional brushes", "Soft, cruelty-free bristles", "Travel pouch included", "Gift-ready packaging"],
  },
  {
    slug: "herbal-ubtan-face-pack",
    name: "Herbal Ubtan Face Pack",
    categorySlug: "cosmetics",
    mrpRupees: 799,
    priceRupees: 599,
    description: "A traditional turmeric-and-sandalwood ubtan for the haldi glow that lasts well past the ceremony.",
    highlights: ["Turmeric & sandalwood blend", "For pre-wedding glow rituals", "Suitable for all skin types", "100g jar"],
  },
];

export const products: Product[] = raw.map(({ imageKey, images, ...p }) => {
  if (images && images.length > 0) {
    return { ...p, image: images[0], gallery: images };
  }
  const [a, b] = productImages(imageKey ?? p.categorySlug);
  return { ...p, image: a, gallery: [a, b] };
});

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((p) => p.categorySlug === categorySlug);
}
