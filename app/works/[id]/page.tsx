"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { projects, Project } from "@/lib/data";

export default function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        const found = projects.find((p) => p.id === id);
        if (found) {
            setProject(found);
        } else {
            notFound();
        }
    }, [id]);

    if (!project) return null;

    // Find next project for navigation
    const currentIndex = projects.findIndex((p) => p.id === id);
    const nextProject = projects[(currentIndex + 1) % projects.length];

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-white">

            {/* Navigation / Back */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference text-white">
                <Link href="/works" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-inter uppercase font-bold tracking-widest text-xs">Back to Works</span>
                </Link>
            </nav>

            {/* Hero Section */}
            <section className="relative w-full h-[80vh] md:h-screen">
                <div className="absolute inset-0">
                    <Image
                        src={project.heroImage}
                        alt={project.title}
                        fill
                        className="object-cover opacity-60 dark:opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />
                </div>

                <div className="relative z-10 w-full h-full flex flex-col justify-end pb-20 px-6 md:px-12 max-w-7xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-inter uppercase tracking-widest text-[#F4F4F4] text-sm mb-4 block"
                    >
                        {project.client}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-anton text-6xl md:text-9xl uppercase leading-[0.9] text-[#F4F4F4]"
                    >
                        {project.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-inter text-xl md:text-2xl mt-6 text-[#F4F4F4]/80 max-w-2xl"
                    >
                        {project.tagline}
                    </motion.p>
                </div>
            </section>

            {/* Project Details Grid */}
            <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 border-t border-[var(--foreground)]/10 pt-12">
                    <div className="col-span-1 md:col-span-1 space-y-8">
                        <div>
                            <h3 className="font-inter text-xs uppercase tracking-widest opacity-60 mb-2">Role</h3>
                            <p className="font-inter text-lg">{project.role}</p>
                        </div>
                        <div>
                            <h3 className="font-inter text-xs uppercase tracking-widest opacity-60 mb-2">Timeline</h3>
                            <p className="font-inter text-lg">{project.timeline}</p>
                        </div>
                        <div>
                            <h3 className="font-inter text-xs uppercase tracking-widest opacity-60 mb-2">Services</h3>
                            <ul className="font-inter text-lg space-y-1">
                                {project.services.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-3 space-y-12">
                        <div>
                            <h2 className="font-anton text-4xl mb-6 uppercase">The Challenge</h2>
                            <p className="font-inter text-lg md:text-xl leading-relaxed opacity-80">
                                {project.challenge}
                            </p>
                        </div>
                        <div>
                            <h2 className="font-anton text-4xl mb-6 uppercase">The Solution</h2>
                            <p className="font-inter text-lg md:text-xl leading-relaxed opacity-80">
                                {project.solution}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Results / Stats */}
            <section className="bg-[var(--foreground)] text-[var(--background)] py-20">
                <div className="px-6 md:px-12 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                        {project.results.map((stat, i) => (
                            <div key={i} className="border-l border-[var(--background)]/20 pl-6">
                                <h4 className="font-anton text-6xl md:text-7xl mb-2">{stat.value}</h4>
                                <p className="font-inter uppercase tracking-widest text-sm opacity-70">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto space-y-6">
                {project.galleryImages.map((img, i) => (
                    <div key={i} className="relative w-full aspect-video rounded-lg overflow-hidden">
                        <Image
                            src={img}
                            alt={`Gallery ${i}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                ))}
            </section>

            {/* Next Project */}
            <section className="border-t border-[var(--foreground)]/10">
                <Link href={`/works/${nextProject.id}`} className="group block py-32 px-6 md:px-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[var(--foreground)] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
                    <div className="relative z-10">
                        <span className="font-inter uppercase tracking-widest text-sm opacity-60 group-hover:text-[var(--background)] transition-colors">Next Case Study</span>
                        <h2 className="font-anton text-6xl md:text-9xl uppercase mt-4 group-hover:text-[var(--background)] transition-colors">
                            {nextProject.title}
                        </h2>
                    </div>
                </Link>
            </section>

        </main>
    );
}
