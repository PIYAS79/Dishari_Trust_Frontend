const LOGOS = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Bangladesh_Army.png", name: "Bangladesh Army" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/b/bc/UNESCO_logo.svg", name: "UNESCO" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/b/bc/UNESCO_logo.svg", name: "UNESCO" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/b/ba/SAARC.png", name: "SAARC" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/5/52/Emblem_of_the_United_Nations.svg", name: "United Nations" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Logo_of_UNICEF.svg", name: "UNICEF" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Save_the_Children_Logo.svg", name: "Save the Children" },
];

export default function Sponsors() {
  const items = [...LOGOS, ...LOGOS];
  return (
    <section className="bg-ivory py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-dish">Partners</p>
          <h2 className="mt-3 font-serif text-4xl text-forest sm:text-5xl">Our Sponsors</h2>
          <p className="mx-auto mt-4 max-w-2xl text-dim">
            We are grateful to the organisations that support DISHARI Trust&apos;s mission of care and dignity.
          </p>
        </div>
        <div className="mt-12 overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-16">
            {items.map((l, i) => (
              <div key={i} className="flex h-16 w-32 shrink-0 items-center justify-center">
                <img
                  src={l.src}
                  alt={l.name}
                  className="max-h-12 w-auto grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}