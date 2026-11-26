"use client";

import { useEffect, useRef, useState } from "react";

export default function Identity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-ivory pb-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-5">
        <div
          ref={containerRef}
          className="relative aspect-video overflow-hidden rounded-3xl shadow-lg lg:col-span-3"
        >
          {visible ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/TXMki9cAuYE?autoplay=1&mute=1&loop=1&playlist=TXMki9cAuYE&controls=0&rel=0"
              title="DISHARI Trust identity video"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-forest text-ivory">
              Loading video…
            </div>
          )}
        </div>
        <div className="lg:col-span-2">
          <p className="text-sm font-medium uppercase tracking-widest text-dish">Welcome to DISHARI</p>
          <h2 className="mt-3 font-serif text-4xl text-forest sm:text-5xl">Our Identity</h2>
          <p className="mt-6 text-lg text-dim text-justify">
            DISHARI Trust is a home built on care, dignity and belonging. We stand beside adults with special needs from Bangladesh Army families, offering a permanent residence where therapy, medical support and practical training come together under one roof.
          </p>
          <p className="mt-4 text-dim text-justify">
            Our identity is rooted in service and compassion — creating a future beyond childhood, where every special adult is valued, supported and given the chance to thrive.
          </p>
          <a
            href="/about"
            className="mt-8 inline-block rounded bg-dish px-6 py-3 font-medium text-ivory transition-colors hover:bg-forest"
          >
            Read more
          </a>
        </div>
      </div>
    </section>
  );
}
