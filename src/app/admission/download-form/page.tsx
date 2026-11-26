import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Download Form - DISHARI Trust",
  description: "Download admission forms for DISHARI Trust",
};

const forms = [
  { title: "Residential Care Admission Form", file: "Admission%20Guidelines.pdf" },
  { title: "Day-Care Admission Form", file: "Required%20Documents.pdf" },
  { title: "Vocational Training Program Form", file: "Fee%20Structure.pdf" },
  { title: "Medical & Therapy Support Form", file: "Admission%20Guidelines.pdf" },
];

export default function DownloadFormPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory text-ink">
        <section className="mx-auto max-w-5xl px-5 py-20">
          <h1 className="font-serif text-4xl text-forest sm:text-5xl mt-10">Download Form</h1>
          <p className="mt-6 text-dim">
            Admission forms vary by program. Select the relevant form to download.
          </p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-gold/20 bg-white shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-forest text-ivory">
                  <th className="px-6 py-3 text-left font-semibold">Form Title</th>
                  <th className="w-40 px-6 py-3 text-right font-semibold">Download</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((form, index) => (
                  <tr key={index} className="border-t border-gold/10">
                    <td className="px-6 py-4 font-serif text-lg text-forest">{form.title}</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={`/assets/admission/documents/${form.file}`}
                        download
                        className="inline-block rounded bg-dish px-4 py-2 text-sm font-medium text-ivory transition-colors hover:bg-forest"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}