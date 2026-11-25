type Facility = {
  title: string;
  description: string;
  image: string;
};

const FACILITIES: Facility[] = [
  {
    title: "Residential Accommodation",
    description:
      "Individual residential accommodation and a supportive living environment for residents.",
    image: "/assets/facilities/residential.webp",
  },
  {
    title: "Medical & First Aid Facilities",
    description:
      "Medical consultation, first-aid facilities, and appropriate clinical support.",
    image: "/assets/facilities/medical.webp",
  },
  {
    title: "Therapy & Rehabilitation Rooms",
    description:
      "Dedicated spaces for therapeutic activities, rehabilitation, and counseling.",
    image: "/assets/facilities/therapy.webp",
  },
  {
    title: "Day-Care & Activity Facilities",
    description:
      "Daytime activities and supportive facilities for eligible non-residential members.",
    image: "/assets/facilities/daycare.webp",
  },
  {
    title: "Dining & Kitchen Facilities",
    description: "Dedicated dining spaces and kitchen facilities.",
    image: "/assets/facilities/dining.jpg",
  },
  {
    title: "Gymnasium & Training Facilities",
    description: "Physical activities, exercise, and common training facilities.",
    image: "/assets/facilities/gymnasium.jpg",
  },
];

export default function Facilities() {
  return (
    <section className="bg-ivory py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-serif text-3xl text-forest sm:text-4xl">Our Facilities</h2>
          <a
            href="#facilities"
            className="inline-flex items-center gap-1 text-sm font-medium text-dish hover:underline"
          >
            View All
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FACILITIES.slice(0,4).map((facility) => (
            <article
              key={facility.title}
              className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-lg text-forest">{facility.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dim">{facility.description}</p>
                <a
                  href="#facilities"
                  className="mt-auto pt-4 text-sm font-semibold text-dish hover:underline"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
