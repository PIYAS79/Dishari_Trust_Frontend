import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NoticeMarquee from "@/components/NoticeMarquee";
import QuickLinks from "@/components/QuickLinks";
import Identity from "@/components/Identity";
import Philosophy from "@/components/Philosophy";
import AdministrativeBody from "@/components/Administrative_Body";
import Services from "@/components/Services";
import Facilities from "@/components/Facilities";
// import OurServices from "@/components/OurServices";
import Building from "@/components/Building";
// import Journey from "@/components/Journey";
import Admission from "@/components/Admission";
import Support from "@/components/Support";
import News from "@/components/News";
import Gallery from "@/components/Gallery";
import Sponsors from "@/components/Sponsors";
// import Blog from "@/components/Blog";
import GuardianFeedback from "@/components/GuardianFeedback";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <NoticeMarquee />
        <QuickLinks />
        <Identity />
        {/* <Philosophy /> */}
        <AdministrativeBody />
        <Services />
        <Facilities />
        {/* <OurServices /> */}
        <Building />
        {/* <Journey /> */}
        <Admission />
        <Support />
        <News />
        <Gallery />
        {/* <Blog /> */}
        <GuardianFeedback />
        <Sponsors />
      </main>
      <Footer />
    </>
  );
}