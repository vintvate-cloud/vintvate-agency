"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const projects = [
    {
        id: 1,
        title: "ELEVATE APP",
        category: "Mobile Design / UX",
        color: "bg-blue-100",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "NECTAR DASHBOARD",
        category: "Web Development",
        color: "bg-purple-100",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "AURA BRANDING",
        category: "Identity",
        color: "bg-pink-100",
        image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "ZENITH COMMERCE",
        category: "E-Commerce",
        color: "bg-orange-100",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2000&auto=format&fit=crop"
    }
];

export default function Works() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

    return (
        <section id="works" ref={targetRef} className="relative h-[200vh] md:h-[300vh] bg-[#F4F4F4] dark:bg-black transition-colors duration-500">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* Section Title */}
                <div className="absolute top-24 left-6 md:left-12 z-20 pointer-events-none">
                    <h2 className="font-anton text-4xl md:text-6xl uppercase tracking-wide text-black dark:text-white">
                        Selected<br /><span className="text-gray-400 dark:text-gray-600">Works</span>
                    </h2>
                </div>

                <motion.div style={{ x }} className="flex gap-6 md:gap-20 pl-6 md:pl-[30vw]">
                    {projects.map((project) => (
                        <div key={project.id} className="group relative w-[85vw] md:w-[45vw] h-[55vh] md:h-[60vh] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg">
                            {/* Image Background */}
                            <div className="absolute inset-0 w-full h-full bg-gray-200 dark:bg-gray-900">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end items-start transform translate-y-4 md:translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="font-inter text-xs md:text-sm font-bold uppercase tracking-widest text-white/80 mb-2">
                                    {project.category}
                                </span>
                                <h3 className="font-anton text-3xl md:text-5xl uppercase tracking-wide text-white">
                                    {project.title}
                                </h3>
                            </div>
                        </div>
                    ))}

                    {/* "More" / CTA Card */}
                    <div className="w-[85vw] md:w-[30vw] h-[55vh] md:h-[60vh] flex-shrink-0 flex items-center justify-center border-2 border-black/10 dark:border-white/10 rounded-lg">
                        <a href="/works" className="text-center group cursor-pointer block w-full h-full flex flex-col items-center justify-center">
                            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border border-black dark:border-white flex items-center justify-center mb-4 transition-colors group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black">
                                <span className="font-inter text-4xl md:text-6xl font-light">→</span>
                            </div>
                            <p className="font-anton text-xl uppercase tracking-wide text-black dark:text-white">View All Projects</p>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
