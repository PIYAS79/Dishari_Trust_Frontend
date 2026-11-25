"use client";

import { useEffect, useState } from "react";

const FEEDBACK = [
  {
    img: "/assets/feedback/person-1.jpg",
    name: "Fatema Begum",
    role: "Guardian of a residential member",
    text: "DISHARI has given my son a real home. The staff treat him with respect and patience, and I finally feel at peace knowing he is safe and cared for.",
    rating: 5,
  },
  {
    img: "/assets/feedback/person-2.jpg",
    name: "Md. Karim Uddin",
    role: "Father of a resident",
    text: "The therapy and vocational training have changed our daughter's life. She is more confident, more independent, and genuinely happy.",
    rating: 5,
  },
  {
    img: "/assets/feedback/person-3.jpg",
    name: "Shirin Akter",
    role: "Mother of a day-care member",
    text: "A welcoming, dignified space. The team listens, supports and celebrates every small milestone with us.",
    rating: 5,
  },
  {
    img: "/assets/feedback/person-1.jpg",
    name: "Ayesha Rahman",
    role: "Guardian of a residential member",
    text: "The care and patience shown by the staff have made a real difference to our family. We feel truly supported.",
    rating: 5,
  },
  {
    img: "/assets/feedback/person-2.jpg",
    name: "Md. Shahin",
    role: "Father of a resident",
    text: "Seeing our son grow in confidence and independence has been wonderful. DISHARI feels like a second home.",
    rating: 5,
  },
  {
    img: "/assets/feedback/person-3.jpg",
    name: "Nasrin Akter",
    role: "Mother of a day-care member",
    text: "A warm and respectful environment where every small achievement is valued and celebrated.",
    rating: 5,
  },
];

export default function GuardianFeedback() {
  const count = FEEDBACK.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % count);
    }, 4000);
    return () => clearInterval(id);
  }, [paused, count]);

  const goNext = () => setActive((i) => (i + 1) % count);
  const goPrev = () => setActive((i) => (i - 1 + count) % count);

  return (
    <section className="bg-mist py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-dish">Testimonials</p>
          <h2 className="mt-3 font-serif text-4xl text-forest sm:text-5xl">Guardian Feedback</h2>
          <p className="mx-auto mt-4 max-w-2xl text-dim">
            Words from the families who trust DISHARI with their loved ones.
          </p>
        </div>

        <div
          className="mt-12 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              width: `${(count / 3) * 100}%`,
              transform: `translateX(${(1 - active) * (100 / count)}%)`,
            }}
          >
            {FEEDBACK.map((feedback, i) => {
              const isActive = i === active;
              const isSide =
                i === (active - 1 + count) % count ||
                i === (active + 1) % count;

              return (
                <div
                  key={i}
                  className="shrink-0 px-3 transition-all duration-500"
                  style={{
                    width: `${100 / count}%`,
                    transform: isActive ? "scale(1)" : isSide ? "scale(0.94)" : "scale(0.9)",
                    opacity: isActive ? 1 : isSide ? 0.72 : 0.4,
                    filter: isActive ? "none" : isSide ? "saturate(0.85)" : "saturate(0.7)",
                  }}
                >
                  <article className="relative rounded-3xl bg-ivory p-6 shadow-sm">
                    <div className="mb-4 flex gap-1 text-gold">
                      {Array.from({ length: feedback.rating }).map((_, star) => (
                        <span key={star}>★</span>
                      ))}
                    </div>
                    <p className="text-dim">&ldquo;{feedback.text}&rdquo;</p>
                    <div className="mt-6 flex items-center gap-4">
                      <img
                        src={feedback.img}
                        alt={feedback.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-forest">{feedback.name}</p>
                        <p className="text-sm text-dim">{feedback.role}</p>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-forest/20 bg-ivory text-forest transition-colors hover:bg-forest hover:text-ivory"
          >
            ‹
          </button>
          <div className="flex items-center gap-2">
            {FEEDBACK.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={
                  "h-2.5 w-2.5 rounded-full transition-colors " +
                  (i === active ? "bg-forest" : "bg-forest/30 hover:bg-forest/60")
                }
              />
            ))}
          </div>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-forest/20 bg-ivory text-forest transition-colors hover:bg-forest hover:text-ivory"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
