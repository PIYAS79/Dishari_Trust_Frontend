const MEMBERS = [
  {
    img: "https://www.proyash.edu.bd/storage/img/homeSections/administrative/muqBuGphqYXrlYkwRNuqpjiWcBSvdgBqbogvG0OH.jpg",
    name: "Brig Gen Syed Fazle Gaus, ndc, afwc, psc",
    rank: "Chairman",
    role: "Chairman, DISHARI Trust",
    text: "Leads the Trust with a lifetime of service to the Bangladesh Army family, guiding its mission of care and dignity.",
  },
  {
    img: "https://www.proyash.edu.bd/storage/img/homeSections/administrative/S0g4ja2zZSDPDTaXQZjv1ZCQV1WzGDbEj1ABbUAL.jpg",
    name: "Lt Col Farhana Afrin, psc,ASC",
    rank: "Managing Trustee",
    role: "Managing Trustee",
    text: "Oversees daily operations, ensuring residential members receive compassionate, quality support every day.",
  },
  {
    img: "https://www.proyash.edu.bd/storage/img/homeSections/administrative/3o6aLXWGiBfQX00QKamnoA8oqvR26QPq2oUDSFj1.jpg",
    name: "Col Md Altaf Ali, PSC",
    rank: "Secretary",
    role: "Secretary, Trustee Board",
    text: "Coordinates governance, administration and community outreach for the Trust and its members.",
  },
];

export default function AdministrativeBody() {
  return (
    <section className="bg-forest py-20 text-mist">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-champ">Leadership</p>
          <h2 className="mt-3 font-serif text-4xl text-ivory sm:text-5xl">Administrative Body</h2>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
          {MEMBERS.map((m, i) => (
            <article
              key={i}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="h-[26rem] overflow-hidden ">
                <img
                  src={m.img}
                  alt={m.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-5 pt-2 pb-2 font-serif  text-center bg-[#0B5A2A] h-full">
                <h3 className="mt-2 text-lg text-[#F3DC8A]">{m.name}</h3>
                <p className="mb-[5px] text-sm font-medium text-[#F3DC8A]">{m.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}