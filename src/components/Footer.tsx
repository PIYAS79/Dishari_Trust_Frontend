import Image from "next/image";
import { LOGO } from "@/constants/site";

export default function Footer() {
  const col = (h: string, l: string[]) => (
    <div>
      <h3 className="mb-2 font-medium text-champ">{h}</h3>
      <ul className="space-y-1">
        {l.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
  return (
    <footer id="contact" className="bg-forest py-12 text-sm text-mist">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-4">
        <div>
          <Image src={LOGO} alt="DISHARI Trust" width={72} height={72} className="h-16 w-16 rounded-full bg-white p-1 object-contain" />
          <p className="mt-3 max-w-xs">Residential care, rehabilitation and a dignified future for adults with special needs from Bangladesh Army families.</p>
        </div>
        {col("Explore", ["About", "Admission", "Facilities", "Governance", "Updates"])}
        {col("Care and services", ["Residential Care", "Medical & Therapy", "Vocational Development", "Day Care"])}
        {col("Contact", ["Address: to be added", "Phone: to be added", "Email: to be added"])}
      </div>
      <p className="mx-auto mt-10 max-w-7xl border-t border-white/20 px-5 pt-4">
        &copy; 2026 DISHARI Trust. Registered under the Societies Registration Act, 1860.
      </p>
    </footer>
  );
}