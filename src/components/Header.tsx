"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LOGO } from "@/constants/site";

const NAV: [string, string, (string | [string, string])[]?][] = [
  ["Home", "/"],
  [
    "About",
    "/about",
    [
      ["Overview", "/about"],
      ["Trustee Board", "/about/trustee-board"],
      ["Executive Committee", "/about/executive-committee"],
      ["Rules & Regulation", "/about/rules-regulation"],
    ],
  ],
  ["Services", "/services"],
  [
    "Admission",
    "/#admission",
    [
      ["Admission Documents", "/admission/documents"],
      ["Online Admission", "/admission/online"],
      ["Download Form", "/admission/download-form"],
    ],
  ],
  [
    "News & Notices",
    "/news",
    [
      ["News", "/news"],
      ["Notices", "/notices"],
    ],
  ],
  ["Contact", "/contact"],
];

function isActiveNav(title: string, pathname: string): boolean {
  if (title === "Home") return pathname === "/";
  if (title === "About") return pathname.startsWith("/about");
  if (title === "Services") return pathname === "/services";
  if (title === "Admission") return pathname.startsWith("/admission");
  if (title === "News & Notices")
    return (
      pathname === "/news" ||
      pathname === "/notices" ||
      pathname.startsWith("/news/") ||
      pathname.startsWith("/notices/")
    );
  return false;
}

export default function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (pathname !== "/") {
      setSolid(true);
      return;
    }
    const f = () => setSolid(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, [pathname]);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-30 text-mist transition-colors duration-300 " +
        (solid || open ? "bg-forest" : "bg-transparent")
      }
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        <Link href="#top" className="flex items-center gap-3 font-serif text-2xl text-champ">
          <img src={LOGO} alt="" width={72} height={72} className="h-16 w-16 rounded-full bg-white p-1 object-contain" />
          DISHARI Trust
        </Link>
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
              <Link
                href={h}
                className={`border-b-2 py-1 transition-colors ${
                  isActiveNav(t, pathname) ? "border-gold text-champ" : "border-transparent hover:border-gold"
                }`}
              >
                {t}
              </Link>
              {sub && (
                <div className="hidden pt-3 group-hover:block group-focus-within:block lg:absolute lg:left-[-1rem] lg:min-w-[15rem]">
                  <ul className="border-t-2 border-gold bg-forest py-2">
                    {sub.map((item) => {
                      const [label, href] = Array.isArray(item)
                        ? item
                        : [item, "#care"];
                      return (
                        <li key={label}>
                          <Link
                            href={href}
                            className={`block px-4 py-2 hover:bg-dish ${
                              pathname === href ? "bg-dish text-champ" : ""
                            }`}
                          >
                            {label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          ))}
          <Link href="#support" className="rounded bg-gold px-4 py-2 font-medium text-forest hover:bg-champ">
            Support DISHARI
          </Link>
        </nav>
      </div>
    </header>
  );
}