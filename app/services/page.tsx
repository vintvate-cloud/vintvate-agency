"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Minus } from "lucide-react";
import Link from "next/link";

const SERVICES_DATA = [
    {
        id: "01",
        title: "WEB DEVELOPMENT",
        description: "We forge hyper-tactile, high-performance websites that refuse to be ignored. Custom logic, fluid motion, and absolute structural integrity. If you want a basic template, this isn't the agency for you.",
        tags: ["Next.js", "React", "GSAP", "WebGL", "Three.js"],
        deliverables: ["Business Websites", "Full Stack Platforms", "SaaS Applications"]
    },
    {
        id: "02",
        title: "APP DEVELOPMENT",
        description: "Native and cross-platform architecture. We engineer unbreakable backends and fluid frontends designed specifically for absolute user retention and infinite scalability.",
        tags: ["React Native", "TypeScript", "Node.js", "PostgreSQL", "Expo"],
        deliverables: ["React Native Apps", "Cross-Platform Platforms", "Mobile Dashboards"]
    },
    {
        id: "03",
        title: "AI AUTOMATIONS",
        description: "We engineer autonomous, intelligent systems and custom LLM integrations that can replace entire departments, streamline ops, and scale your output without friction.",
        tags: ["Python", "OpenAI / LLMs", "LangChain", "Autonomous Workflows"],
        deliverables: ["Custom AI Agents", "Workflow Automation", "Data Processing Systems"]
    },
    {
        id: "04",
        title: "SEO",
        description: "We don't do basic rank tracking. We architect deep technical SEO strategies explicitly designed to monopolize search results and completely erase your competitors from page one.",
        tags: ["Technical SEO", "Schema Markup", "Semantic HTML", "Performance Audits"],
        deliverables: ["Deep Technical Audits", "Core Web Vitals Boost", "Migration Support"]
    }
];

export default function ServicesPage() {
    // Tracks which vault panel is currently open
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // Default to first open

    const handleToggle = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <main className="w-full min-h-screen bg-background text-foreground pt-32 pb-20 overflow-x-hidden selection:bg-foreground selection:text-background">

            {/* ─── Header Section ─── */}
            <div className="px-6 md:px-12 mb-16 md:mb-24 max-w-screen-2xl mx-auto w-full">
                <div className="flex justify-between items-start w-full border-b border-foreground/10 pb-8 mb-12">
                    <span className="font-mono text-xs uppercase tracking-[0.4em] text-foreground/40">
                        [02] // The Operating System
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.4em] text-foreground/40 text-right">
                        ARSENAL<br />SERVICES
                    </span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-end gap-12 md:gap-0">
                    <motion.h1
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                        className="font-anton text-[16vw] md:text-[14vw] leading-[0.8] uppercase tracking-tighter text-foreground m-0 p-0"
                    >
                        THE Core<br />
                        <span className="text-black">
                            OFFERINGS.
                        </span>
                    </motion.h1>

                    <div className="max-w-sm pb-2">
                        <p className="font-inter text-sm md:text-base leading-relaxed text-foreground/60 tracking-wider">
                            We don't just make things look good. We engineer high-leverage digital assets designed to scale your authority and crush your market.
                        </p>
                    </div>
                </div>
            </div>

            {/* ─── Vault Accordion Section ─── */}
            <section className="px-6 md:px-12 w-full max-w-screen-2xl mx-auto">
                <div className="border-t border-b border-foreground/20">
                    {SERVICES_DATA.map((service, index) => {
                        const isOpen = expandedIndex === index;

                        return (
                            <div
                                key={service.id}
                                className="group relative border-b border-foreground/20 last:border-b-0"
                            >
                                {/* Default Strip (Always visible) */}
                                <button
                                    onClick={() => handleToggle(index)}
                                    className="w-full flex items-center justify-between py-8 md:py-12 px-2 hover:bg-foreground/[0.02] transition-colors focus:outline-none"
                                >
                                    <div className="flex items-center gap-8 md:gap-16">
                                        <span className="font-mono text-sm tracking-[0.2em] text-foreground/30 hidden md:inline-block">
                                            {service.id}.
                                        </span>
                                        <h2
                                            className={`font-anton text-4xl md:text-7xl uppercase tracking-wide text-left transition-colors duration-300 ${isOpen ? "text-foreground" : "text-foreground/40"}`}
                                        >
                                            {service.title}
                                        </h2>
                                    </div>
                                    <div className="text-foreground/40 group-hover:text-foreground transition-colors p-4">
                                        {isOpen ? <Minus size={32} /> : <Plus size={32} />}
                                    </div>
                                </button>

                                {/* Expanding Vault Content */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                                            className="overflow-hidden bg-foreground/[0.02]"
                                        >
                                            <div className="pt-8 pb-16 px-4 md:px-16 flex flex-col lg:flex-row gap-12 lg:gap-24">

                                                {/* Left text block */}
                                                <div className="flex-1 max-w-2xl">
                                                    <p className="font-inter text-lg md:text-xl text-foreground/80 leading-relaxed mb-10">
                                                        {service.description}
                                                    </p>

                                                    <div className="flex flex-wrap gap-2 mb-10">
                                                        {service.tags.map((tag, i) => (
                                                            <span key={i} className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] border border-foreground/10 px-4 py-2 text-foreground/50 bg-foreground/[0.02]">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    <Link
                                                        href="/lets-work"
                                                        className="inline-flex items-center gap-4 text-sm font-anton uppercase tracking-widest text-foreground hover:text-foreground/60 transition-colors border-b border-foreground/30 pb-2 hover:border-foreground w-fit"
                                                    >
                                                        Deploy Routine <ArrowRight size={16} />
                                                    </Link>
                                                </div>

                                                {/* Right Data block (Deliverables) */}
                                                <div className="w-full lg:w-1/3 border-t lg:border-t-0 lg:border-l border-foreground/10 pt-8 lg:pt-0 lg:pl-12">
                                                    <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/30 mb-8 border-b border-foreground/10 pb-4">
                                                        Output Arrays
                                                    </h3>
                                                    <ul className="flex flex-col gap-6">
                                                        {service.deliverables.map((item, i) => (
                                                            <li key={i} className="flex items-start gap-4">
                                                                <span className="w-1.5 h-1.5 bg-foreground/50 rounded-sm mt-1.5 shrink-0" />
                                                                <span className="font-inter text-sm tracking-wide text-foreground/70">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
