"use client";

export default function Hero() {
  const facts: [string, string][] = [
    ["44", "Residents in the first phase"], 
    ["G+13", "planned building, G+6"], 
    ["Jan 27", "target for residential wing"]];
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100vh-3.5rem)] items-center overflow-hidden py-24 text-ivory"
      style={{
        backgroundImage: "url('/assets/Banner_Wide.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Left-side scrim: dark/suitable color on the left for content focus, clear on the right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(6,54,26,0.88) 0%, rgba(6,54,26,0.62) 35%, rgba(6,54,26,0.22) 60%, rgba(6,54,26,0.05) 78%, rgba(6,54,26,0) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5">
        <div className="max-w-xl">
          <p className="font-sans text-7xl font-bold leading-none text-gold sm:text-8xl drop-shadow-lg">দিশারী</p>
          <h1 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl drop-shadow-md">Every journey needs a guiding light.</h1>
          <p className="mt-5 text-lg text-mist drop-shadow-md">A place of care, dignity, rehabilitation and belonging for adults with special needs from Bangladesh Army families.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#care" className="rounded bg-gold px-6 py-3 font-medium text-forest hover:bg-champ">Explore our care</a>
            <a href="#admission" className="rounded border border-champ px-6 py-3 text-champ hover:bg-white/10">Residential admission</a>
          </div>
          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/20 pt-5">
            {facts.map(([n, l]) => (
              <div key={n}>
                <dt className="font-serif text-2xl text-champ sm:text-5xl">{n}</dt>
                <dd className="text-sm text-mist/80">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}