"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const FEATURES = [
    "Digital Strategy & Consulting",
    "Custom UI/UX Architecture",
    "Next.js 15 & Framer Motion",
    "Responsive Mobile Optimization",
    "SEO & Performance Tuning",
    "Deployment & Handoff",
];

export default function PricingPlan() {
    return (
        <section className="w-full py-12 md:py-24 border-t border-black/10 dark:border-white/10 bg-[#F4F4F4] dark:bg-black transition-colors duration-500">
            <h2 className="font-anton text-4xl mb-12 text-black dark:text-white opacity-80 text-right pr-4 border-r-4 border-black dark:border-white">
                INITIATION<br />PROTOCOL
            </h2>

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative border-2 border-black dark:border-white bg-white dark:bg-[#0a0a0a] p-8 md:p-12 overflow-hidden group transition-colors duration-500"
                >
                    {/* "Classified" Stamp Effect */}
                    <div className="absolute -right-12 -top-12 w-48 h-48 bg-black/5 dark:bg-white/5 rounded-full blur-3xl group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors duration-500" />

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 relative z-10">
                        <div>
                            <span className="font-mono text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                                [ BASE OPERATION ]
                            </span>
                            <h3 className="font-anton text-5xl md:text-7xl mt-2 text-black dark:text-white">
                                ₹10,000
                            </h3>
                            <p className="font-mono text-xs mt-2 text-black dark:text-white">
                                / ONE-TIME ENGAGEMENT
                            </p>
                        </div>
                        <div className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-500">
                            LIMITED AVAILABILITY
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 relative z-10">
                        {FEATURES.map((feat, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-5 h-5 border border-black dark:border-white flex items-center justify-center transition-colors duration-500">
                                    <Check size={12} className="text-black dark:text-white" />
                                </div>
                                <span className="font-sans text-sm md:text-base font-medium text-black/80 dark:text-white/80 uppercase">
                                    {feat}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <Link href="/lets-work" className="block relative z-10 group/btn">
                        <div className="w-full bg-black dark:bg-white text-white dark:text-black py-6 text-center font-anton text-2xl uppercase tracking-widest hover:bg-black/90 dark:hover:bg-white/90 transition-colors duration-300">
                            Initiate Project
                        </div>
                    </Link>

                    {/* Background Noise */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-[100%] brightness-[100%]" />
                </motion.div>
            </div>
        </section>
    );
}
