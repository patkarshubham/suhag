"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn, whatsappLink } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-ivory/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(43,36,32,0.08)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/" className="font-display text-2xl tracking-wide text-charcoal">
          Suhag
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide text-charcoal-soft transition-colors hover:text-maroon",
                pathname === link.href && "text-maroon"
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappLink("Hi Suhag! I'd like to know more about your wedding services.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-maroon px-5 py-2 text-sm font-medium text-ivory transition-colors hover:bg-maroon-deep"
          >
            Enquire Now
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="text-charcoal md:hidden"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-charcoal/10 bg-ivory md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base font-medium text-charcoal-soft hover:bg-blush/40",
                    pathname === link.href && "text-maroon"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={whatsappLink("Hi Suhag! I'd like to know more about your wedding services.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-maroon px-5 py-3 text-center text-sm font-medium text-ivory"
              >
                Enquire Now
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
