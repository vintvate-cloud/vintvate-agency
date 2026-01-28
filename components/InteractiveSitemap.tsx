"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const nodes = [
    { name: "HOME", href: "/", desc: "MISSION COMMAND" },
    { name: "ABOUT", href: "/about", desc: "AGENCY INTEL" },
    { name: "WORKS", href: "/works", desc: "OPERATION LOGS" },
    { name: "TEAM", href: "/team", desc: "THE SQUADRON" },
    { name: "SIGNAL", href: "/signal", desc: "BROADCASTS" },
    { name: "HYPEBOARD", href: "/hypeboard", desc: "LAB DATA" },
    { name: "LET'S WORK", href: "/lets-work", desc: "INITIATE COMMS" },
    { name: "SITEMAP", href: "/sitemap", desc: "SYSTEM INDEX" },
];

export default function InteractiveSitemap() {
    return (
        <section className="w-full py-12 md:py-24">
            <h2 className="font-anton text-4xl mb-12 text-[var(--foreground)] opacity-80 pl-4 border-l-4 border-[var(--foreground)]">
                SYSTEM<br />DIRECTORY
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {nodes.map((node, index) => (
                    <Link key={index} href={node.href} className="block group">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="relative h-48 border border-[var(--foreground)]/20 bg-[var(--background)] p-6 flex flex-col justify-between overflow-hidden hover:border-[var(--foreground)] transition-colors duration-300"
                        >
                            {/* Background Grid Hover Effect */}
                            <div className="absolute inset-0 bg-[var(--foreground)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ backgroundImage: 'radial-gradient(circle, var(--foreground) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                            />

                            {/* Node ID */}
                            <span className="font-mono text-xs text-[var(--muted-foreground)] z-10">
                                NODE_0{index + 1}
                            </span>

                            {/* Node Name */}
                            <div className="z-10">
                                <h3 className="font-anton text-3xl uppercase text-[var(--foreground)] group-hover:translate-x-2 transition-transform duration-300">
                                    {node.name}
                                </h3>
                                {/* Decoding Description */}
                                <div className="h-6 overflow-hidden mt-2">
                                    <p className="font-mono text-xs text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        // {node.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-0 right-0 w-3 h-3 border-l border-b border-[var(--foreground)]/50 group-hover:border-[var(--foreground)] transition-colors" />
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-r border-t border-[var(--foreground)]/50 group-hover:border-[var(--foreground)] transition-colors" />
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
