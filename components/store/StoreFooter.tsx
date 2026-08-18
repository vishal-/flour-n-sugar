import Link from "next/link";
import { NotoIcon } from "@/components/ui/NotoIcon";
import { MatIcon } from "@/components/ui/MatIcon";
import cupcake from "@iconify-icons/noto/cupcake";
import sparkles from "@iconify-icons/noto/sparkles";
import roundPushpin from "@iconify-icons/noto/round-pushpin";
import houseWithGarden from "@iconify-icons/noto/house-with-garden";
import chatBubbleOutlineRounded from "@iconify-icons/material-symbols/chat-bubble-outline-rounded";
import callOutlineRounded from "@iconify-icons/material-symbols/call-outline-rounded";
import mailOutlineRounded from "@iconify-icons/material-symbols/mail-outline-rounded";

interface StoreFooterProps {
  store: {
    name: string;
    slug: string;
    description?: string | null;
    city?: string | null;
    state?: string | null;
    address?: string | null;
    isHomeBaker: boolean;
    leadTimeHours?: number | null;
    deliveryRadiusKm?: number | null;
    phone?: string | null;
    contactEmail?: string | null;
    whatsapp?: string | null;
    instagram?: string | null;
    facebook?: string | null;
    website?: string | null;
  };
}

export function StoreFooter({ store }: StoreFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-rose-100 dark:border-rose-950/50 bg-white dark:bg-[#241714] text-dark-brown dark:text-rose-100 transition-colors">
      {/* Top Store Info Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Column 1: Store Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-primary-light dark:bg-rose-950/60 flex items-center justify-center text-primary">
                <NotoIcon icon={cupcake} size={18} />
              </span>
              <span className="font-serif text-xl font-bold text-dark-brown dark:text-rose-50">
                {store.name}
              </span>
            </div>
            <p className="text-xs text-dark-brown/70 dark:text-rose-200/70 leading-relaxed max-w-sm">
              {store.description ||
                `Fresh artisanal baked goods, designer cakes, and custom dessert pre-orders prepared with premium ingredients.`}
            </p>

            {/* Social & Contact Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {store.whatsapp && (
                <a
                  href={`https://wa.me/${store.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 text-[11px] font-bold flex items-center gap-1.5 transition"
                >
                  <MatIcon icon={chatBubbleOutlineRounded} size={14} />
                  <span>WhatsApp</span>
                </a>
              )}
              {store.phone && (
                <a
                  href={`tel:${store.phone}`}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-primary hover:bg-rose-100 text-[11px] font-bold flex items-center gap-1.5 transition"
                >
                  <MatIcon icon={callOutlineRounded} size={14} />
                  <span>Call</span>
                </a>
              )}
              {store.contactEmail && (
                <a
                  href={`mailto:${store.contactEmail}`}
                  className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-rose-950/30 text-dark-brown/80 dark:text-rose-200 hover:bg-stone-200 text-[11px] font-bold flex items-center gap-1.5 transition"
                >
                  <MatIcon icon={mailOutlineRounded} size={14} />
                  <span>Email</span>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Order & Operations Policy */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif text-sm font-bold text-dark-brown dark:text-rose-50">
              Kitchen & Ordering Policy
            </h4>
            <ul className="space-y-2.5 text-dark-brown/70 dark:text-rose-200/70">
              <li className="flex items-start gap-2">
                <NotoIcon icon={sparkles} size={16} className="mt-0.5" />
                <span>
                  <strong>Advance Notice:</strong> Please allow at least{" "}
                  <strong className="text-dark-brown dark:text-rose-100">
                    {store.leadTimeHours || 24} hours notice
                  </strong>{" "}
                  for custom preparation.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <NotoIcon icon={roundPushpin} size={16} className="mt-0.5" />
                <span>
                  <strong>Coverage:</strong> Hand-delivered within a{" "}
                  <strong className="text-dark-brown dark:text-rose-100">
                    {store.deliveryRadiusKm || 10} km radius
                  </strong>{" "}
                  of {store.city || "the kitchen area"}.
                </span>
              </li>
              {store.isHomeBaker && (
                <li className="flex items-start gap-2">
                  <NotoIcon icon={houseWithGarden} size={16} className="mt-0.5" />
                  <span>
                    <strong>Home Kitchen:</strong> This bakery operates from a private kitchen. Exact pickup instructions are shared upon order confirmation.
                  </span>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Platform Promotion */}
          <div className="p-5 rounded-3xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/30 space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
              <NotoIcon icon={cupcake} size={16} />
              <span>Flour n Sugar Network</span>
            </div>
            <p className="text-xs text-dark-brown/70 dark:text-rose-200/70 leading-relaxed">
              Are you a home baker or pastry artist? Create your own verified online store in under 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <Link
                href="/onboarding"
                className="inline-block text-center py-2 px-3.5 rounded-xl bg-dark-brown dark:bg-rose-100 text-white dark:text-dark-brown text-[11px] font-bold shadow-xs hover:opacity-90 transition"
              >
                Join as a Baker →
              </Link>
              <Link
                href="/home"
                className="inline-block text-center py-2 px-3.5 rounded-xl bg-white dark:bg-[#33221e] text-dark-brown dark:text-rose-100 text-[11px] font-bold border border-rose-100/80 hover:bg-rose-50 transition"
              >
                Explore More Bakers
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Legal Links */}
      <div className="border-t border-rose-100/60 dark:border-rose-950/40 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-dark-brown/50 dark:text-rose-200/50">
          <p>
            © {currentYear} {store.name}. Powered by{" "}
            <Link href="/home" className="text-primary font-bold hover:underline">
              Flour n Sugar
            </Link>
            .
          </p>
          <div className="flex items-center gap-4 font-medium">
            <Link href="/about" className="hover:text-primary transition">
              About Platform
            </Link>
            <Link href="/privacy" className="hover:text-primary transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
