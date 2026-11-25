export default function Support() {
  return (
    <section
      id="support"
      className="bg-champ py-16 text-forest "
      style={{
        backgroundImage: "url('/assets/grid_bg.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5">
        <div>
          <h2 className="max-w-xl font-serif text-3xl sm:text-4xl">Help build a future beyond childhood</h2>
          <p className="mt-2 max-w-lg">Fundraising is an ongoing activity of the Trust. Get in touch to talk about how to contribute.</p>
        </div>
        <a href="#contact" className="rounded bg-forest px-7 py-3 font-medium text-champ hover:bg-dish">
          Support DISHARI
        </a>
      </div>
    </section>
  );
}
