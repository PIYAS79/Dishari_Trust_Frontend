import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Executive Committee - DISHARI Trust",
  description: "Executive Committee of DISHARI Trust",
};

export default function ExecutiveCommitteePage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory text-ink">
        <section className="mx-auto max-w-7xl px-5 py-20">
          <h1 className="font-serif text-4xl text-forest sm:text-5xl mt-10">Executive Committee</h1>
          <div className="mt-10 overflow-hidden rounded-2xl border border-gold/20 bg-white shadow-sm">
           <table className="w-full border-collapse">
  <thead>
    <tr className="bg-forest text-ivory">
      <th className="w-20 px-4 py-3 text-left font-semibold">SL</th>
      <th className="px-4 py-3 text-left font-semibold">Executive Committee</th>
      <th className="px-4 py-3 text-left font-semibold">Appointment</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-forest/15">
    <tr>
      <td className="px-4 py-3">1.</td>
      <td className="px-4 py-3">Dir, W&R Dte</td>
      <td className="px-4 py-3 font-semibold">Chairman</td>
    </tr>
    <tr>
      <td className="px-4 py-3">2.</td>
      <td className="px-4 py-3">Principal, Proyash, Dhaka</td>
      <td className="px-4 py-3">Vice-Chairman</td>
    </tr>
    <tr>
      <td className="px-4 py-3">3.</td>
      <td className="px-4 py-3">AMA, CAS Sectt</td>
      <td className="px-4 py-3">Member</td>
    </tr>
    <tr>
      <td className="px-4 py-3">4.</td>
      <td className="px-4 py-3">GSO-1, Med Dte</td>
      <td className="px-4 py-3">Member</td>
    </tr>
    <tr>
      <td className="px-4 py-3">5.</td>
      <td className="px-4 py-3">1x SO, 24 ECB</td>
      <td className="px-4 py-3">Member</td>
    </tr>
    <tr>
      <td className="px-4 py-3">6.</td>
      <td className="px-4 py-3">1x SO, 34 ECB</td>
      <td className="px-4 py-3">Member</td>
    </tr>
    <tr>
      <td className="px-4 py-3">7.</td>
      <td className="px-4 py-3">SSO, Sta HQ, Dhaka</td>
      <td className="px-4 py-3">Member</td>
    </tr>
    <tr>
      <td className="px-4 py-3">8.</td>
      <td className="px-4 py-3">GE Army (Dhaka)</td>
      <td className="px-4 py-3">Member</td>
    </tr>
    <tr>
      <td className="px-4 py-3">9.</td>
      <td className="px-4 py-3">2x Guardian Rep of DISHARI Trust</td>
      <td className="px-4 py-3">Member</td>
    </tr>
    <tr>
      <td className="px-4 py-3">10.</td>
      <td className="px-4 py-3">Dir, DISHARI Trust</td>
      <td className="px-4 py-3 font-semibold">Member Secretary</td>
    </tr>
  </tbody>
</table>
          </div>

          <div className="mt-16">
            <h2 className="text-center font-serif text-3xl text-forest">EXECUTIVE STANDING COMMITTEES</h2>
            <div className="mt-8 overflow-hidden rounded-2xl border border-gold/20 bg-white shadow-sm">
              <Image
                src="/assets/about/Executive%20Committee.png"
                alt="Executive Standing Committees"
                width={1600}
                height={900}
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}