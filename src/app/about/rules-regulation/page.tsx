import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Rules & Regulation - DISHARI Trust",
  description: "Rules and regulations of DISHARI Trust",
};

const rules = [
  "All members are expected to follow the residential schedule and daily routines set by the institution.",
  "Respect, dignity and courteous behavior must be maintained toward residents, staff and visitors at all times.",
  "Medical check-ups and therapy sessions must be attended as scheduled unless a valid reason is provided.",
  "Personal belongings should be used responsibly and kept in designated areas.",
  "Visitors are allowed only during approved visiting hours and must register at reception.",
  "Any form of misconduct, harassment or unsafe behavior will be addressed according to institutional policy.",
  "Participation in vocational and recreational activities is encouraged for personal development.",
  "The institution reserves the right to update these rules as needed for the safety and well-being of all members.",
];

export default function RulesRegulationPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory text-ink">
        <section className="mx-auto max-w-7xl px-5 py-20">
          <div className="text-center">
            <h1 className="font-serif text-4xl text-forest sm:text-5xl mt-10">Rules & Regulation</h1>
          <p className="mt-3 text-dim">
            The following guidelines help ensure a safe, respectful and supportive environment for all members of DISHARI Trust.
          </p>
          </div>
          <ol className="mt-10 space-y-4">
            {rules.map((rule, index) => (
              <li key={index} className="flex gap-4 rounded-xl border border-gold/20 bg-white px-5 py-4 shadow-sm">
                <span className="font-mono tabular-nums font-semibold text-gold">{index + 1}.</span>
                <span className="text-dim">{rule}</span>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Footer />
    </>
  );
}