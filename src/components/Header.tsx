"use client";

import { useState, useEffect } from "react";
import { LOGO } from "@/constants/site";

const NAV: [string, string, string[]?][] = [
  ["Home", "#top"],
  ["About", "#about"],
  ["Care & Services", "#care", ["Residential Care", "Medical & Therapy", "Vocational Development", "Day Care"]],
  ["Admission", "#admission"],
  ["Facilities", "#facilities"],
  ["Governance", "#"],
  ["Updates", "#"],
  ["Contact", "#contact"],
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-30 text-mist transition-colors duration-300 " +
        (solid || open ? "bg-forest" : "bg-transparent")
      }
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-3 font-serif text-2xl text-champ">
          <img src={LOGO} alt="" width={72} height={72} className="h-16 w-16 rounded-full bg-white p-1 object-contain" />
          DISHARI Trust
        </a>
        <button
          className="rounded border border-champ px-4 py-2 text-base text-champ lg:hidden"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          Menu
        </button>
        <nav
          className={
            (open ? "absolute left-0 right-0 top-20 flex flex-col items-start gap-3 bg-forest px-5 pb-6" : "hidden") +
            " lg:static lg:flex lg:flex-row lg:items-center lg:gap-8 lg:bg-transparent lg:p-0 text-base"
          }
        >
          {NAV.map(([t, h, sub]) => (
            <div key={t} className="group relative">
              <a href={h} className="border-b-2 border-transparent py-1 hover:border-gold">
                {t}
              </a>
              {sub && (
                <div className="hidden pt-3 group-hover:block group-focus-within:block lg:absolute lg:left-[-1rem] lg:min-w-[15rem]">
                  <ul className="border-t-2 border-gold bg-forest py-2">
                    {sub.map((s) => (
                      <li key={s}>
                        <a href="#care" className="block px-4 py-2 hover:bg-dish">
                          {s}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
          <a href="#support" className="rounded bg-gold px-4 py-2 font-medium text-forest hover:bg-champ">
            Support DISHARI
          </a>
        </nav>
      </div>
    </header>
  );
}