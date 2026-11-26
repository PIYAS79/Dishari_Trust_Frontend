import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact - DISHARI Trust",
  description: "Contact DISHARI Trust",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory text-ink">
        {/* Hero */}
        <section className="relative h-[45vh] min-h-[420px] overflow-hidden">
          <Image
            src="/assets/Banner_Wide.jpeg"
            alt="DISHARI Trust"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/80 via-forest/55 to-transparent" />
          <div className="relative mx-auto flex h-full max-w-7xl items-end px-5 pb-16">
            <div className="max-w-2xl text-ivory">
              <p className="text-sm uppercase tracking-[0.3em] text-champ">Get in Touch</p>
              <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl">Contact With Us</h1>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-ivory py-24">
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-dish">Contact Details</p>
                <h2 className="mt-4 font-serif text-3xl text-forest sm:text-4xl">Reach Our Office</h2>
                <p className="mt-6 max-w-md text-dim">
                  Our team is here to assist with admission, medical, therapeutic, and general enquiries.
                </p>
              </div>
              <div className="divide-y divide-gold/20 border-y border-gold/20">
                {[
                  { label: "Office Address", value: "To be added" },
                  { label: "Phone Number", value: "To be added" },
                  { label: "Email Address", value: "To be added" },
                  { label: "Visiting Hours", value: "To be added" },
                ].map((item) => (
                  <div key={item.label} className="grid gap-2 py-6 sm:grid-cols-[180px_1fr] sm:items-baseline">
                    <dt className="text-sm uppercase tracking-widest text-dish">{item.label}</dt>
                    <dd className="font-serif text-xl text-forest">{item.value}</dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Location & Map */}
        <section className="bg-mist py-24">
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-dish">Location</p>
                <h2 className="mt-4 font-serif text-3xl text-forest sm:text-4xl">Find Us</h2>
                <p className="mt-6 text-dim">
                  Visit our campus to experience the care, environment, and community that define DISHARI Trust.
                </p>
              </div>
              <div className="overflow-hidden rounded-3xl border border-gold/20 shadow-lg">
                <iframe
                  title="DISHARI Trust location"
                  src="https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed"
                  className="h-[420px] w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-ivory py-24">
          <div className="mx-auto max-w-4xl px-5">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-dish">Enquiry</p>
              <h2 className="mt-4 font-serif text-3xl text-forest sm:text-4xl">Send a Message</h2>
              <p className="mt-4 text-dim">
                Share your enquiry and our team will get back to you.
              </p>
            </div>
            <form className="mt-12 space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-forest">Full Name</label>
                  <input
                    type="text"
                    className="mt-2 w-full border-b border-gold/40 bg-transparent px-0 py-2 text-ink focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest">Email Address</label>
                  <input
                    type="email"
                    className="mt-2 w-full border-b border-gold/40 bg-transparent px-0 py-2 text-ink focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-forest">Subject</label>
                <input
                  type="text"
                  className="mt-2 w-full border-b border-gold/40 bg-transparent px-0 py-2 text-ink focus:border-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-forest">Message</label>
                <textarea
                  rows={5}
                  className="mt-2 w-full border-b border-gold/40 bg-transparent px-0 py-2 text-ink focus:border-gold focus:outline-none"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="rounded-full border border-forest bg-forest px-8 py-3 text-sm font-medium uppercase tracking-widest text-ivory transition-colors hover:bg-dish"
                >
                  Send Enquiry
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Closing */}
        <section className="bg-forest py-16 text-center text-ivory">
          <div className="mx-auto max-w-3xl px-5">
            <p className="font-serif text-2xl sm:text-3xl">We are here to listen, support, and welcome you.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}