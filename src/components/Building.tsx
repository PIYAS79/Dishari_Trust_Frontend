"use client";

import { useState } from "react";

const FLOORS = [
  { n: "Sixth floor", t: "Dining and training", w: 0, i: ["Male and female dining spaces", "Kitchen", "Gym", "Common training space"] },
  { n: "Fifth floor", t: "Male accommodation", w: 11, i: ["11 individual male accommodation rooms"] },
  { n: "Fourth floor", t: "Male accommodation", w: 11, i: ["11 individual male accommodation rooms"] },
  { n: "Third floor", t: "Accommodation", w: 11, i: ["11 accommodation rooms", "Category to be confirmed before publication"] },
  { n: "Second floor", t: "Female accommodation", w: 11, i: ["11 individual female accommodation rooms"] },
  { n: "First floor", t: "Activity and therapy", w: 0, i: ["Daylong activity facilities", "Therapy room", "Doctors' room", "Counseling room"] },
  { n: "Ground floor", t: "Reception and safety", w: 0, i: ["Reception", "Administrative office", "First-aid room", "Isolation room", "CCTV monitoring room"] },
];

export default function Building() {
  const [sel, setSel] = useState(1);
  const f = FLOORS[sel];
  return (
    <section id="facilities" className="bg-forest py-20 text-mist">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
        <svg viewBox="0 0 300 400" className="mx-auto w-full max-w-sm" role="group" aria-label="Floor selector">
          <rect x="40" y="6" width="220" height="44" rx="4" fill="none" stroke="#F3DC8A" strokeDasharray="6 6" strokeWidth="2" opacity=".6" />
          <text x="150" y="33" textAnchor="middle" fill="#F3DC8A" fontSize="13" opacity=".8">
            Later phases up to G+13
          </text>
          {FLOORS.map((x, n) => (
            <g
              key={x.n}
              role="button"
              tabIndex={0}
              aria-label={x.n}
              aria-pressed={n === sel}
              className="cursor-pointer"
              onClick={() => setSel(n)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(n)}
            >
              <rect x="40" y={56 + n * 48} width="220" height="44" rx="4" fill={n === sel ? "#D9A520" : "#0B5A2A"} stroke="#F3DC8A" strokeWidth="1.5" />
              {[...Array(x.w)].map((_, j) => (
                <rect key={j} x={50 + j * 18} y={66 + n * 48} width="12" height="24" fill={n === sel ? "#06361A" : "#8DC63F"} />
              ))}
              {!x.w && (
                <text x="150" y={84 + n * 48} textAnchor="middle" fontSize="14" fill={n === sel ? "#06361A" : "#EAF3E4"}>
                  {x.t}
                </text>
              )}
            </g>
          ))}
        </svg>
        <div>
          <span className="rounded bg-champ px-3 py-0.5 text-sm font-medium text-forest">Planned facilities</span>
          <h2 className="mt-4 font-serif text-3xl text-ivory sm:text-4xl">The DISHARI building</h2>
          <p className="mt-3 max-w-md">A planned G+13 building, built first to G+6. Initial capacity is up to 44 special adults. Choose a floor to see what is planned there.</p>
          <div className="mt-8 border-l-4 border-gold pl-5">
            <h3 className="font-serif text-2xl text-champ">{f.n}</h3>
            <ul className="mt-2 space-y-1">
              {f.i.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}