"use client";

import { useEffect, useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
};

type Category = {
  name: string;
  cover: string;
  images: GalleryImage[];
};

const CATEGORIES: Category[] = [
  {
    name: "Residential Life",
    cover: "https://picsum.photos/seed/residential-cover/800/600",
    images: [
      { src: "https://picsum.photos/seed/residential-1/1200/800", alt: "Residential life 1" },
      { src: "https://picsum.photos/seed/residential-2/1200/800", alt: "Residential life 2" },
      { src: "https://picsum.photos/seed/residential-3/1200/800", alt: "Residential life 3" },
      { src: "https://picsum.photos/seed/residential-4/1200/800", alt: "Residential life 4" },
    ],
  },
  {
    name: "Medical & Therapy",
    cover: "https://picsum.photos/seed/medical-cover/800/600",
    images: [
      { src: "https://picsum.photos/seed/medical-1/1200/800", alt: "Medical and therapy 1" },
      { src: "https://picsum.photos/seed/medical-2/1200/800", alt: "Medical and therapy 2" },
      { src: "https://picsum.photos/seed/medical-3/1200/800", alt: "Medical and therapy 3" },
      { src: "https://picsum.photos/seed/medical-4/1200/800", alt: "Medical and therapy 4" },
    ],
  },
  {
    name: "Vocational Training",
    cover: "https://picsum.photos/seed/vocational-cover/800/600",
    images: [
      { src: "https://picsum.photos/seed/vocational-1/1200/800", alt: "Vocational training 1" },
      { src: "https://picsum.photos/seed/vocational-2/1200/800", alt: "Vocational training 2" },
      { src: "https://picsum.photos/seed/vocational-3/1200/800", alt: "Vocational training 3" },
      { src: "https://picsum.photos/seed/vocational-4/1200/800", alt: "Vocational training 4" },
    ],
  },
  {
    name: "Day Care",
    cover: "https://picsum.photos/seed/daycare-cover/800/600",
    images: [
      { src: "https://picsum.photos/seed/daycare-1/1200/800", alt: "Day care 1" },
      { src: "https://picsum.photos/seed/daycare-2/1200/800", alt: "Day care 2" },
      { src: "https://picsum.photos/seed/daycare-3/1200/800", alt: "Day care 3" },
      { src: "https://picsum.photos/seed/daycare-4/1200/800", alt: "Day care 4" },
    ],
  },
  {
    name: "Facilities",
    cover: "https://picsum.photos/seed/facilities-cover/800/600",
    images: [
      { src: "https://picsum.photos/seed/facilities-1/1200/800", alt: "Facilities 1" },
      { src: "https://picsum.photos/seed/facilities-2/1200/800", alt: "Facilities 2" },
      { src: "https://picsum.photos/seed/facilities-3/1200/800", alt: "Facilities 3" },
      { src: "https://picsum.photos/seed/facilities-4/1200/800", alt: "Facilities 4" },
    ],
  },
  {
    name: "Community Events",
    cover: "https://picsum.photos/seed/community-cover/800/600",
    images: [
      { src: "https://picsum.photos/seed/community-1/1200/800", alt: "Community events 1" },
      { src: "https://picsum.photos/seed/community-2/1200/800", alt: "Community events 2" },
      { src: "https://picsum.photos/seed/community-3/1200/800", alt: "Community events 3" },
      { src: "https://picsum.photos/seed/community-4/1200/800", alt: "Community events 4" },
    ],
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!activeCategory) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveCategory(null);
      if (e.key === "ArrowRight")
        setIndex((i) => (i + 1) % activeCategory.images.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + activeCategory.images.length) % activeCategory.images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeCategory]);

  const open = (category: Category) => {
    setActiveCategory(category);
    setIndex(0);
  };

  const close = () => setActiveCategory(null);

  const next = () => {
    if (!activeCategory) return;
    setIndex((i) => (i + 1) % activeCategory.images.length);
  };

  const prev = () => {
    if (!activeCategory) return;
    setIndex((i) => (i - 1 + activeCategory.images.length) % activeCategory.images.length);
  };

  return (
    <section className="bg-ivory py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-dish">Gallery</p>
          <h2 className="mt-3 font-serif text-4xl text-forest sm:text-5xl">Moments from DISHARI</h2>
          <p className="mx-auto mt-4 max-w-2xl text-dim">
            A glimpse into daily life, care and community across the Trust.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <button
              key={category.name}
              type="button"
              onClick={() => open(category)}
              className="group relative overflow-hidden rounded-3xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            >
              <img
                src={category.cover}
                alt={category.name}
                loading="lazy"
                decoding="async"
                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-black/50 p-6 transition-opacity duration-300 group-hover:opacity-0">
                <span className="text-xl font-bold text-white drop-shadow-md">{category.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={activeCategory.name}
        >
          <div className="relative w-full max-w-5xl">
            <button
              type="button"
              onClick={close}
              className="absolute -top-12 right-0 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
            >
              Close ✕
            </button>

            <div className="relative overflow-hidden rounded-2xl bg-black">
              <img
                src={activeCategory.images[index].src}
                alt={activeCategory.images[index].alt}
                className="max-h-[75vh] w-full object-contain"
              />

              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white/20 px-3 py-2 text-white hover:bg-white/30"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white/20 px-3 py-2 text-white hover:bg-white/30"
              >
                ›
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {activeCategory.images.map((image, i) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={
                    "h-2.5 w-2.5 rounded-full transition-colors " +
                    (i === index ? "bg-white" : "bg-white/40 hover:bg-white/70")
                  }
                />
              ))}
            </div>

            <p className="mt-3 text-center text-sm text-white/80">{activeCategory.name}</p>
          </div>
        </div>
      )}
    </section>
  );
}
