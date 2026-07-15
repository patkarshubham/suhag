import type { Metadata } from "next";
import { Heart, ShieldCheck, Sparkles } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import RevealText from "@/components/motion/RevealText";
import ParallaxImage from "@/components/motion/ParallaxImage";
import SectionHeading from "@/components/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import AnimatedButton from "@/components/AnimatedButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "Suhag brings every wedding category — pooja samagri kits, invitations, wear, jewelry, decor, catering, photography, gifts, and venues — into one curated catalog.",
};

const values = [
  {
    icon: Sparkles,
    title: "Curated, not crowded",
    body: "Every vendor and product is hand-picked per category, so you're choosing between the best options, not scrolling through hundreds.",
  },
  {
    icon: ShieldCheck,
    title: "One point of contact",
    body: "Enquire once and we route you to the right specialists across categories — no repeating your requirements nine times over.",
  },
  {
    icon: Heart,
    title: "Built around your day",
    body: "From an intimate mehendi to a 1000-guest reception, the catalog adapts to your scale, city, and budget.",
  },
];

const steps = [
  { step: "01", title: "Browse categories", body: "Explore pooja samagri kits, invitations, wear, jewelry, decor, catering, photography, gifts, and venues." },
  { step: "02", title: "Shortlist favorites", body: "Open any product to see details, highlights, and full galleries." },
  { step: "03", title: "Enquire directly", body: "Reach out over WhatsApp or the contact form and we take it from there." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative flex min-h-[45vh] items-end overflow-hidden">
        <ParallaxImage
          src="/images/categories/bridal-wear.svg"
          alt=""
          className="absolute inset-0"
          strength={30}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-charcoal/10" />
        <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-32 text-center sm:px-8">
          <h1 className="font-display text-4xl text-ivory sm:text-5xl">
            <RevealText text="Everything a wedding needs, in one place" />
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center sm:px-8">
        <FadeIn>
          <p className="text-lg leading-relaxed text-charcoal-soft">
            Suhag started from a simple frustration: planning a wedding
            means juggling a dozen vendors across a dozen categories, each
            with their own contact, their own catalog, their own back-and-forth.
            We bring pooja samagri kits, invitations, bridal &amp; groom wear,
            jewelry, decor, catering, photography, gifts, and venues into a
            single, curated catalog — so couples can browse once and plan
            with confidence.
          </p>
        </FadeIn>
      </section>

      <section className="bg-ivory-deep py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <SectionHeading eyebrow="Why Suhag" title="What we stand for" />
          <StaggerContainer className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title}>
                <div className="h-full rounded-2xl bg-ivory p-7 shadow-sm shadow-charcoal/5">
                  <div className="flex size-11 items-center justify-center rounded-full bg-blush text-maroon">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-5 font-display text-xl text-charcoal">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <SectionHeading eyebrow="How it works" title="Three steps to your vendors" />
        <StaggerContainer className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <StaggerItem key={s.step}>
              <span className="font-display text-4xl text-gold">{s.step}</span>
              <h3 className="mt-3 font-display text-xl text-charcoal">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{s.body}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeIn delay={0.2} className="mt-14 flex justify-center">
          <AnimatedButton href="/categories">Start Browsing</AnimatedButton>
        </FadeIn>
      </section>
    </div>
  );
}
