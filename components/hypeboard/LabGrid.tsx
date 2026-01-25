"use client";

import { motion } from "framer-motion";

const experiments = [
    { title: "Hover Distortion", description: "WebGL interaction test" },
    { title: "Kinetic Type", description: "Typography experiments" },
    { title: "Fluid Cursor", description: "Custom cursor physics" },
    { title: "Noise Shader", description: "GLSL Grain Effect" },
];

export default function LabGrid() {
    return (
        <section className="w-full py-20 px-6 md:px-12">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-anton text-4xl md:text-6xl uppercase mb-12 text-[var(--muted)]"
            >
                The Lab <span className="text-xl md:text-2xl align-top opacity-50 ml-2">Experimental</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {experiments.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="relative group h-[40vh] bg-[var(--card)] border border-[var(--border)] overflow-hidden cursor-crosshair"
                    >
                        {/* Interactive Placeholder Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--background)] to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                            <div>
                                <h3 className="font-anton text-2xl md:text-3xl uppercase text-[var(--foreground)] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 will-change-transform">
                                    {item.title}
                                </h3>
                                <p className="font-inter text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {item.description}
                                </p>
                            </div>
                            <div className="w-10 h-10 border border-[var(--foreground)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="text-[var(--foreground)]">↗</span>
                            </div>
                        </div>

                        {/* Central "Coming Soon" or graphic placeholder */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-20 h-20 bg-[var(--foreground)] rounded-full blur-[50px] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
