"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, MonitorPlay, Zap } from "lucide-react";
import Link from "next/link";

const services = [
    {
        id: "01",
        title: "Digital Architecture",
        icon: <Code2 className="w-8 h-8 md:w-12 md:h-12" />,
        description: "We build robust, scalable web systems using modern frameworks. No bloat, just performance.",
        tags: ["Next.js", "React", "Node.js", "System Design"],
        deliverables: ["Custom Web Applications", "E-Commerce Platforms", "SaaS Dashboards"]
    },
    {
        id: "02",
        title: "Immersive Experience",
        icon: <MonitorPlay className="w-8 h-8 md:w-12 md:h-12" />,
        description: "3D interactions and motion that make your brand feel alive and premium.",
        tags: ["WebGL", "Three.js", "GSAP", "Framer Motion"],
        deliverables: ["Interactive Landings", "3D Product Configurators", "Creative Portfolios"]
    },
    {
        id: "03",
        title: "Brand Intelligence",
        icon: <Zap className="w-8 h-8 md:w-12 md:h-12" />,
        description: "Strategic positioning and identity design that cuts through the noise.",
        tags: ["SEO", "Identity Design", "Copywriting", "Analytics"],
        deliverables: ["Brand Identity", "SEO Strategy", "Conversion Optimization"]
    }
];

export default function ServicesPage() {
    return (
        <main className="w-full min-h-screen bg-[var(--background)] pt-32 pb-20">
            {/* Header */}
            <div className="px-6 md:px-12 mb-20 md:mb-32">
                <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    className="overflow-hidden font-anton text-[15vw] leading-[0.8] uppercase tracking-tighter text-[var(--foreground)]"
                >
                    SERVICES
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end mt-8 border-t border-[var(--border)] pt-8"
                >
                    <p className="font-inter text-lg md:text-xl text-[var(--muted-foreground)] max-w-xl leading-relaxed">
                        We don&apos;t just make things look good. We engineer digital assets that drive real business growth.
                    </p>
                    <div className="mt-8 md:mt-0">
                        <Link href="/lets-work" className="inline-flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:opacity-80 transition-opacity">
                            Start a Project <ArrowUpRight size={16} />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Services List */}
            <section className="px-6 md:px-12 mb-32">
                <div className="flex flex-col gap-8 md:gap-12">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group border-t border-[var(--border)] pt-12 md:pt-16 hover:bg-[var(--card)] hover:px-8 hover:-mx-8 transition-all duration-500 rounded-lg"
                        >
                            <div className="flex flex-col md:flex-row gap-10 md:gap-20">
                                {/* ID & Icon */}
                                <div className="w-full md:w-1/4 flex justify-between items-start">
                                    <span className="font-mono text-sm md:text-base text-[var(--muted-foreground)]">
                                        ({service.id})
                                    </span>
                                    <div className="text-[var(--foreground)] opacity-50 group-hover:opacity-100 transition-opacity">
                                        {service.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="w-full md:w-3/4 flex flex-col lg:flex-row gap-10 lg:gap-20">
                                    <div className="flex-1">
                                        <h2 className="font-anton text-4xl md:text-6xl uppercase text-[var(--foreground)] mb-6">
                                            {service.title}
                                        </h2>
                                        <p className="font-inter text-lg text-[var(--muted-foreground)] leading-relaxed mb-8 max-w-lg group-hover:text-[var(--foreground)] transition-colors">
                                            {service.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {service.tags.map((tag, i) => (
                                                <span key={i} className="font-mono text-xs uppercase tracking-wider border border-[var(--border)] px-3 py-1 rounded-full text-[var(--muted-foreground)]">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Deliverables */}
                                    <div className="lg:w-1/3 border-l border-[var(--border)] pl-8 lg:pl-12 hidden md:block">
                                        <h3 className="font-inter font-bold uppercase tracking-widest text-sm text-[var(--foreground)] mb-6">
                                            Deliverables
                                        </h3>
                                        <ul className="flex flex-col gap-4">
                                            {service.deliverables.map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-[var(--muted-foreground)]">
                                                    <span className="w-1.5 h-1.5 bg-[var(--foreground)] rounded-full" />
                                                    <span className="font-inter text-sm">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 md:px-12">
                <div className="bg-[var(--foreground)] text-[var(--background)] p-8 md:p-20 rounded-2xl overflow-hidden relative">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                        <div>
                            <h2 className="font-anton text-4xl md:text-6xl uppercase mb-4">
                                Ready to scale?
                            </h2>
                            <p className="font-inter text-lg opacity-80 max-w-md">
                                Let&apos;s build something that makes your competition irrelevant.
                            </p>
                        </div>
                        <Link href="/lets-work" className="bg-[var(--background)] text-[var(--foreground)] px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                            Initiate Protocol
                        </Link>
                    </div>
                    {/* Abstract bg element */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                </div>
            </section>
        </main>
    );
}
