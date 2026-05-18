"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Monitor, Smartphone, LayoutTemplate, ChevronLeft, ChevronRight } from "lucide-react";
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

type Tab = "website" | "app" | "template";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "website", label: "Website", icon: <Monitor className="w-3.5 h-3.5" /> },
    { id: "app", label: "App", icon: <Smartphone className="w-3.5 h-3.5" /> },
    { id: "template", label: "Template", icon: <LayoutTemplate className="w-3.5 h-3.5" /> },
];

function matchesTab(project: Project, tab: Tab): boolean {
    if (tab === "template") return project.type === "TEMPLATE";
    if (tab === "app")     return project.type === "APP";
    if (tab === "website") return project.type === "WEBSITE" || project.type === "CLIENT" || !project.type;
    return false;
}

function AppCarouselView({ projects }: { projects: Project[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    const prev = () => setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    const currentApp = projects[currentIndex];

    if (!currentApp) return null;

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 max-w-5xl mx-auto py-8" style={{ animation: "worksGridFadeIn 0.4s ease-out" }}>
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
                        <h2 className="font-anton text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide">
                            {currentApp.title}
                        </h2>
                        
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            {currentApp.tags && currentApp.tags.split(",").map((t, i) => (
                                <span key={i} className="text-[10px] md:text-xs font-bold font-inter uppercase tracking-widest border border-[var(--foreground)]/20 px-3 py-1.5 rounded-full opacity-70">
                                    {t.trim()}
                                </span>
                            ))}
                        </div>

                        <p className="font-inter text-sm md:text-base opacity-70 leading-relaxed max-w-md">
                            {currentApp.description}
                        </p>

                        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
                            <Link
                                href={`/works/${currentApp.id}`}
                                className="inline-flex items-center gap-2 font-inter text-sm font-bold uppercase tracking-widest bg-[var(--foreground)] text-[var(--background)] px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
                            >
                                View Case Study <ArrowUpRight className="w-4 h-4" />
                            </Link>
                            {currentApp.link && (
                                <a
                                    href={currentApp.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-inter text-sm font-bold uppercase tracking-widest border-b border-[var(--foreground)] pb-1 hover:opacity-70 transition-opacity"
                                >
                                    Live App <ArrowUpRight className="w-4 h-4" />
                                </a>
                            )}
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

export default function WorksToggle({ projects }: { projects: Project[] }) {
    const [active, setActive] = useState<Tab>("website");

    const filtered = projects.filter((p) => matchesTab(p, active));

    return (
        <>
            {/* Toggle Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-0 mb-12 md:mb-16">
                <div
                    className="flex items-center gap-1 p-1 rounded-full border border-[var(--border)] bg-[var(--background)] w-full sm:w-auto overflow-x-auto scrollbar-hide"
                    style={{ boxShadow: "0 2px 16px 0 rgba(0,0,0,0.07)" }}
                >
                    {TABS.map((tab) => {
                        const isActive = active === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActive(tab.id)}
                                className={`
                                    relative flex-1 sm:flex-none flex justify-center items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full
                                    font-inter text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap
                                    transition-all duration-300 ease-out
                                    ${isActive
                                        ? "bg-[var(--foreground)] text-[var(--background)] shadow-sm"
                                        : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                    }
                                `}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Project count */}
                <span className="font-inter text-[10px] sm:text-xs uppercase tracking-widest text-[var(--muted-foreground)] pl-2 sm:pl-0">
                    {filtered.length} project{filtered.length !== 1 ? "s" : ""}
                </span>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <div className="border border-dashed border-[var(--border)] p-20 text-center">
                    <p className="font-inter text-sm text-[var(--muted-foreground)]">
                        No {active} projects yet. Add some from the admin panel.
                    </p>
                </div>
            ) : active === "app" ? (
                <AppCarouselView projects={filtered} />
            ) : (
                <div
                    key={active}
                    className={`grid gap-x-8 gap-y-16 ${
                        active === "template"
                            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1 md:grid-cols-2"
                    }`}
                    style={{ animation: "worksGridFadeIn 0.4s ease-out" }}
                >
                    {filtered.map((project) => (
                        <Link
                            href={`/works/${project.id}`}
                            key={project.id}
                            className="group block"
                        >
                            <div className={`relative w-full overflow-hidden rounded-lg mb-6 border border-[var(--border)] ${active === "template" ? "aspect-video" : "aspect-[4/3]"}`}>
                                {project.image ? (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className={`transition-transform duration-700 group-hover:scale-105 ${active === "template" ? "object-cover object-top" : "object-cover"}`}
                                    />
                                ) : project.link ? (
                                    <img
                                        src={`https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url`}
                                        alt={project.title}
                                        className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${active === "template" ? "object-cover object-top" : "object-cover"}`}
                                        loading="lazy"
                                    />
                                ) : (
                                    <Image
                                        src="/placeholder-project.jpg"
                                        alt={project.title}
                                        fill
                                        className={`transition-transform duration-700 group-hover:scale-105 ${active === "template" ? "object-cover object-top" : "object-cover"}`}
                                    />
                                )}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                                {/* Template badge */}
                                {active === "template" && (
                                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold font-inter uppercase tracking-widest px-2 py-1">
                                        Template
                                    </div>
                                )}

                                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ArrowUpRight className="w-5 h-5 text-white" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <h2
                                        className={`font-anton uppercase ${
                                            active === "template"
                                                ? "text-2xl md:text-3xl"
                                                : "text-3xl md:text-4xl"
                                        }`}
                                    >
                                        {project.title}
                                    </h2>
                                    <div className="flex flex-col items-end gap-1 mt-1">
                                        <span className="font-inter text-xs uppercase tracking-widest opacity-60">
                                            {new Date(project.createdAt).getFullYear()}
                                        </span>
                                        {project.link && active === "template" && (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    window.open(project.link!, "_blank", "noopener,noreferrer");
                                                }}
                                                className="font-inter text-[10px] uppercase tracking-widest text-blue-500 hover:underline flex items-center gap-1"
                                            >
                                                Live <ArrowUpRight className="w-3 h-3" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <p className="font-inter text-sm md:text-base opacity-70 line-clamp-2 max-w-md">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {project.tags &&
                                        project.tags
                                            .split(",")
                                            .slice(0, 3)
                                            .map((s, i) => (
                                                <span
                                                    key={i}
                                                    className="text-[10px] font-bold font-inter uppercase tracking-widest border border-[var(--foreground)]/20 px-2 py-1 rounded-full opacity-60"
                                                >
                                                    {s.trim()}
                                                </span>
                                            ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            <style>{`
                @keyframes worksGridFadeIn {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}
