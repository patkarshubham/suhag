"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/utils";

export default function WhatsAppFAB() {
  return (
    <motion.a
      href={whatsappLink("Hi Suhag! I'd like to enquire about your wedding services.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-medium text-white shadow-lg shadow-black/20"
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline">Enquire Now</span>
    </motion.a>
  );
}
