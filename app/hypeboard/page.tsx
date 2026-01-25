"use client";

import { motion } from "framer-motion";
import StatsGrid from "@/components/hypeboard/StatsGrid";
import LabGrid from "@/components/hypeboard/LabGrid";

export default function HypeboardPage() {
    return (
        <main className="w-full min-h-screen bg-[var(--background)] pt-32 pb-20">
            {/* Page Header */}
            <div className="px-6 md:px-12 mb-20">
                <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    className="overflow-hidden font-anton text-[15vw] leading-[0.8] uppercase tracking-tighter text-[var(--foreground)]"
                >
                    HYPEBOARD
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="flex justify-between items-end mt-4 border-t border-[var(--border)] pt-4"
                >
                    <p className="font-inter text-sm md:text-base font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                        Agency Pulse & Experiments
                    </p>
                    <p className="font-inter text-sm md:text-base font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                        EST. 2024
                    </p>
                </motion.div>
            </div>

            <StatsGrid />
            <LabGrid />

        </main>
    );
}
