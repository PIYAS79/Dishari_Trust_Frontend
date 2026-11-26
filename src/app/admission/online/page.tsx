import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Online Admission - DISHARI Trust",
  description: "Online admission application for DISHARI Trust",
};

export default function OnlineAdmissionPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory text-ink">
        <section className="mx-auto max-w-3xl px-5 py-20">
          <h1 className="font-serif text-4xl text-center text-forest sm:text-5xl mt-10">Online Admission</h1>
          <p className="text-center mt-10 bg-green-100 py-10">Coming Soon</p>
        </section>
      </main>
      <Footer />
    </>
  );
}