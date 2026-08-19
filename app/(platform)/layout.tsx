import Link from "next/link";
import type { ReactNode } from "react";
import { PRODUCT_CATEGORY_LIST } from "@/lib/categories";

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary-light selection:text-primary flex flex-col font-sans">
      {/* Platform Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-rose-100/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
          <Link href="/home" className="flex items-center gap-2.5 group" aria-label="Flour n Sugar home">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary transition-transform group-hover:scale-105" aria-hidden="true">
              <span className="text-lg">✦</span>
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-tight text-dark-brown">flour n sugar</span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-primary -mt-1 hidden sm:inline-block">Local Bakers Platform</span>
            </div>
          </Link>

          <nav className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-dark-brown/70" aria-label="Platform navigation">
            <Link href="/home" className="transition hover:text-primary">
              Discover Bakers
            </Link>
            <Link href="/treats/cakes" className="transition hover:text-primary text-primary">
              Treats
            </Link>
            <Link href="/about" className="transition hover:text-primary hidden md:inline-block">
              About
            </Link>
            <Link
              href="/onboarding"
              className="rounded-xl bg-dark-brown px-3.5 sm:px-4 py-2 text-xs font-bold text-white transition hover:bg-dark-brown-light shadow-xs"
            >
              Join as a Baker
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">{children}</main>

      {/* Platform Footer */}
      <footer className="border-t border-rose-100/80 bg-white mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-light text-primary text-sm font-bold">
                  ✦
                </span>
                <span className="font-serif text-lg font-bold text-dark-brown">flour n sugar</span>
              </div>
              <p className="text-xs sm:text-sm text-dark-brown/70 max-w-md leading-relaxed">
                Flour n Sugar connects artisan home bakers and boutique cake studios with dessert enthusiasts. Explore handcrafted celebration cakes, fresh sourdough, gourmet cookies, and sweet treats in your neighborhood.
              </p>
            </div>

            <div>
              <h4 className="font-serif text-sm font-bold text-dark-brown mb-3">Popular Categories</h4>
              <ul className="space-y-1.5 text-xs text-dark-brown/70">
                {PRODUCT_CATEGORY_LIST.slice(0, 5).map((cat) => (
                  <li key={cat.value}>
                    <Link href={`/treats/${cat.slug}`} className="hover:text-primary transition">
                      {cat.shortLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-sm font-bold text-dark-brown mb-3">Explore & Platform</h4>
              <ul className="space-y-1.5 text-xs text-dark-brown/70">
                <li>
                  <Link href="/home" className="hover:text-primary transition">
                    Find Local Bakers
                  </Link>
                </li>
                <li>
                  <Link href="/treats/cakes" className="hover:text-primary transition">
                    All Treats
                  </Link>
                </li>
                <li>
                  <Link href="/onboarding" className="hover:text-primary transition font-semibold text-primary">
                    Start Your Bakery Storefront
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary transition">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-rose-100/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-dark-brown/50">
            <p>© {new Date().getFullYear()} Flour n Sugar. Made with love for local bakers.</p>
            <div className="flex gap-4 font-medium">
              <Link href="/about" className="hover:text-primary transition">About</Link>
              <Link href="/privacy" className="hover:text-primary transition">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary transition">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
