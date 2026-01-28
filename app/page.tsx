import Hero from "@/components/Hero";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Blueprint from "@/components/Blueprint";
import Works from "@/components/Works";
import Marquee from "@/components/Marquee";
import TechStack from "@/components/TechStack";
import PricingPlan from "@/components/PricingPlan";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#F4F4F4]">

      <Hero />
      <Marquee />
      <About />
      <Testimonials />
      <Blueprint />
      <Works />
      <TechStack />
      <PricingPlan />
    </main>
  );
}
