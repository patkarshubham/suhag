import { ArrowRight, Quote } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import RevealText from "@/components/motion/RevealText";
import ParallaxImage from "@/components/motion/ParallaxImage";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import SectionHeading from "@/components/SectionHeading";
import AnimatedButton from "@/components/AnimatedButton";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/data/categories";
import { getProduct } from "@/data/products";

const featuredSlugs = [
  "royal-gold-foil-invitation-set",
  "regal-red-bridal-lehenga",
  "ivory-silk-sherwani",
  "kundan-bridal-necklace-set",
  "floral-mandap-setup",
  "candid-wedding-photography-package",
  "personalized-wedding-hampers",
  "heritage-palace-banquet",
];

const stats = [
  { value: 500, suffix: "+", label: "Weddings styled" },
  { value: 10, suffix: "", label: "Curated categories" },
  { value: 1000, suffix: "+", label: "Trusted vendors" },
  { value: 50, suffix: "+", label: "Cities covered" },
];

const ritualKitSlugs = [
  "complete-wedding-pooja-kit",
  "core-wedding-ritual-kit",
  "havan-essentials-kit",
  "haldi-ceremony-kit",
];

const testimonials = [
  {
    quote:
      "Suhag handled our invitations, decor, and catering under one roof. It removed 90% of the vendor chasing.",
    name: "Ananya & Rohit",
    role: "Married in Udaipur",
  },
  {
    quote:
      "We found our photographer and jewelry vendor in the same afternoon. The whole planning process felt effortless.",
    name: "Meera & Karthik",
    role: "Married in Goa",
  },
  {
    quote:
      "The decor team understood our theme instantly from the mood board we shared. Everything matched perfectly on the day.",
    name: "Priya & Arjun",
    role: "Married in Jaipur",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <ParallaxImage
          src="/images/categories/decor-florals.svg"
          alt=""
          className="absolute inset-0"
          strength={40}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/55 to-ivory" />

        <div className="relative mx-auto max-w-7xl px-6 py-32 sm:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-light">
            Every wedding essential, one place
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight text-ivory sm:text-6xl md:text-7xl">
            <RevealText text="Plan your wedding without the chaos" />
          </h1>
          <FadeIn delay={0.5} className="mt-6 max-w-xl">
            <p className="text-base text-ivory/85 sm:text-lg">
              Invitations, bridal &amp; groom wear, jewelry, decor, catering,
              photography, gifts, and venues — Suhag curates every category
              so you plan once, not nine times over.
            </p>
          </FadeIn>
          <FadeIn delay={0.7} className="mt-9 flex flex-wrap gap-4">
            <AnimatedButton href="/categories">
              Explore Categories
              <ArrowRight size={16} />
            </AnimatedButton>
            <AnimatedButton href="/contact" variant="secondary" className="!border-ivory/40 !text-ivory">
              Talk to Us
            </AnimatedButton>
          </FadeIn>
        </div>
      </section>

      {/* Ritual kits — bundled combo packs */}
      <section className="bg-maroon py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Skip the running around"
            title="Ritual kits, bundled and ready"
            subtitle="Every ceremony's samagri, pre-packed into one order — kalash to kumkum, havan to haldi."
            className="[&_h2]:text-ivory [&_p]:text-ivory/80"
          />
          <StaggerContainer className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {ritualKitSlugs.map((slug) => {
              const kit = getProduct(slug);
              if (!kit) return null;
              return (
                <StaggerItem key={slug}>
                  <ProductCard product={kit} />
                </StaggerItem>
              );
            })}
          </StaggerContainer>
          <FadeIn delay={0.2} className="mt-14 flex justify-center">
            <AnimatedButton href="/categories/pooja-samagri" className="!bg-ivory !text-maroon hover:!bg-ivory-deep">
              View All Ritual Kits
              <ArrowRight size={16} />
            </AnimatedButton>
          </FadeIn>
        </div>
      </section>

      {/* Category showcase */}
      <section id="categories" className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <SectionHeading
          eyebrow="What we cover"
          title="Ten categories, one curated catalog"
          subtitle="Every vendor and product is grouped by what your wedding actually needs — browse a category, shortlist what fits, and enquire directly."
        />
        <StaggerContainer className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <StaggerItem key={category.slug}>
              <CategoryCard category={category} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Featured products */}
      <section className="bg-ivory-deep py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Handpicked for you"
            title="Featured across the catalog"
            subtitle="A glimpse of what's inside each category — real vendor listings replace these as your catalog grows."
          />
          <StaggerContainer className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {featuredSlugs.map((slug) => {
              const product = getProduct(slug);
              if (!product) return null;
              return (
                <StaggerItem key={slug}>
                  <ProductCard product={product} />
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <StaggerContainer className="grid grid-cols-2 gap-8 rounded-3xl bg-maroon px-8 py-14 text-center sm:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="font-display text-4xl text-ivory sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm text-ivory/75">{stat.label}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Testimonials */}
      <section className="bg-ivory-deep py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <SectionHeading eyebrow="Real couples" title="Planned through Suhag" />
          <StaggerContainer className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <div className="flex h-full flex-col rounded-2xl bg-ivory p-7 shadow-sm shadow-charcoal/5">
                  <Quote className="text-gold" size={22} />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-charcoal-soft">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-5">
                    <p className="font-display text-lg text-charcoal">{t.name}</p>
                    <p className="text-xs uppercase tracking-wider text-gold">{t.role}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative overflow-hidden">
        <ParallaxImage
          src="/images/categories/venues.svg"
          alt=""
          className="absolute inset-0"
          strength={30}
        />
        <div className="absolute inset-0 bg-charcoal/75" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center sm:px-8">
          <h2 className="font-display text-3xl text-ivory sm:text-4xl">
            <RevealText text="Ready to start planning?" />
          </h2>
          <FadeIn delay={0.2} className="mt-5 max-w-xl">
            <p className="text-ivory/85">
              Tell us about your wedding and we&apos;ll connect you with the
              right vendors across every category, on your budget and timeline.
            </p>
          </FadeIn>
          <FadeIn delay={0.4} className="mt-8">
            <AnimatedButton href="/contact">
              Start Planning
              <ArrowRight size={16} />
            </AnimatedButton>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

export const dynamic = "force-static";
