import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

// name, slug, gradient stops, watermark glyph
const categories = [
  { slug: "pooja-samagri", label: "Pooja Samagri & Ritual Kits", from: "#e8873a", to: "#6e1e30", glyph: "⚭" },
  { slug: "invitations", label: "Invitations", from: "#f3e9db", to: "#e3b8ac", glyph: "✉" },
  { slug: "bridal-wear", label: "Bridal Wear", from: "#efd9d2", to: "#d9b98a", glyph: "♀" },
  { slug: "groom-wear", label: "Groom Wear", from: "#e3b8ac", to: "#b8925a", glyph: "♂" },
  { slug: "jewelry", label: "Jewelry", from: "#f3e9db", to: "#b8925a", glyph: "◆" },
  { slug: "decor-florals", label: "Decor & Florals", from: "#efd9d2", to: "#f3e9db", glyph: "✿" },
  { slug: "catering", label: "Catering", from: "#f3e9db", to: "#d9b98a", glyph: "❖" },
  { slug: "photography", label: "Photography & Films", from: "#e3b8ac", to: "#f3e9db", glyph: "◎" },
  { slug: "gifts-favors", label: "Gifts & Favors", from: "#d9b98a", to: "#efd9d2", glyph: "❀" },
  { slug: "venues", label: "Venues", from: "#b8925a", to: "#e3b8ac", glyph: "⌂" },
  { slug: "cosmetics", label: "Cosmetics & Beauty", from: "#efd9d2", to: "#e3b8ac", glyph: "❀" },
];

// Pooja samagri kits each get their own unique pair of images (rather than
// sharing the category image) so 15 combo packs don't look identical on
// the category listing page.
const poojaKits = [
  { slug: "complete-wedding-pooja-kit", from: "#e8873a", to: "#6e1e30", glyph: "✹" },
  { slug: "core-wedding-ritual-kit", from: "#d9b98a", to: "#6e1e30", glyph: "⚭" },
  { slug: "havan-essentials-kit", from: "#e8873a", to: "#d9a441", glyph: "❂" },
  { slug: "general-offering-samagri-kit", from: "#f3e9db", to: "#b8925a", glyph: "❁" },
  { slug: "diya-and-lighting-kit", from: "#d9a441", to: "#d9b98a", glyph: "☼" },
  { slug: "pooja-thali-organization-set", from: "#e3b8ac", to: "#b8925a", glyph: "◈" },
  { slug: "haldi-ceremony-kit", from: "#d9a441", to: "#e8873a", glyph: "❋" },
  { slug: "mehendi-ceremony-kit", from: "#efd9d2", to: "#d9a441", glyph: "✽" },
  { slug: "sangeet-reception-decor-kit", from: "#6e1e30", to: "#b8925a", glyph: "♪" },
  { slug: "bridal-adornment-kit", from: "#e3b8ac", to: "#efd9d2", glyph: "♡" },
  { slug: "groom-ceremonial-kit", from: "#6e1e30", to: "#e8873a", glyph: "♚" },
  { slug: "mandap-decor-kit", from: "#efd9d2", to: "#f3e9db", glyph: "✤" },
  { slug: "gifting-and-return-favor-kit", from: "#d9b98a", to: "#efd9d2", glyph: "▣" },
  { slug: "pre-wedding-ritual-kit", from: "#f3e9db", to: "#e3b8ac", glyph: "✦" },
  { slug: "bulk-utility-pack", from: "#b8925a", to: "#f3e9db", glyph: "▦" },
];

function svg({ width, height, from, to, glyph, angle = 135 }) {
  const id = `g-${Math.random().toString(36).slice(2, 8)}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="${id}" gradientTransform="rotate(${angle})">
      <stop offset="0%" stop-color="${from}" />
      <stop offset="100%" stop-color="${to}" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#${id})" />
  <circle cx="${width * 0.82}" cy="${height * 0.18}" r="${width * 0.12}" fill="#ffffff" opacity="0.10" />
  <circle cx="${width * 0.12}" cy="${height * 0.88}" r="${width * 0.18}" fill="#2b2420" opacity="0.05" />
  <text x="50%" y="54%" font-family="Georgia, 'Playfair Display', serif" font-size="${width * 0.22}" fill="#2b2420" opacity="0.16" text-anchor="middle" dominant-baseline="middle">${glyph}</text>
</svg>`;
}

mkdirSync(path.join(root, "public/images/categories"), { recursive: true });
mkdirSync(path.join(root, "public/images/products"), { recursive: true });

for (const c of categories) {
  writeFileSync(
    path.join(root, "public/images/categories", `${c.slug}.svg`),
    svg({ width: 1200, height: 800, from: c.from, to: c.to, glyph: c.glyph, angle: 135 })
  );
  // two product image variants per category, reused across placeholder products
  writeFileSync(
    path.join(root, "public/images/products", `${c.slug}-a.svg`),
    svg({ width: 900, height: 1100, from: c.from, to: c.to, glyph: c.glyph, angle: 115 })
  );
  writeFileSync(
    path.join(root, "public/images/products", `${c.slug}-b.svg`),
    svg({ width: 900, height: 1100, from: c.to, to: c.from, glyph: c.glyph, angle: 205 })
  );
}

for (const k of poojaKits) {
  writeFileSync(
    path.join(root, "public/images/products", `${k.slug}-a.svg`),
    svg({ width: 900, height: 1100, from: k.from, to: k.to, glyph: k.glyph, angle: 115 })
  );
  writeFileSync(
    path.join(root, "public/images/products", `${k.slug}-b.svg`),
    svg({ width: 900, height: 1100, from: k.to, to: k.from, glyph: k.glyph, angle: 205 })
  );
}

console.log(
  `Generated ${categories.length} category images, ${categories.length * 2} shared product images, and ${poojaKits.length * 2} unique pooja-kit images.`
);
