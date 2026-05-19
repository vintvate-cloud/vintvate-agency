"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
    id: string;
    title: string;
    description: string | null;
    image: string | null;
    tags: string | null;
    link: string | null;
    type: string | null;
    createdAt: Date;
};

export default function ProductAppCarousel({ projects }: { projects: Project[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!projects || projects.length === 0) return null;

    const next = () => setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    const prev = () => setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    const currentApp = projects[currentIndex];

    if (!currentApp) return null;

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 max-w-5xl mx-auto py-8">
            {/* Phone Mockup Side */}
            <div className="relative w-[240px] sm:w-[280px] md:w-[320px] aspect-[9/19.5] flex-shrink-0 bg-black rounded-[2.5rem] md:rounded-[3rem] border-[8px] md:border-[12px] border-zinc-800 shadow-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
                {/* Notch */}
                <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-20">
                    <div className="w-32 h-7 bg-zinc-800 rounded-b-3xl relative flex items-center justify-center gap-2">
                        <div className="w-12 h-1.5 bg-zinc-900 rounded-full"></div>
                        <div className="w-2.5 h-2.5 bg-zinc-900 rounded-full"></div>
                    </div>
                </div>
                
                {/* Screen */}
                <div className="relative w-full h-full bg-zinc-900 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={currentApp.image || "/placeholder-project.jpg"}
                                alt={currentApp.title}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
                
                {/* Controls */}
                {projects.length > 1 && (
                    <>
                        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full text-white flex items-center justify-center z-30 hover:bg-black/60 transition">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full text-white flex items-center justify-center z-30 hover:bg-black/60 transition">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </>
                )}
            </div>

            {/* App Details Side */}
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6 flex flex-col items-center md:items-start w-full"
                    >
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--foreground)]/50">
                            MOBILE APP
                        </span>
                        <h2 className="font-anton text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide text-[var(--foreground)]">
                            {currentApp.title}
                        </h2>
                        
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            {currentApp.tags && currentApp.tags.split(",").map((t, i) => (
                                <span key={i} className="text-[10px] md:text-xs font-bold font-inter uppercase tracking-widest border border-[var(--foreground)]/20 px-3 py-1.5 rounded-full text-[var(--foreground)] opacity-70">
                                    {t.trim()}
                                </span>
                            ))}
                        </div>

                        <p className="font-inter text-sm md:text-base opacity-70 leading-relaxed max-w-md text-[var(--foreground)]">
                            {currentApp.description}
                        </p>

                        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
                            {currentApp.link ? (
                                <a
                                    href={currentApp.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-inter text-sm font-bold uppercase tracking-widest bg-[var(--foreground)] text-[var(--background)] px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
                                >
                                    Download App <ArrowUpRight className="w-4 h-4" />
                                </a>
                            ) : (
                                <span className="inline-flex items-center gap-2 font-inter text-sm font-bold uppercase tracking-widest bg-[var(--foreground)]/10 text-[var(--foreground)]/40 px-6 py-3 rounded-full">
                                    Coming Soon
                                </span>
                            )}
                            <Link
                                href={`/works/${currentApp.id}`}
                                className="inline-flex items-center gap-2 font-inter text-sm font-bold uppercase tracking-widest border-b border-[var(--foreground)] pb-1 hover:opacity-70 transition-opacity text-[var(--foreground)]"
                            >
                                View Case Study <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Pagination Indicators */}
                {projects.length > 1 && (
                    <div className="flex items-center gap-3 pt-8">
                        {projects.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    idx === currentIndex ? "w-8 bg-[var(--foreground)]" : "w-2 bg-[var(--foreground)]/20 hover:bg-[var(--foreground)]/50"
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
