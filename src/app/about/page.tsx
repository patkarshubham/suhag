import type { Metadata } from "next";
import { ArrowRight, Heart, Quote, ShieldCheck, Sparkles } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import RevealText from "@/components/motion/RevealText";
import ParallaxImage from "@/components/motion/ParallaxImage";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import AnimatedRule from "@/components/motion/AnimatedRule";
import Marquee from "@/components/motion/Marquee";
import Magnetic from "@/components/motion/Magnetic";
import SpotlightCard from "@/components/motion/SpotlightCard";
import ScrollTimeline from "@/components/motion/ScrollTimeline";
import FloatingBloom from "@/components/motion/FloatingBloom";
import SectionHeading from "@/components/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import AnimatedButton from "@/components/AnimatedButton";
import { getCategories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "About",
  description:
    "Suhag brings every wedding category, from pooja samagri kits and invitations to wear, jewelry, decor, catering, photography, gifts, and venues, into one curated catalog.",
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
    body: "Enquire once and we route you to the right specialists across categories, no repeating your requirements nine times over.",
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

const storyStats = [
  { value: 11, suffix: "", label: "Categories" },
  { value: 1000, suffix: "+", label: "Vendors" },
  { value: 500, suffix: "+", label: "Weddings" },
];

export default async function AboutPage() {
  const categories = await getCategories();
  const marqueeItems = categories.map((c) => ({ href: `/categories/${c.slug}`, label: c.name }));

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden">
        <ParallaxImage
          src="/images/categories/bridal-wear.svg"
          alt=""
          className="absolute inset-0"
          strength={30}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/45 to-charcoal/10" />
        <FloatingBloom />
        <div className="relative mx-auto max-w-4xl px-6 pb-20 pt-24 text-center sm:px-8">
          <FadeIn y={12}>
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-light">
              Our story
            </span>
          </FadeIn>
          <h1 className="mt-5 font-display text-4xl text-ivory sm:text-5xl">
            <RevealText text="Everything a wedding needs, in one place" />
          </h1>
        </div>
      </section>

      {/* Manifesto */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center sm:px-8">
        <FadeIn>
          <p className="text-lg leading-relaxed text-charcoal-soft [&::first-letter]:float-left [&::first-letter]:mr-2 [&::first-letter]:font-display [&::first-letter]:text-6xl [&::first-letter]:leading-[0.8] [&::first-letter]:text-maroon">
            Suhag started from a simple frustration: planning a wedding
            means juggling a dozen vendors across a dozen categories, each
            with their own contact, their own catalog, their own back-and-forth.
            We bring pooja samagri kits, invitations, bridal &amp; groom wear,
            jewelry, decor, catering, photography, gifts, and venues into a
            single, curated catalog, so couples can browse once and plan
            with confidence.
          </p>
        </FadeIn>
        <FadeIn delay={0.15} className="mt-8 flex justify-center">
          <AnimatedRule className="w-24" />
        </FadeIn>
      </section>

      {/* Sticky story */}
      <section className="bg-ivory-deep py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:px-8 md:grid-cols-2 md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <ParallaxImage
              src="/images/categories/jewelry.svg"
              alt=""
              className="aspect-[4/5] rounded-3xl"
              strength={16}
            />
          </div>

          <div>
            <SectionHeading
              title="Built from one frustrating wedding season"
              align="left"
            />
            <div className="mt-6 space-y-5">
              <FadeIn>
                <p className="text-base leading-relaxed text-charcoal-soft">
                  It began with a single conversation about how disjointed
                  wedding planning had become: a spreadsheet of vendor
                  numbers, a dozen tabs of moodboards, and no single place
                  that understood the full shape of an Indian wedding.
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-base leading-relaxed text-charcoal-soft">
                  So we built one. Suhag groups every category, from pooja
                  samagri to the reception venue, into a single, curated
                  catalog, vetted the way you&apos;d vet a vendor yourself:
                  on craft, reliability, and fit for your specific day.
                </p>
              </FadeIn>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-charcoal/10 pt-8">
              {storyStats.map((stat, i) => (
                <FadeIn key={stat.label} delay={0.1 + i * 0.08}>
                  <div className="font-display text-3xl text-maroon sm:text-4xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-wider text-charcoal-soft">
                    {stat.label}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category marquee */}
      {marqueeItems.length > 0 && (
        <section className="border-y border-charcoal/10 py-8">
          <Marquee items={marqueeItems} />
        </section>
      )}

      {/* Values */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <SectionHeading title="What we stand for" />
        <StaggerContainer className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, title, body }, i) => (
            <StaggerItem key={title} className={i === 1 ? "md:mt-10" : undefined}>
              <SpotlightCard className="group h-full rounded-2xl">
                <div className="h-full rounded-2xl bg-ivory p-7 shadow-sm shadow-charcoal/5 transition-shadow duration-300 group-hover:shadow-md group-hover:shadow-maroon/10">
                  <div className="flex size-11 items-center justify-center rounded-full bg-blush text-maroon transition-transform duration-300 group-hover:scale-110">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-5 font-display text-xl text-charcoal">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{body}</p>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Journey timeline */}
      <section className="bg-ivory-deep py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <SectionHeading title="Three steps to your vendors" />
          <div className="mt-16">
            <ScrollTimeline steps={steps} />
          </div>
        </div>
      </section>

      {/* Philosophy quote */}
      <section className="relative overflow-hidden py-28">
        <Quote
          className="pointer-events-none absolute left-1/2 top-6 size-32 -translate-x-1/2 text-maroon/5 sm:size-44"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center sm:px-8">
          <FadeIn>
            <p className="pb-1 font-display text-3xl leading-snug text-charcoal italic sm:text-4xl md:text-5xl">
              &ldquo;Every wedding deserves a catalog as considered as the
              day itself.&rdquo;
            </p>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-8 flex justify-center">
            <AnimatedRule className="w-24" />
          </FadeIn>
          <FadeIn delay={0.25} className="mt-6">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              The Suhag Team
            </span>
          </FadeIn>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative overflow-hidden">
        <ParallaxImage
          src="/images/categories/gifts-favors.svg"
          alt=""
          className="absolute inset-0"
          strength={30}
        />
        <div className="absolute inset-0 bg-charcoal/75" />
        <FloatingBloom />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center sm:px-8">
          <h2 className="font-display text-3xl text-ivory sm:text-4xl">
            <RevealText text="Your next step is one click away" />
          </h2>
          <FadeIn delay={0.2} className="mt-5 max-w-xl">
            <p className="text-ivory/85">
              Browse the full catalog, shortlist what fits your day, and
              reach out whenever you&apos;re ready.
            </p>
          </FadeIn>
          <FadeIn delay={0.4} className="mt-9">
            <Magnetic>
              <AnimatedButton href="/categories">
                Explore the Catalog
                <ArrowRight size={16} />
              </AnimatedButton>
            </Magnetic>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
