import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Admission Documents - DISHARI Trust",
  description: "Admission documents for DISHARI Trust",
};

const documents = [
  { name: "Admission Guidelines", file: "Admission%20Guidelines.pdf" },
  { name: "Required Documents", file: "Required%20Documents.pdf" },
  { name: "Fee Structure", file: "Fee%20Structure.pdf" },
];

export default function AdmissionDocumentsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory text-ink">
        <section className="mx-auto max-w-7xl px-5 py-20">
          <h1 className="font-serif text-4xl text-forest sm:text-5xl mt-10">Admission Documents</h1>
          <p className="mt-6 max-w-3xl text-dim">
            The following documents are published by the organization. Click to view or download.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc) => (
              <a
                key={doc.name}
                href={`/assets/admission/documents/${doc.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-gold/20 bg-white p-6 shadow-sm transition hover:border-gold/60"
              >
                <FileText className="h-8 w-8 text-gold" />
                <div>
                  <div className="font-serif text-lg text-forest">{doc.name}</div>
                  <div className="text-xs text-dim">PDF document · Click to view</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}