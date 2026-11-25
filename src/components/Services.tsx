"use client";

import { useState } from "react";

type Service = {
  key: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

const SERVICES: Service[] = [
  {
    key: "residential",
    title: "Residential Care & Accommodation",
    description:
      "Providing a safe and supportive residential environment with comfortable accommodation, personal care, daily living assistance, catering, housekeeping, and long-term supervision.",
    image: "/assets/services/Residential%20Care%20%26%20Accommodation.jpeg",
    alt: "Residential accommodation and daily care at DISHARI Trust",
  },
  {
    key: "clinical",
    title: "Advanced Clinical & Medical Care",
    description:
      "Developing specialized medical and clinical facilities tailored to individual healthcare needs, including medical consultation, first aid, health monitoring, and appropriate clinical support.",
    image: "/assets/services/Advanced%20Clinical%20%26%20Medical%20Care.jpeg",
    alt: "Medical consultation and clinical care at DISHARI Trust",
  },
  {
    key: "therapy",
    title: "Specialized Therapeutic & Rehabilitation Services",
    description:
      "Providing individualized therapeutic support and rehabilitation activities to encourage functional development, confidence, participation, and greater independence in everyday life.",
    image: "/assets/services/Specialized%20Therapeutic%20%26%20Rehabilitation%20Services.jpeg",
    alt: "Therapeutic and rehabilitation support at DISHARI Trust",
  },
  {
    key: "vocational",
    title: "Vocational Training & Skill Development",
    description:
      "Creating opportunities to develop practical skills through cooking, bakery, basic digital learning, arts and crafts, and gardening, encouraging creativity and greater independence.",
    image: "/assets/services/Vocational%20Training%20%26%20Skill%20Development.jpeg",
    alt: "Vocational training and skill development at DISHARI Trust",
  },
  {
    key: "daycare",
    title: "Day-Care & Non-Residential Support",
    description:
      "Extending day-care, medical consultation, and therapeutic support to eligible non-residential members of Bangladesh Army families through structured daytime activities and rehabilitation opportunities.",
    image: "/assets/services/Day-Care%20%26%20Non-Residential%20Support.jpeg",
    alt: "Day-care and non-residential support at DISHARI Trust",
  },
];

export default function Services() {
  const [activeKey, setActiveKey] = useState(SERVICES[0].key);
  const active = SERVICES.find((s) => s.key === activeKey) ?? SERVICES[0];

  return (
    <section id="care" className="bg-mist py-20 min-h-[calc(100vh-5rem)] flex flex-col justify-center">
      <div className="mx-auto w-full max-w-7xl px-5">
        <div className="flex items-center gap-3">
          <p className="text-sm font-medium uppercase tracking-widest text-dish">
            CARE, DEVELOPMENT &amp; SUPPORT
          </p>
        </div>
        <h2 className="mt-2 max-w-2xl font-serif text-3xl text-forest sm:text-4xl">
          What Services DISHARI Provides
        </h2>

        <div className="mt-10 grid overflow-hidden rounded-3xl bg-ivory lg:grid-cols-[1fr_1.1fr]">
          <div role="tablist" aria-label="Services" className="flex flex-col">
            {SERVICES.map((s) => {
              const selected = s.key === active.key;
              return (
                <button
                  key={s.key}
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`service-panel-${s.key}`}
                  id={`service-tab-${s.key}`}
                  onClick={() => setActiveKey(s.key)}
                  className={
                    "border-b border-mist px-7 py-6 text-left transition-colors cursor-pointer " +
                    (selected ? "bg-dish text-ivory" : "hover:bg-mist/60")
                  }
                >
                  <span
                    className={
                      "font-serif text-lg " + (selected ? "text-ivory" : "text-dim")
                    }
                  >
                    {s.title}
                  </span>
                  {selected && (
                    <span className="mt-2 block text-justify text-mist/90 text-sm">
                      {s.description}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`service-panel-${active.key}`}
            aria-labelledby={`service-tab-${active.key}`}
            className="relative min-h-[320px] overflow-hidden transition-colors duration-500"
          >
            <img
              key={active.key}
              src={active.image}
              alt={active.alt}
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 rounded-2xl bg-forest px-6 py-6 text-ivory sm:flex-row sm:items-center sm:px-10 sm:py-7">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/20 text-gold"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2 L20 6 V12 C20 17 16 20.5 12 22 C8 20.5 4 17 4 12 V6 L12 2Z" />
              <path d="M9 12 L11 14 L15 10" />
            </svg>
          </span>
          <div className="flex-1">
            <h3 className="font-serif text-lg text-ivory sm:text-xl">
              Residential Members Always Come First
            </h3>
            {/* <p className="mt-2 text-sm text-justify text-mist/80">
              All services and facilities are designed around the well-being of
              residential members. Services extended to non-residential members
              are organized without compromising the quality, availability, or
              priority of care provided to residential members.
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
}
