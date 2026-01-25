import Hero from "@/components/Hero";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Blueprint from "@/components/Blueprint";
import Works from "@/components/Works";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#F4F4F4]">

      <Hero />
      <About />
      <Testimonials />
      <Blueprint />
      <Works />
    </main>
  );
}
