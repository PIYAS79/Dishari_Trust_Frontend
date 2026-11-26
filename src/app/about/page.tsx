import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import {
  Eye,
  Target,
  Heart,
  ShieldCheck,
  Users,
  Sparkles,
  Home,
  Stethoscope,
  Activity,
  Briefcase,
  Utensils,
  Smile,
  Clock,
} from "lucide-react";

export const metadata = {
  title: "About - DISHARI Trust",
  description: "About DISHARI Trust",
};

const services = [
  { icon: Home, title: "Residential Care & Accommodation", desc: "A permanent, supportive home with comfortable living spaces." },
  { icon: Stethoscope, title: "Medical & Clinical Support", desc: "Health monitoring, consultation and clinical care." },
  { icon: Activity, title: "Therapeutic & Rehabilitation Services", desc: "Individualized therapy for functional development." },
  { icon: Briefcase, title: "Vocational Training & Skill Development", desc: "Practical skills for creativity and independence." },
  { icon: Utensils, title: "Daily Living & Independent Life Skills", desc: "Support for everyday routines and self-reliance." },
  { icon: Smile, title: "Recreational & Social Activities", desc: "Engagement, joy and community participation." },
  { icon: Clock, title: "Day Care & Community Support", desc: "Structured daytime care for eligible members." },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory text-ink">
        {/* Hero */}
        <section className="relative h-[62vh] min-h-[420px] overflow-hidden">
          <Image
            src="/assets/Banner_Wide.jpeg"
            alt="DISHARI Trust community"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/85 via-forest/60 to-transparent" />
          <div className="relative mx-auto flex h-full max-w-7xl items-center px-5">
            <div className="max-w-2xl text-ivory">
              <p className="text-sm uppercase tracking-widest text-champ">About DISHARI Trust</p>
              <h1 className="mt-4 font-serif text-4xl sm:text-5xl">A Place Where Every Life Matters</h1>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-ivory py-24">
          <div className="mx-auto max-w-4xl px-5 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-dish">Our Story</p>
            <h2 className="mt-3 font-serif text-3xl text-forest sm:text-4xl">Built on Care, Dignity and Belonging</h2>
            <p className="mt-6 text-dim text-justify">
              DISHARI Trust is a home built on care, dignity and belonging. We stand beside adults with special needs from Bangladesh Army families, offering a permanent residence where therapy, medical support and practical training come together under one roof.
            </p>
            <p className="mt-4 text-dim text-justify">
              Our purpose is to provide long-term support beyond childhood, creating an inclusive environment where every individual is valued, supported and given the chance to thrive.
            </p>
          </div>
        </section>

        {/* Vision, Mission, Philosophy */}
        <section className="bg-mist py-24">
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="border-t-2 border-gold pt-6">
                <Eye className="h-6 w-6 text-gold" />
                <h3 className="mt-4 font-serif text-2xl text-forest">Our Vision</h3>
                <p className="mt-3 text-dim text-justify">
                  Building an inclusive society where every individual with special needs can live with dignity, security, independence and a sense of belonging.
                </p>
              </div>
              <div className="border-t-2 border-gold pt-6">
                <Target className="h-6 w-6 text-gold" />
                <h3 className="mt-4 font-serif text-2xl text-forest">Our Mission</h3>
                <p className="mt-3 text-dim text-justify">
                  Providing comprehensive care, rehabilitation, therapeutic support, skill development and opportunities for meaningful participation in everyday life.
                </p>
              </div>
              <div className="border-t-2 border-gold pt-6">
                <Heart className="h-6 w-6 text-gold" />
                <h3 className="mt-4 font-serif text-2xl text-forest">Our Philosophy</h3>
                <p className="mt-3 text-dim text-justify">
                  We believe that every individual deserves respect, opportunities and the freedom to develop their abilities. Support should not create dependency; it should empower individuals to live as independently and meaningfully as possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services & Support Framework */}
        <section className="bg-ivory py-24">
          <div className="mx-auto max-w-7xl px-5">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-dish">Our Support System</p>
              <h2 className="mt-3 font-serif text-3xl text-forest sm:text-4xl">Services & Support Framework</h2>
            </div>
            <div className="mt-12 divide-y divide-gold/20 border-y border-gold/2 ">
              {services.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="grid gap-4 py-6 sm:grid-cols-[auto_1fr_2fr] sm:items-center">
                    <Icon className="h-6 w-6 text-gold" />
                    <h3 className="font-serif text-xl text-forest">{s.title}</h3>
                    <p className="text-sm text-dim ml-auto">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Commitment */}
        <section className="relative overflow-hidden py-24">
          <Image
            src="/assets/about/commitment.jpg"
            alt="Care and companionship"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-forest/80" />
          <div className="relative mx-auto max-w-4xl px-5 text-center text-ivory">
            <p className="text-sm uppercase tracking-widest text-champ">Our Commitment</p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
              Every individual deserves a future filled with dignity, opportunity and belonging.
            </h2>
            <p className="mt-6 text-mist/90">
              Long-term care and support beyond childhood, so every special adult can live meaningfully.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}