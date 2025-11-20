import Hero from "@/app/components/Hero";
import Expertise from "@/app/components/sections/Expertise";
import AboutSection from "@/app/components/sections/About";
import ServicesSection from "@/app/components/sections/Services";
import CaseStudies from "@/app/components/sections/CaseStudies";
import Testimonials from "@/app/components/sections/Testimonials";
import ProcessSection from "@/app/components/sections/Process";
import FAQ from "@/app/components/sections/FAQ";
import CTA from "@/app/components/sections/CTA";
import Contact from "@/app/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Expertise />
      <AboutSection />
      <ServicesSection />
      <CaseStudies />
      <Testimonials />
      <ProcessSection />
      <FAQ />
      <CTA />
      <Contact />
    </>
  );
}
