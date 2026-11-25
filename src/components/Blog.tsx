const POSTS = [
  {
    img: "/assets/blog/post-1.jpg",
    title: "Supporting adults with special needs: a lifelong journey",
    date: "18 November 2026",
    author: "DISHARI Trust",
    text: "Care does not end at childhood. Learn how residential support, therapy and community help adults with special needs live with dignity.",
    tag: "Care",
  },
  {
    img: "/assets/blog/post-2.jpg",
    title: "Vocational skills that build confidence and independence",
    date: "10 November 2026",
    author: "DISHARI Trust",
    text: "From cooking and bakery to digital skills and gardening, practical training opens new doors for special adults.",
    tag: "Vocational",
  },
  {
    img: "/assets/blog/post-3.jpg",
    title: "Therapy and wellbeing: small steps, big changes",
    date: "02 November 2026",
    author: "DISHARI Trust",
    text: "Consistent therapy, counseling and medical support can transform daily life and emotional wellbeing for residents.",
    tag: "Therapy",
  },
  {
    img: "/assets/blog/post-4.jpg",
    title: "A home for belonging: why community matters",
    date: "25 October 2026",
    author: "DISHARI Trust",
    text: "Belonging is at the heart of DISHARI. Discover how a supportive community nurtures growth and joy.",
    tag: "Community",
  },
];

export default function Blog() {
  return (
    <section className="bg-ivory py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-dish">Blog</p>
            <h2 className="mt-3 font-serif text-4xl text-forest sm:text-5xl">From Our Blog</h2>
            <p className="mt-4 max-w-2xl text-dim">
              Insights, stories and guidance on care, dignity and belonging for special adults.
            </p>
          </div>
          <a href="#" className="text-sm font-medium text-dish hover:underline">
            View all posts →
          </a>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {POSTS.map((p) => (
            <article
              key={p.title}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="inline-block rounded-full bg-mist px-3 py-1 text-xs font-medium text-dish">
                  {p.tag}
                </span>
                <h3 className="mt-3 font-serif text-lg text-forest">{p.title}</h3>
                <p className="mt-1 text-xs text-dim">
                  {p.date} · {p.author}
                </p>
                <p className="mt-3 text-sm text-dim">{p.text}</p>
                <a href="#" className="mt-4 inline-block text-sm font-medium text-dish hover:underline">
                  Read more →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}