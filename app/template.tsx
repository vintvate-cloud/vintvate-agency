"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Check if we are on a single blog page (e.g. /signal/some-slug) but NOT the main signal page (/signal)
    // Actually, user said "when clicking a blog", so we want to skip transition specifically on [slug] pages.
    const isBlogPage = pathname?.startsWith('/signal/') && pathname !== '/signal';

    // 5 Columns for the stagger effect
    const columns = 5;

    if (isBlogPage) {
        return <>{children}</>;
    }

    return (
        <div className="relative w-full">
            {/* Transition Overlay */}
            <div className="fixed inset-0 z-[100] flex pointer-events-none h-screen w-screen">
                {[...Array(columns)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="h-full w-full bg-[#111] relative border-r border-white/5 last:border-r-0"
                        initial={{ y: 0 }}
                        animate={{ y: "-100%" }}
                        transition={{
                            duration: 0.8,
                            delay: i * 0.05, // Stagger effect
                            ease: [0.76, 0, 0.24, 1] // Custom bezier for smooth feel
                        }}
                    />
                ))}
            </div>

            {/* Content with Depth */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="w-full min-h-screen"
            >
                {children}
            </motion.div>
        </div>
    );
}
