import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Notices - DISHARI Trust",
  description: "Notices from DISHARI Trust",
};

const notices = [
  { title: "Admission Notice", date: "01 December 2026", file: "dummy.pdf" },
  { title: "Holiday Schedule", date: "15 November 2026", file: "test.pdf" },
  { title: "Annual Report", date: "30 October 2026", file: "Annual%20Report.pdf" },
];

export default function NoticesPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory text-ink">
        <section className="mx-auto max-w-7xl px-5 py-20">
          <h1 className="font-serif text-4xl text-forest sm:text-5xl mt-10">Notices</h1>
          <p className="mt-4 max-w-2xl text-dim">
            Official notices and announcements published by DISHARI Trust.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {notices.map((notice) => (
              <div
                key={notice.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-gold/20 bg-white shadow-sm"
              >
                <iframe
                  src={`/assets/notices/${notice.file}`}
                  title={notice.title}
                  className="h-48 w-full border-0"
                />
                <div className="p-6">
                  <h3 className="font-serif text-xl text-forest">{notice.title}</h3>
                  <p className="mt-1 text-sm text-dim">Uploaded: {notice.date}</p>
                  <a
                    href={`/assets/notices/${notice.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm font-medium text-dish hover:underline"
                  >
                    View Details →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}