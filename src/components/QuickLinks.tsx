import type { ReactNode } from "react";

type QuickLink = {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
  linkLabel: string;
};

const LINKS: QuickLink[] = [
  {
    href: "#updates",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8 A6 6 0 0 0 6 8 C6 15 3 17 3 17 H21 S18 15 18 8" />
        <path d="M13.7 21 A2 2 0 0 1 10.3 21" />
      </svg>
    ),
    title: "নোটিশ",
    description: "ট্রাস্টের গুরুত্বপূর্ণ ঘোষণা, বিজ্ঞপ্তি ও সর্বশেষ আপডেট দেখুন।",
    linkLabel: "সকল নোটিশ দেখুন",
  },
  {
    href: "#care",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2 V6 M8 2 V6 M3 10 H21" />
        <path d="M8 14 H8.01 M12 14 H12.01 M16 14 H16.01 M8 18 H8.01 M12 18 H12.01 M16 18 H16.01" />
      </svg>
    ),
    title: "প্রোগ্রাম",
    description: "দিশারী ট্রাস্টের বিভিন্ন কার্যক্রম ও আয়োজন সম্পর্কে জানুন।",
    linkLabel: "সকল প্রোগ্রাম দেখুন",
  },
  {
    href: "#admission",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path d="M16 4 H18 A2 2 0 0 1 20 6 V20 A2 2 0 0 1 18 22 H6 A2 2 0 0 1 4 20 V6 A2 2 0 0 1 6 4 H8" />
        <path d="M12 11 H16 M12 16 H16 M8 11 H8.01 M8 16 H8.01" />
      </svg>
    ),
    title: "ভর্তি",
    description: "ভর্তির যোগ্যতা ও আবেদন সংক্রান্ত প্রয়োজনীয় তথ্য জানুন।",
    linkLabel: "ভর্তি সম্পর্কে জানুন",
  },
];

export default function QuickLinks() {
  return (
    <section lang="bn" aria-labelledby="quick-links-title" className="bg-ivory py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-2xl">
          <span className="block h-1 w-12 rounded-full bg-gold" aria-hidden="true" />
          <h2 id="quick-links-title" className="mt-4 text-3xl font-bold leading-snug text-forest sm:text-4xl">
            এক নজরে দেখে নিন
          </h2>
          <p className="mt-3 text-base leading-relaxed text-dim sm:text-lg">
            দিশারী ট্রাস্টের গুরুত্বপূর্ণ তথ্য, কার্যক্রম ও ভর্তি সংক্রান্ত আপডেট এক জায়গায়।
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group flex h-full flex-col rounded-2xl border border-forest/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mist text-dish ring-1 ring-inset ring-gold/25 transition-colors duration-300 group-hover:bg-forest group-hover:text-champ motion-reduce:transition-none">
                  {link.icon}
                </span>
                <h3 className="mt-5 text-xl font-bold text-forest">{link.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-dim">{link.description}</p>
                <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-dish">
                  {link.linkLabel}
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12 H19" />
                    <path d="M13 6 L19 12 L13 18" />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
