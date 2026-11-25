const SERVICES = [
  {
    title: "Residential Care & Accommodation",
    desc: "Providing a safe, nurturing, and supportive residential environment for children of Bangladesh Army personnel with special needs, ensuring their daily care, comfort, and well-being.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 10.5 L12 3 L21 10.5" />
        <path d="M5 9.5 V20 H19 V9.5" />
        <path d="M12 13 C10.5 11.5 8.5 12.5 8.5 14.5 C8.5 16.5 12 18.5 12 18.5 C12 18.5 15.5 16.5 15.5 14.5 C15.5 12.5 13.5 11.5 12 13Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Specialized Therapeutic Services",
    desc: "Delivering dedicated in-house therapeutic services tailored to the individual developmental, physical, and functional needs of residential members.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21 C7 17 4 13.5 4 10 A4 4 0 0 1 12 8 A4 4 0 0 1 20 10 C20 13.5 17 17 12 21Z" />
        <path d="M9 10 H15 M12 7 V13" />
      </svg>
    ),
  },
  {
    title: "Vocational Training & Skill Development",
    desc: "Empowering residential members through practical vocational training and skill development programs designed to enhance independence and prepare them for future employment opportunities.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10 L12 5 L2 10 L12 15 L22 10Z" />
        <path d="M6 12 V17 C6 18.5 8.7 20 12 20 C15.3 20 18 18.5 18 17 V12" />
        <path d="M22 10 V16" />
      </svg>
    ),
  },
  {
    title: "Advanced Clinical & Medical Care",
    desc: "Developing advanced clinical and medical facilities with specialized services customized to address the healthcare requirements of children with special needs.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M12 7 V17 M7 12 H17" />
      </svg>
    ),
  },
  {
    title: "Specialized Medical & Therapy Services",
    desc: "Extending medical and therapeutic facilities to non-resident members through organized service programs, generating sustainable funds for the Trust while ensuring residential members always receive priority care.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12 H16 M12 8 V16" />
        <path d="M4 4 L6 6 M20 4 L18 6 M4 20 L6 18 M20 20 L18 18" />
      </svg>
    ),
  },
  {
    title: "Day-Care & Support Facilities",
    desc: "Offering dedicated day-care facilities for children with special needs from Bangladesh Army families, while ensuring that the care and service requirements of residential members remain the highest priority.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="7" r="3" />
        <circle cx="17" cy="7" r="3" />
        <path d="M3 20 C3 16 6 14 9 14 C12 14 15 16 15 20" />
        <path d="M14 20 C14 17 16 15 18 15 C20 15 22 17 22 20" />
      </svg>
    ),
  },
];

export default function OurServices() {
  return (
    <section className="bg-ivory py-12">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-dish">What We Do</p>
          <h2 className="mt-2 font-serif text-3xl text-forest sm:text-4xl">
            Comprehensive Care. Brighter Possibilities.
          </h2>
          <p className="mt-4 text-base text-dim">
            Dishari Trust is committed to creating a supportive environment where children with special needs can access quality care, specialized medical services, therapeutic support, and opportunities to develop their abilities and independence.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="group rounded-2xl border border-forest/8 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mist text-dish transition-colors duration-300 group-hover:bg-dish group-hover:text-ivory">
                {s.icon}
              </div>
              <h3 className="mt-3 font-serif text-lg text-forest">{s.title}</h3>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl bg-forest px-6 py-6 text-ivory sm:px-12">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/20 text-gold">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 21 C7 17 4 13.5 4 10 A4 4 0 0 1 12 8 A4 4 0 0 1 20 10 C20 13.5 17 17 12 21Z" />
                <path d="M9 10 H15 M12 7 V13" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-xl text-ivory sm:text-2xl">Residential Members Always Come First</h3>
              <p className="mt-2 text-sm text-mist/80">
                All services and facilities are designed around the well-being of residential members. Services extended to non-resident members are organized without compromising the quality, availability, or priority of care provided to residential children.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}