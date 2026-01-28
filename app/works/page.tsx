"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

export default function WorksPage() {
    return (
        <main className="w-full min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-32 px-6 md:px-12 pb-20">
            <h1 className="font-anton text-6xl md:text-9xl uppercase mb-20">
                All Projects
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                {projects.map((project) => (
                    <Link href={`/works/${project.id}`} key={project.id} className="group block">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg mb-6 border border-[var(--border)]">
                            <Image
                                src={project.heroImage}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ArrowUpRight className="w-5 h-5 text-white" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-start">
                                <h2 className="font-anton text-3xl md:text-4xl uppercase">{project.title}</h2>
                                <span className="font-inter text-xs uppercase tracking-widest opacity-60 mt-2">{project.timeline}</span>
                            </div>
                            <p className="font-inter text-sm md:text-base opacity-70 line-clamp-2 max-w-md">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {project.services.slice(0, 3).map((s, i) => (
                                    <span key={i} className="text-[10px] font-bold font-inter uppercase tracking-widest border border-[var(--foreground)]/20 px-2 py-1 rounded-full opacity-60">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
