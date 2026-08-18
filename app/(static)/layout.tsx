import Link from "next/link";
import type { ReactNode } from "react";

export default function StaticLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary-light selection:text-primary">
      {/* Header */}
      <header className="border-b border-rose-100/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/home" className="flex items-center gap-2" aria-label="Flour n Sugar home">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary" aria-hidden="true">
              <span className="text-lg">✦</span>
            </span>
            <span className="font-serif text-xl font-bold text-dark-brown">flour n sugar</span>
          </Link>
          <nav className="flex items-center gap-4 text-xs font-bold text-dark-brown/65 sm:gap-7" aria-label="Main navigation">
            <Link href="/home" className="transition hover:text-primary">Discover bakers</Link>
            <Link href="/about" className="text-primary">About us</Link>
            <Link href="/onboarding" className="rounded-xl bg-dark-brown px-4 py-2.5 text-white transition hover:bg-dark-brown-light">Join as a baker</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-rose-100/80 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 text-xs text-dark-brown/55 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>Made with love for local bakers and dessert lovers.</p>
          <div className="flex gap-5 font-bold">
            <Link href="/about" className="transition hover:text-primary">About</Link>
            <Link href="/privacy" className="transition hover:text-primary">Privacy</Link>
            <Link href="/terms" className="transition hover:text-primary">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
