import Hero from "@/components/Hero";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Blueprint from "@/components/Blueprint";
import Works from "@/components/Works";
import Manifesto from "@/components/Manifesto";
import Marquee from "@/components/Marquee";
import PricingPlan from "@/components/PricingPlan";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let projects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];
  try {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5, // Limit strictly for the homepage scroll
    });
  } catch (err) {
    console.error('[Home] DB unavailable, rendering with empty projects:', err);
  }

  return (
    <main className="w-full min-h-screen bg-[#F4F4F4]">

      <Hero />
      <Marquee />
      <About />
      <Manifesto />
      <Blueprint />
      <Works projects={projects} />
      <Testimonials />
      <PricingPlan />
    </main>
  );
}
