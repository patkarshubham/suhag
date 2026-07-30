"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import type { Category } from "@/lib/categories";
import { cn, whatsappLink } from "@/lib/utils";

export default function ContactForm({ categories }: { categories: Category[] }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function toggleCategory(name: string) {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const lines = [
      `Hi Suhag! I'd like to plan my wedding.`,
      `Name: ${name}`,
      `Contact: ${contact}`,
      weddingDate ? `Wedding date: ${weddingDate}` : null,
      selected.length ? `Interested in: ${selected.join(", ")}` : null,
      message ? `Message: ${message}` : null,
    ].filter(Boolean);

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-3 rounded-2xl bg-ivory-deep p-10 text-center"
      >
        <CheckCircle2 className="text-maroon" size={36} />
        <h3 className="font-display text-2xl text-charcoal">Thanks, {name || "there"}!</h3>
        <p className="max-w-sm text-sm text-charcoal-soft">
          We&apos;ve opened WhatsApp with your details prefilled — just hit send
          and our team will get back to you shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
          Your name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
            placeholder="Ananya Sharma"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
          Phone or email
          <input
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
            placeholder="+91 98765 43210"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
        Wedding date (if decided)
        <input
          type="date"
          value={weddingDate}
          onChange={(e) => setWeddingDate(e.target.value)}
          className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon sm:w-1/2"
        />
      </label>

      <div>
        <span className="text-sm font-medium text-charcoal">Interested in</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = selected.includes(c.name);
            return (
              <button
                type="button"
                key={c.slug}
                onClick={() => toggleCategory(c.name)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-medium transition-colors",
                  active
                    ? "border-maroon bg-maroon text-ivory"
                    : "border-charcoal/15 text-charcoal-soft hover:border-maroon/50"
                )}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
        Tell us about your wedding
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="resize-none rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
          placeholder="Guest count, city, budget range, or anything else that helps us curate the right vendors."
        />
      </label>

      <motion.button
        type="submit"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-2 rounded-full bg-maroon px-7 py-3 text-sm font-medium text-ivory transition-colors hover:bg-maroon-deep"
      >
        Send Enquiry
        <Send size={16} />
      </motion.button>
    </form>
  );
}
