import Hero from "@/components/Hero";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Blueprint from "@/components/Blueprint";
import Works from "@/components/Works";
import Marquee from "@/components/Marquee";
import TechStack from "@/components/TechStack";
import PricingPlan from "@/components/PricingPlan";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5 // Limit strictly for the homepage scroll
  });

  return (
    <main className="w-full min-h-screen bg-[#F4F4F4]">

      <Hero />
      <Marquee />
      <About />
      <Testimonials />
      <Blueprint />
      <Works projects={projects} />
      <TechStack />
      <PricingPlan />
    </main>
  );
}
