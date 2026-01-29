"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Project {
    id: string;
    title: string;
    description: string;
    image: string | null;
    link: string | null;
    tags: string | null;
}

export default function Works({ projects }: { projects: Project[] }) {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-[var(--background)]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-4 p-4 md:p-12">

                    {/* Intro Card */}
                    <div className="relative h-[60vh] w-[90vw] md:w-[40vw] flex-shrink-0 flex flex-col justify-center p-8">
                        <h2 className="font-anton text-[12vw] md:text-[8vw] leading-[0.85] text-[var(--foreground)] uppercase mb-6">
                            Selected<br />Works <span className="text-[var(--primary)]">.</span>
                        </h2>
                        <p className="font-inter text-[var(--muted-foreground)] max-w-md text-sm md:text-base">
                            A showcase of our defining projects. Digital experiences that push boundaries.
                        </p>
                    </div>

                    {/* Project Cards */}
                    {projects.map((project) => (
                        <Link href={`/works/${project.id}`} key={project.id} className="group relative h-[60vh] w-[90vw] md:w-[50vw] flex-shrink-0 overflow-hidden rounded-xl bg-[var(--card)] border border-[var(--border)] cursor-none md:cursor-pointer">
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={project.image || "/placeholder-project.jpg"}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                            </div>

                            <div className="absolute bottom-0 left-0 w-full p-8 z-10 flex flex-col items-start transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                {/* Optional: Display Client or Tag if you add it to DB model properly
                                <div className="bg-white/10 backdrop-blur-md px-4 py-1 rounded-full border border-white/20 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">{project.tags || "Project"}</span>
                                </div>
                                */}
                                <h3 className="font-anton text-5xl md:text-7xl text-white uppercase mb-2">{project.title}</h3>
                                <p className="font-inter text-sm md:text-base text-white/80 line-clamp-2 max-w-lg">{project.description}</p>
                            </div>

                            <div className="absolute top-8 right-8 z-20 bg-white text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110">
                                <ArrowUpRight className="w-6 h-6" />
                            </div>
                        </Link>
                    ))}

                    {/* View All Link Card */}
                    <div className="relative h-[60vh] w-[90vw] md:w-[30vw] flex-shrink-0 flex items-center justify-center border border-[var(--border)] rounded-xl hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors duration-500 group">
                        <Link href="/works" className="w-full h-full flex flex-col items-center justify-center">
                            <div className="w-20 h-20 rounded-full border border-[var(--foreground)] group-hover:border-[var(--background)] flex items-center justify-center mb-4">
                                <ArrowUpRight className="w-8 h-8" />
                            </div>
                            <span className="font-anton uppercase text-2xl">View All</span>
                        </Link>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
