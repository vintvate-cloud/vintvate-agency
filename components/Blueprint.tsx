"use client";

import { motion } from "framer-motion";

const steps = [
    {
        number: "01",
        title: "Discovery",
        description: "We don't guess. We investigate. We tear down your current presence to find the cracks, then we map out the territory for total domination.",
        color: "bg-[#576A8F] text-white", // Custom Blue
        deliverables: ["Brand Audit", "Competitor Recon", "User Personas", "Technical Roadmap"]
    },
    {
        number: "02",
        title: "Strategy",
        description: "A website without a strategy is just decoration. We build a battle plan focused on conversion, user psychology, and brand authority.",
        color: "bg-[#B7BDF7] text-[#1a1a1a]", // Custom Periwinkle
        deliverables: ["UX Architecture", "Content Strategy", "Conversion Funnels", "Wireframes"]
    },
    {
        number: "03",
        title: "Attack",
        description: "Design and Development. We build the war machine using cutting-edge tech. No templates. No bloat. Pure performance.",
        color: "bg-[#FFF8DE] text-[#1a1a1a]", // Custom Cream
        deliverables: ["High-Fidelity UI", "WebGL Interactions", "Next.js Development", "CMS Integration"]
    },
    {
        number: "04",
        title: "Launch",
        description: "We don't just push live; we launch. We monitor, we optimize, and we ensure your digital presence destroys the competition.",
        color: "bg-[#FF7444] text-white", // Custom Orange
        deliverables: ["QA & Testing", "SEO Optimization", "Analytics Setup", "Post-Launch Support"]
    }
];

export default function Blueprint() {
    return (
        <section className="w-full py-20 md:py-32 px-6 md:px-12 bg-[var(--background)] relative z-20">
            <div className="max-w-screen-2xl mx-auto mb-20">
                <p className="font-anton text-sm uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
                    The Blueprint
                </p>
                <h2 className="font-anton text-4xl md:text-7xl uppercase text-[var(--foreground)]">
                    How We<br /><span className="text-[var(--muted-foreground)]">Take Over.</span>
                </h2>
            </div>

            <div className="flex flex-col gap-8 w-full max-w-screen-2xl mx-auto">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 1, y: 0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className={`sticky top-[var(--top-mobile)] md:top-[var(--top-desktop)] flex flex-col md:flex-row gap-8 md:gap-20 p-6 md:p-12 border border-[var(--foreground)] rounded-sm ${step.color}`}
                        style={{
                            "--top-mobile": `${4 + index * 3}rem`,
                            "--top-desktop": `${8 + index * 3}rem`
                        } as React.CSSProperties}
                    >
                        <div className="md:w-1/4">
                            <div className="font-anton text-6xl md:text-9xl opacity-20 leading-none">
                                {step.number}
                            </div>
                        </div>

                        <div className="md:w-3/4 flex flex-col gap-8">
                            <div>
                                <h3 className="font-anton text-4xl md:text-6xl uppercase mb-4">
                                    {step.title}
                                </h3>
                                <p className="font-inter text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl">
                                    {step.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[currentColor] opacity-100">
                                {step.deliverables.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-current rounded-full" />
                                        <span className="font-inter text-sm font-bold uppercase tracking-wider">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            {/* Spacer to allow the last card to be fully viewed before next section */}
            <div className="h-[20vh]"></div>
        </section>
    );
}
