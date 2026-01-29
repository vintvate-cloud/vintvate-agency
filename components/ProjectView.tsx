"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";

interface DBProject {
    id: string;
    title: string;
    description: string;
    image: string | null;
    link: string | null;
    tags: string | null;
    createdAt: Date;
}

export default function ProjectView({ project, nextProject }: { project: DBProject, nextProject: DBProject | null }) {

    // Derived/Fallback Data
    const services = project.tags ? project.tags.split(',') : ["Design", "Development"];
    const year = new Date(project.createdAt).getFullYear();
    const timeline = `${year}`;

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-white">

            {/* Hero Section */}
            <section className="relative w-full h-[70vh] md:h-[85vh]">
                <div className="absolute inset-0">
                    <Image
                        src={project.image || "/placeholder-project.jpg"}
                        alt={project.title}
                        fill
                        className="object-cover opacity-70"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/40 to-black/20" />
                </div>

                <div className="relative z-10 w-full h-full flex flex-col justify-end pb-20 px-6 md:px-12 max-w-[1920px] mx-auto">
                    <div className="max-w-4xl">
                        {/* Services Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {services.map((s, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + (i * 0.05) }}
                                    className="px-3 py-1 border border-[var(--foreground)]/20 rounded-full text-[10px] font-inter uppercase tracking-widest text-[var(--foreground)]/80 backdrop-blur-sm"
                                >
                                    {s.trim()}
                                </motion.span>
                            ))}
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="font-anton text-[12vw] md:text-[8vw] leading-[0.85] uppercase text-[var(--foreground)] mb-8 mix-blend-difference"
                        >
                            {project.title}
                        </motion.h1>

                        {project.link && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-[var(--foreground)] text-[var(--background)] px-8 py-4 rounded-full font-inter uppercase text-xs font-bold tracking-widest hover:opacity-90 transition-opacity"
                                >
                                    Visit Website <ExternalLink className="w-4 h-4" />
                                </a>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Content Grid */}
            <section className="px-6 md:px-12 py-20 md:py-32 max-w-[1920px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                    {/* Sidebar / Metadata */}
                    <div className="md:col-span-4 space-y-12">
                        <div className="border-t border-[var(--foreground)]/10 pt-6">
                            <h3 className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Timeline</h3>
                            <p className="font-inter text-xl text-[var(--foreground)]">{timeline}</p>
                        </div>
                        <div className="border-t border-[var(--foreground)]/10 pt-6">
                            <h3 className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Client</h3>
                            <p className="font-inter text-xl text-[var(--foreground)]">{project.title}</p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-8">
                        <div className="border-t border-[var(--foreground)]/10 pt-6">
                            <h3 className="font-inter text-xs uppercase tracking-widest text-[var(--primary)] mb-6">Overview</h3>
                            <div className="prose prose-lg max-w-none">
                                <p className="font-inter text-2xl md:text-4xl leading-tight text-[var(--foreground)]/90 whitespace-pre-wrap">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Project Arrow */}
            {nextProject && (
                <section className="border-t border-[var(--foreground)]/10">
                    <Link href={`/works/${nextProject.id}`} className="group block relative w-full h-[60vh] overflow-hidden">
                        <div className="absolute inset-0">
                            {nextProject.image && (
                                <Image
                                    src={nextProject.image}
                                    alt={nextProject.title}
                                    fill
                                    className="object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                                />
                            )}
                            <div className="absolute inset-0 bg-[var(--background)]/50 group-hover:bg-[var(--background)]/30 transition-colors duration-500" />
                        </div>

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                            <span className="font-inter uppercase tracking-widest text-sm text-[var(--foreground)]/60 mb-4 bg-[var(--background)]/40 px-4 py-2 rounded-full border border-[var(--foreground)]/10 backdrop-blur-md">Next Case Study</span>
                            <h2 className="font-anton text-[10vw] leading-none uppercase text-[var(--foreground)] group-hover:text-transparent group-hover:stroke-text transition-colors duration-500">
                                {nextProject.title}
                            </h2>
                            <div className="mt-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                <div className="border border-[var(--foreground)]/30 rounded-full p-4">
                                    <ArrowLeft className="w-8 h-8 rotate-180 text-[var(--foreground)]" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            <style jsx global>{`
                .stroke-text {
                    -webkit-text-stroke: 2px var(--foreground);
                    color: transparent;
                }
            `}</style>

        </main>
    );
}
