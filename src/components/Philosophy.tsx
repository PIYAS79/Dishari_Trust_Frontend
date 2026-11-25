"use client";

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";

function useInView(): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

const grow = (seen: boolean, x: number, y: number, delay: number): { className: string; style: CSSProperties } => ({
  className: "grow",
  style: {
    transformOrigin: `${x}px ${y}px`,
    transform: seen ? "scale(1)" : "scale(0)",
    transition: `transform 1.3s cubic-bezier(.2,.8,.2,1) ${delay}s`,
  },
});

function GrowthScene({ seen }: { seen: boolean }) {
  return (
    <svg
      viewBox="0 0 1000 300"
      className="mx-auto w-full max-h-[220px]"
      role="img"
      aria-label="Illustration: a sapling, a young plant and a full tree along a golden path that leads to a home under a rising light"
    >
      <path d="M0 262 C200 232 350 272 520 252 C700 232 820 264 1000 242 V300 H0Z" fill="#8DC63F" opacity=".3" />
      <path d="M0 288 C250 268 500 292 1000 272 V300 H0Z" fill="#0B5A2A" />
      <path
        className="drawn"
        pathLength={1}
        d="M20 280 C200 254 260 284 420 266 C560 250 640 280 780 262 C830 258 870 262 900 262"
        fill="none"
        stroke="#D9A520"
        strokeWidth={6}
        strokeLinecap="round"
        style={{ strokeDasharray: 1, strokeDashoffset: seen ? 0 : 1, transition: "stroke-dashoffset 2.6s ease-out" }}
      />
      <g {...grow(seen, 170, 264, 0.4)}>
        <path d="M170 264 V222" stroke="#A87912" strokeWidth={6} strokeLinecap="round" />
        <ellipse cx="154" cy="224" rx="17" ry="7" transform="rotate(-30 154 224)" fill="#8DC63F" />
        <ellipse cx="187" cy="222" rx="17" ry="7" transform="rotate(30 187 222)" fill="#2E8B3E" />
      </g>
      <g {...grow(seen, 470, 264, 1.2)}>
        <path d="M470 264 V172" stroke="#A87912" strokeWidth={10} strokeLinecap="round" />
        <ellipse cx="440" cy="206" rx="26" ry="11" transform="rotate(-30 440 206)" fill="#8DC63F" />
        <ellipse cx="500" cy="200" rx="26" ry="11" transform="rotate(30 500 200)" fill="#2E8B3E" />
        <ellipse cx="442" cy="176" rx="24" ry="10" transform="rotate(-35 442 176)" fill="#2E8B3E" />
        <ellipse cx="498" cy="170" rx="24" ry="10" transform="rotate(35 498 170)" fill="#8DC63F" />
        <ellipse cx="470" cy="156" rx="8" ry="16" fill="#D9A520" />
      </g>
      <g {...grow(seen, 720, 264, 2)}>
        <path d="M720 264 V120" stroke="#A87912" strokeWidth={16} strokeLinecap="round" />
        <circle cx="720" cy="96" r="50" fill="#2E8B3E" />
        <circle cx="684" cy="122" r="32" fill="#8DC63F" />
        <circle cx="760" cy="120" r="34" fill="#8DC63F" />
        <circle cx="726" cy="78" r="14" fill="#D9A520" />
      </g>
      <g {...grow(seen, 900, 262, 2.8)}>
        <path d="M846 238 L900 188 L954 238" fill="none" stroke="#0B5A2A" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M862 236 L900 202 L938 236" fill="none" stroke="#D9A520" strokeWidth={3} strokeLinecap="round" />
        <path d="M850 238 V264 M950 238 V264" stroke="#0B5A2A" strokeWidth={8} strokeLinecap="round" />
        <path d="M888 264 V242 a12 12 0 0 1 24 0 V264Z" fill="#D9A520" />
      </g>
      <g {...grow(seen, 900, 140, 3.2)}>
        <circle cx="900" cy="140" r="36" fill="#D9A520" opacity=".22" />
        <circle cx="900" cy="140" r="18" fill="#D9A520" />
      </g>
    </svg>
  );
}

const PILLARS = [
  ["A special child", "Care", "Daily support, safety and patience from people who understand them.", "border-sprout"],
  ["Growing up", "Dignity", "Respect for who they are and for what they can still become.", "border-leaf"],
  ["A special adult", "Belonging", "A home, a community and a place in the future.", "border-dish"],
] as const;

export default function Philosophy() {
  const [ref, seen] = useInView();
  return (
    <section id="about" className="bg-ivory py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.25fr]">
          <div>
            <svg viewBox="0 0 64 24" className="h-5 w-14" aria-hidden="true">
              <path d="M2 20 H62" stroke="#D9A520" strokeWidth={3} strokeLinecap="round" />
              <ellipse cx="22" cy="10" rx="9" ry="4" transform="rotate(-25 22 10)" fill="#8DC63F" />
              <ellipse cx="42" cy="10" rx="9" ry="4" transform="rotate(25 42 10)" fill="#2E8B3E" />
            </svg>
            <h2 className="mt-4 font-serif text-3xl leading-[1.1] text-forest sm:text-4xl">
              Beyond care, towards a lifetime of dignity
            </h2>
            <p className="mt-4 max-w-md text-lg text-ink">
              DISHARI is not only about providing a residence. It is about providing a future.
            </p>
            <div className="mt-4 flex max-w-md items-start gap-3 border-t border-forest/15 pt-4 text-dim">
              <svg viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0" aria-hidden="true">
                <path d="M3 11 L12 3 L21 11 M6 10 V20 H18 V10" fill="none" stroke="#0B5A2A" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p>Residential members are the Trust&apos;s first priority.</p>
            </div>
          </div>

          <figure className="relative overflow-hidden rounded-3xl bg-forest p-6 sm:p-8">
            <svg viewBox="0 0 300 300" className="absolute -right-12 -top-12 w-56" aria-hidden="true">
              <circle cx="150" cy="150" r="140" fill="#D9A520" opacity=".08" />
              <circle cx="150" cy="150" r="100" fill="#D9A520" opacity=".12" />
              <circle cx="150" cy="150" r="60" fill="#D9A520" opacity=".22" />
            </svg>
            <span aria-hidden="true" className="relative block h-10 font-serif text-7xl leading-none text-gold">“</span>
            <blockquote className="relative mt-1 font-serif text-2xl leading-snug text-ivory sm:text-3xl">
              Every special child grows into a special adult who still needs care, dignity and belonging.
            </blockquote>
            <span className="relative mt-6 block h-1 w-12 rounded bg-gold" />
          </figure>
        </div>

        <div ref={ref} className="mt-8 rounded-3xl bg-mist px-4 pb-6 pt-4 sm:px-6">
          <GrowthScene seen={seen} />
          <ol className="mt-4 grid gap-4 md:grid-cols-3">
            {PILLARS.map(([stage, word, line, border]) => (
              <li key={word} className={"rounded-2xl border-t-4 bg-ivory px-4 pb-4 pt-3 " + border}>
                <p className="text-xs text-dim">{stage}</p>
                <p className="font-serif text-xl text-forest">{word}</p>
                <p className="mt-1 text-sm text-dim">{line}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}