import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "News - DISHARI Trust",
  description: "News and updates from DISHARI Trust",
};

const NEWS = [
  {
    img: "/assets/services/Residential%20Care%20%26%20Accommodation.jpeg",
    title: "Education, care key to unlocking potential of children with special needs",
    date: "09 November 2026",
    text: "ZRF vice president Dr Zubaida Rahman stresses proper education, care and skills training to help children with special needs realise their potential, urging that no one is left behind for lack of opportunities.",
  },
  {
    img: "/assets/services/Day-Care%20%26%20Non-Residential%20Support.jpeg",
    title: "No daycare for children with special needs",
    date: "29 November 2023",
    text: "Parents of children with special needs call for specialised daycare facilities so their children get safe, supportive care while families pursue their livelihoods.",
  },
  {
    img: "/assets/services/Vocational%20Training%20%26%20Skill%20Development.jpeg",
    title: "Expanding future options for youth through vocational education",
    date: "12 October 2026",
    text: "Vocational training opens new pathways for young people, building practical skills, confidence and independence for a dignified future.",
  },
  {
    img: "/assets/services/Advanced%20Clinical%20%26%20Medical%20Care.jpeg",
    title: "New thinking challenges the stigma around therapy and care",
    date: "15 August 2026",
    text: "Medical and therapeutic support, delivered with empathy, can transform lives and help adults with special needs thrive in community.",
  },
  {
    img: "/assets/Banner_Wide.jpeg",
    title: "DISHARI Trust: building a home for a lifetime of dignity",
    date: "01 December 2026",
    text: "The Trust continues its mission to provide residential care, rehabilitation and belonging for adults with special needs from Bangladesh Army families.",
  },
];

export default function NewsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory text-ink">
        <section className="mx-auto max-w-7xl px-5 py-20">
          <h1 className="font-serif text-4xl text-forest sm:text-5xl mt-10">News</h1>
          <p className="mt-4 max-w-2xl text-dim">
            Stories, milestones and voices from the DISHARI community and beyond.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {NEWS.map((n) => (
              <article key={n.title} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <img src={n.img} alt={n.title} className="h-48 w-full object-cover" />
                <div className="p-5">
                  <time className="text-sm font-medium text-dish">{n.date}</time>
                  <h3 className="mt-2 font-serif text-xl text-forest">{n.title}</h3>
                  <p className="mt-2 text-sm text-dim">{n.text}</p>
                  <a href="#" className="mt-4 inline-block text-sm font-medium text-dish hover:underline">
                    Read more →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}