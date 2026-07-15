import Link from "next/link";
import { Globe, Share2, Mail, Phone } from "lucide-react";
import { categories } from "@/data/categories";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal/10 bg-ivory-deep">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="font-display text-2xl text-charcoal">Suhag</span>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-charcoal-soft">
            Every wedding essential, curated in one place — invitations, wear,
            jewelry, decor, catering, photography, gifts, and venues.
          </p>
          <div className="mt-5 flex gap-4 text-charcoal-soft">
            <a href="#" aria-label="Instagram" className="hover:text-maroon">
              <Globe size={20} />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-maroon">
              <Share2 size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal">
            Categories
          </h3>
          <ul className="mt-4 space-y-2">
            {categories.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categories/${c.slug}`}
                  className="text-sm text-charcoal-soft hover:text-maroon"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal">
            Get in touch
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-charcoal-soft">
            <li className="flex items-center gap-2">
              <Phone size={16} /> +91 12345 67890
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> hello@suhag.example
            </li>
          </ul>
          <Link
            href="/contact"
            className="mt-4 inline-block text-sm font-medium text-maroon hover:underline"
          >
            Plan your wedding &rarr;
          </Link>
        </div>
      </div>

      <div className="border-t border-charcoal/10 px-6 py-5 text-center text-xs text-charcoal-soft sm:px-8">
        © {year} Suhag. All rights reserved.
      </div>
    </footer>
  );
}
