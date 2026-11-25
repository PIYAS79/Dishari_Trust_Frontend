"use client";

import { useEffect, useState } from "react";

const NEWS = [
  {
    img: "/assets/services/Residential%20Care%20%26%20Accommodation.jpeg",
    title: "Education, care key to unlocking potential of children with special needs",
    date: "09 November 2026",
    text: "ZRF vice president Dr Zubaida Rahman stresses proper education, care and skills training to help children with special needs realise their potential, urging that no one is left behind for lack of opportunities.",
  },
  {
    img: "/assets/services/Day-Care%20%26%20Non-Residential%20Support.jpeg",
    title: "No daycare for children with special needs",
    date: "29 November 2023",
    text: "Parents of children with special needs call for specialised daycare facilities so their children get safe, supportive care while families pursue their livelihoods.",
  },
  {
    img: "/assets/services/Vocational%20Training%20%26%20Skill%20Development.jpeg",
    title: "Expanding future options for youth through vocational education",
    date: "12 October 2026",
    text: "Vocational training opens new pathways for young people, building practical skills, confidence and independence for a dignified future.",
  },
  {
    img: "/assets/services/Advanced%20Clinical%20%26%20Medical%20Care.jpeg",
    title: "New thinking challenges the stigma around therapy and care",
    date: "15 August 2026",
    text: "Medical and therapeutic support, delivered with empathy, can transform lives and help adults with special needs thrive in community.",
  },
  {
    img: "/assets/Banner_Wide.jpeg",
    title: "DISHARI Trust: building a home for a lifetime of dignity",
    date: "01 December 2026",
    text: "The Trust continues its mission to provide residential care, rehabilitation and belonging for adults with special needs from Bangladesh Army families.",
  },
];

export default function News() {
  const [visible, setVisible] = useState(3);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisible(1);
      else if (window.innerWidth < 1024) setVisible(2);
      else setVisible(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalSlides = Math.max(1, NEWS.length - visible + 1);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % totalSlides);
    }, 4500);
    return () => clearInterval(id);
  }, [totalSlides]);

  const prev = () => setIndex((i) => (i - 1 + totalSlides) % totalSlides);
  const next = () => setIndex((i) => (i + 1) % totalSlides);

  const cardWidth = 100 / visible;

  return (
    <section id="updates" className="bg-mist py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl text-forest sm:text-4xl">News &amp; Updates</h2>
            <p className="mt-2 max-w-xl text-dim">
              Stories, milestones and voices from the DISHARI community and beyond.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Previous news"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-forest/20 bg-ivory text-forest transition-colors hover:bg-forest hover:text-ivory"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next news"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-forest/20 bg-ivory text-forest transition-colors hover:bg-forest hover:text-ivory"
            >
              ›
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * cardWidth}%)` }}
          >
            {NEWS.map((n) => (
              <article
                key={n.title}
                className="px-3"
                style={{ flex: `0 0 ${cardWidth}%` }}
              >
                <div className="overflow-hidden rounded-2xl bg-ivory shadow-sm">
                  <img src={n.img} alt={n.title} className="h-48 w-full object-cover" />
                  <div className="p-5">
                    <time className="text-sm font-medium text-dish">{n.date}</time>
                    <h3 className="mt-2 font-serif text-xl text-forest">{n.title}</h3>
                    <p className="mt-2 text-sm text-dim">{n.text}</p>
                    <a href="#" className="mt-4 inline-block text-sm font-medium text-dish hover:underline">
                      Read more →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}