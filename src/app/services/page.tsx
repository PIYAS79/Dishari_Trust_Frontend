import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Services - DISHARI Trust",
  description: "Services provided by DISHARI Trust",
};

const services = [
  {
    title: "Residential Care & Accommodation",
    description:
      "Providing a safe and supportive residential environment with comfortable accommodation, personal care, daily living assistance, catering, housekeeping, and long-term supervision.",
    image: "/assets/services/Residential%20Care%20%26%20Accommodation.jpeg",
  },
  {
    title: "Advanced Clinical & Medical Care",
    description:
      "Developing specialized medical and clinical facilities tailored to individual healthcare needs, including medical consultation, first aid, health monitoring, and appropriate clinical support.",
    image: "/assets/services/Advanced%20Clinical%20%26%20Medical%20Care.jpeg",
  },
  {
    title: "Specialized Therapeutic & Rehabilitation Services",
    description:
      "Providing individualized therapeutic support and rehabilitation activities to encourage functional development, confidence, participation, and greater independence in everyday life.",
    image: "/assets/services/Specialized%20Therapeutic%20%26%20Rehabilitation%20Services.jpeg",
  },
  {
    title: "Vocational Training & Skill Development",
    description:
      "Creating opportunities to develop practical skills through cooking, bakery, basic digital learning, arts and crafts, and gardening, encouraging creativity and greater independence.",
    image: "/assets/services/Vocational%20Training%20%26%20Skill%20Development.jpeg",
  },
  {
    title: "Day-Care & Non-Residential Support",
    description:
      "Extending day-care, medical consultation, and therapeutic support to eligible non-residential members of Bangladesh Army families through structured daytime activities and rehabilitation opportunities.",
    image: "/assets/services/Day-Care%20%26%20Non-Residential%20Support.jpeg",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory text-ink">
        <section className="relative h-[50vh] min-h-[360px] overflow-hidden">
          <Image
            src="/assets/Banner_Wide.jpeg"
            alt="DISHARI services"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/85 via-forest/60 to-transparent" />
          <div className="relative mx-auto flex h-full max-w-7xl items-center justify-center px-5 text-center">
            <div className="max-w-2xl text-ivory">
              <p className="text-sm uppercase tracking-widest text-champ">Care & Development</p>
              <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Our Services</h1>
              <p className="mt-6 text-lg text-mist/90">
                Comprehensive care, rehabilitation and skill development for adults with special needs.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-ivory py-24">
          <div className="mx-auto max-w-7xl px-5">
            <div className="space-y-20">
              {services.map((service, index) => {
                const reverse = index % 2 === 1;
                return (
                  <div
                    key={service.title}
                    className={`grid items-center gap-12 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
                      <Image src={service.image} alt={service.title} fill className="object-cover" />
                    </div>
                    <div>
                      <h2 className="font-serif text-3xl text-forest">{service.title}</h2>
                      <p className="mt-4 text-dim text-justify">{service.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-forest py-20 text-center text-ivory">
          <div className="mx-auto max-w-4xl px-5">
            <h2 className="font-serif text-3xl sm:text-4xl">Care that empowers, supports and belongs.</h2>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}