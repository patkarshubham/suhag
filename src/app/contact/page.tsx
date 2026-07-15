import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Suhag about your wedding and get connected with the right vendors across pooja samagri kits, invitations, wear, jewelry, decor, catering, photography, gifts, and venues.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
      <SectionHeading
        eyebrow="Get in touch"
        title="Let's plan your wedding"
        subtitle="Share a few details and we'll route your enquiry to the right vendors across categories."
      />

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-5">
        <FadeIn className="lg:col-span-3">
          <ContactForm />
        </FadeIn>

        <FadeIn delay={0.15} className="lg:col-span-2">
          <div className="rounded-2xl bg-ivory-deep p-8">
            <h3 className="font-display text-xl text-charcoal">Reach us directly</h3>
            <ul className="mt-6 space-y-5 text-sm text-charcoal-soft">
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 text-maroon" />
                <span>+91 12345 67890</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 text-maroon" />
                <span>hello@suhag.example</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-maroon" />
                <span>Serving weddings across 50+ cities</span>
              </li>
            </ul>
            <p className="mt-8 text-xs leading-relaxed text-charcoal-soft">
              Submitting the form opens WhatsApp with your details prefilled —
              no account or sign-up needed.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
