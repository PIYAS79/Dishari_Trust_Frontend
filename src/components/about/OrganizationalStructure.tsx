"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Node = {
  id: string;
  title: string;
  subtitle: string;
  details: string;
};

const departments: Node[] = [
  {
    id: "residential",
    title: "Residential Care",
    subtitle: "Accommodation & Daily Living",
    details:
      "Oversees residential accommodation, daily care routines, housekeeping, catering and the overall living environment for members.",
  },
  {
    id: "medical",
    title: "Medical & Clinical Support",
    subtitle: "Health & Wellness",
    details:
      "Coordinates medical consultation, health monitoring, first-aid response and clinical support for residents.",
  },
  {
    id: "therapy",
    title: "Rehabilitation & Therapy",
    subtitle: "Functional Development",
    details:
      "Delivers individualized therapeutic and rehabilitation programmes to support mobility, communication and independence.",
  },
  {
    id: "vocational",
    title: "Vocational Training",
    subtitle: "Skills & Employment",
    details:
      "Develops practical skills through cooking, bakery, digital learning, arts, crafts and gardening.",
  },
  {
    id: "admin",
    title: "Administration & Finance",
    subtitle: "Operations & Governance",
    details:
      "Manages institutional operations, records, budgeting, procurement and compliance.",
  },
  {
    id: "safety",
    title: "Safety & Well-being",
    subtitle: "Protection & Security",
    details:
      "Ensures a safe, secure and supportive environment through monitoring, safeguarding and emergency preparedness.",
  },
];

export default function OrganizationalStructure() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col items-center gap-6">
        <div className="w-full max-w-sm rounded-2xl border border-gold/30 bg-forest px-6 py-5 text-center text-ivory shadow-sm">
          <div className="text-xs uppercase tracking-widest text-champ">Governance</div>
          <div className="mt-1 font-serif text-xl">Board of Trustees</div>
          <div className="mt-1 text-xs text-mist/80">Strategic oversight & institutional accountability</div>
        </div>

        <div className="h-8 w-px bg-gold/40" />

        <div className="w-full max-w-sm rounded-2xl border border-gold/30 bg-dish px-6 py-5 text-center text-ivory shadow-sm">
          <div className="text-xs uppercase tracking-widest text-champ">Leadership</div>
          <div className="mt-1 font-serif text-xl">Executive Director</div>
          <div className="mt-1 text-xs text-mist/80">Day-to-day leadership & coordination</div>
        </div>

        <div className="h-8 w-px bg-gold/40" />
        <div className="h-px w-full max-w-4xl bg-gold/40" />

        <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept) => {
            const isOpen = active === dept.id;
            return (
              <div key={dept.id} className="relative pt-6">
                <span className="absolute left-1/2 top-0 h-6 w-px -translate-x-1/2 bg-gold/40" />
                <button
                  type="button"
                  onClick={() => setActive(isOpen ? null : dept.id)}
                  className={`w-full rounded-xl border px-5 py-4 text-left transition-colors ${
                    isOpen
                      ? "border-gold bg-forest text-ivory"
                      : "border-gold/25 bg-ivory text-ink hover:border-gold/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-serif text-lg">{dept.title}</div>
                      <div className={`text-xs ${isOpen ? "text-champ" : "text-dim"}`}>
                        {dept.subtitle}
                      </div>
                    </div>
                    <ChevronDown
                      className={`mt-1 h-4 w-4 shrink-0 transition-transform ${
                        isOpen ? "rotate-180 text-champ" : "text-dim"
                      }`}
                    />
                  </div>
                </button>
                {isOpen && (
                  <div className="mt-2 rounded-xl border border-gold/20 bg-mist/40 px-5 py-4 text-sm text-dim">
                    {dept.details}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}