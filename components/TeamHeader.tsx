"use client";

import { motion } from "framer-motion";

export default function TeamHeader() {
    return (
        <div className="px-6 md:px-12 mb-20 max-w-screen-2xl mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-anton text-[15vw] md:text-[12vw] leading-[0.8] uppercase tracking-tighter text-[var(--foreground)] mix-blend-multiply dark:mix-blend-normal"
            >
                THE<br />MINDS.
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-inter text-lg md:text-xl text-[var(--muted-foreground)] mt-8 max-w-md"
            >
                The collective intelligence behind the agency. Artists, engineers, and strategists obsessed with the new.
            </motion.p>
        </div>
    );
}
