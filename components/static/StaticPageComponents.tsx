import type { ReactNode } from "react";

export function StaticPageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="border-b border-rose-100/70 bg-primary-light/45">
      <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">{eyebrow}</p>
        <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight text-dark-brown sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-dark-brown/65">{intro}</p>
      </div>
    </section>
  );
}

export function ContentSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-rose-100/80 py-8 first:pt-0 last:border-b-0">
      <h2 className="font-serif text-2xl font-bold text-dark-brown">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-dark-brown/70">{children}</div>
    </section>
  );
}
