"use client";

import { motion } from "framer-motion";

const ITEMS = [
    "STRATEGY", "DESIGN", "DEVELOPMENT", "DOMINATION", "IMPACT", "FUTURE",
    "STRATEGY", "DESIGN", "DEVELOPMENT", "DOMINATION", "IMPACT", "FUTURE"
];

export default function Marquee() {
    return (
        <section className="w-full bg-black py-4 md:py-6 overflow-hidden border-y border-white/10 dark:border-white/5">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex gap-8 md:gap-16 items-center"
                    animate={{ x: "-50%" }}
                    transition={{
                        ease: "linear",
                        duration: 20,
                        repeat: Infinity,
                    }}
                >
                    {[...ITEMS, ...ITEMS].map((item, index) => (
                        <div key={index} className="flex items-center gap-8 md:gap-16">
                            <span className="font-anton text-2xl md:text-5xl text-white tracking-widest uppercase opacity-90">
                                {item}
                            </span>
                            <span className="w-2 h-2 bg-white rounded-full opacity-50" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
