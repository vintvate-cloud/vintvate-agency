"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "They didn't just build a website. They built a war machine.",
        author: "CEO, Stealth Startup",
        role: "Series A Funded"
    },
    {
        quote: "Vintvate destroyed our old identity and gave us a legacy.",
        author: "Sarah Jenkins",
        role: "Director of Brand"
    },
    {
        quote: "The ROI was immediate. These guys simply don't miss.",
        author: "Marcus Thorne",
        role: "Founder, Apex Capital"
    }
];

export default function Testimonials() {
    return (
        <section className="w-full pt-32 md:pt-48 pb-10 md:pb-20 bg-[var(--background)] relative z-20 overflow-hidden">
            <div className="px-6 md:px-12 mb-12">
                <div className="w-full h-[1px] bg-[var(--border)]"></div>
                <p className="font-anton text-sm uppercase tracking-widest text-[var(--muted-foreground)] mt-8">
                    Client Love
                </p>
            </div>

            {/* Horizontal Scroll Container */}
            <div
                className="w-full overflow-x-auto flex gap-6 md:gap-8 snap-x snap-mandatory scroll-pl-6 md:scroll-pl-12 pb-12 px-6 md:px-12"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="min-w-[85vw] md:min-w-[40vw] lg:min-w-[30vw] snap-center bg-[var(--card)] border border-[var(--border)] p-8 md:p-12 flex flex-col justify-between h-[400px] hover:border-[var(--foreground)] transition-colors group"
                    >
                        <h2 className="font-anton text-3xl md:text-4xl leading-tight uppercase text-[var(--foreground)]">
                            &quot;{testimonial.quote}&quot;
                        </h2>

                        <div className="flex items-center gap-4 mt-8">
                            <div className="w-8 h-[1px] bg-[var(--muted-foreground)] group-hover:bg-[var(--foreground)] transition-colors"></div>
                            <div>
                                <p className="font-inter font-bold text-base text-[var(--foreground)] uppercase tracking-wide">
                                    {testimonial.author}
                                </p>
                                <p className="font-inter text-xs text-[var(--muted-foreground)] uppercase tracking-widest">
                                    {testimonial.role}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
