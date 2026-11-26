import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Trustee Board - DISHARI Trust",
  description: "Trustee Board of DISHARI Trust",
};

export default function TrusteeBoardPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory text-ink">
        <section className="mx-auto max-w-7xl px-5 py-20">
          <h1 className="font-serif text-4xl text-forest sm:text-5xl mt-10">Trustee Board</h1>
          <div className="mt-10 overflow-hidden rounded-2xl border border-gold/20 bg-white shadow-sm">
            <table className="w-full border-collapse">
  <thead>
    <tr className="bg-forest text-ivory">
      <th className="w-20 px-4 py-3 text-left font-semibold">SL</th>
      <th className="px-4 py-3 text-left font-semibold">Trustee Board</th>
      <th className="px-4 py-3 text-left font-semibold">Appointment</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-forest/15">
    <tr className="font-semibold">
      <td className="px-4 py-3">1.</td>
      <td className="px-4 py-3">Chief of Army Staff</td>
      <td className="px-4 py-3">Chairman</td>
    </tr>
    <tr>
      <td className="px-4 py-3">2.</td>
      <td className="px-4 py-3">Adjutant General</td>
      <td className="px-4 py-3">Vice-Chairman</td>
    </tr>
    <tr>
      <td className="px-4 py-3">3.</td>
      <td className="px-4 py-3">Chairman, Sena Kollan Shonogastha (SKS)</td>
      <td className="px-4 py-3">Member</td>
    </tr>
    <tr>
      <td className="px-4 py-3">4.</td>
      <td className="px-4 py-3">Managing Director, Bangladesh Machine Tools Factory</td>
      <td className="px-4 py-3">Member</td>
    </tr>
    <tr>
      <td className="px-4 py-3">5.</td>
      <td className="px-4 py-3">Director, SD Directorate</td>
      <td className="px-4 py-3">Member</td>
    </tr>
    <tr>
      <td className="px-4 py-3">6.</td>
      <td className="px-4 py-3">Commander, 14 Independent Engineer Brigade</td>
      <td className="px-4 py-3">Member</td>
    </tr>
    <tr>
      <td className="px-4 py-3">7.</td>
      <td className="px-4 py-3">Commander, 34 Engineer Construction Brigade</td>
      <td className="px-4 py-3">Member</td>
    </tr>
    <tr>
      <td className="px-4 py-3">8.</td>
      <td className="px-4 py-3">Commandant, CMH, Dhaka</td>
      <td className="px-4 py-3">Member</td>
    </tr>
    <tr>
      <td className="px-4 py-3">9.</td>
      <td className="px-4 py-3">Director, W&R Directorate</td>
      <td className="px-4 py-3">Treasurer</td>
    </tr>
  </tbody>
</table>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}