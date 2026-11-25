export default function Journey() {
  const items: [string, string][] = [
    ["7 May 2026", "Registered under the Societies Registration Act, 1860, with the Register of Joint Stock Companies and Firms, Bangladesh."],
    ["January 2027", "Target for the residential wing to become functional, subject to construction completion."],
    ["June 2027", "Target for the non-residential wing to begin limited operation."],
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <h2 className="font-serif text-3xl text-forest sm:text-4xl">The road so far, and ahead</h2>
      <ol className="relative mt-12 grid gap-10 md:grid-cols-3">
        <div className="absolute left-0 right-0 top-[10px] hidden h-1 rounded bg-gold md:block" />
        {items.map(([d, t], n) => (
          <li key={d} className="relative pt-8">
            <span className={"absolute left-0 top-0 h-6 w-6 rounded-full border-4 border-ivory " + (n ? "bg-leaf" : "bg-dish")} />
            <time className="font-serif text-xl text-dish">{d}{n ? " (target)" : ""}</time>
            <p className="mt-1 max-w-xs text-dim">{t}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}