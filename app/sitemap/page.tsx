import type { Metadata } from "next";
import GridBackground from "@/components/GridBackground";
import InteractiveSitemap from "@/components/InteractiveSitemap";
import PricingPlan from "@/components/PricingPlan";

export const metadata: Metadata = {
    title: "System Directory | Vintvate",
    description: "Full operational map and initiation protocols.",
};

export default function SitemapPage() {
    return (
        <main className="min-h-screen pt-32 pb-24">
            <GridBackground />

            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
                <InteractiveSitemap />
            </div>
        </main>
    );
}
