"use client";

import { motion } from "framer-motion";

const techItems = [
    {
        name: "NEXT.JS 15",
        category: "FRAMEWORK",
        status: "ONLINE",
        icon: (
            <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12c0 2.465-.745 4.758-2.022 6.665l-5.313-9.313zM6.917 21.35c.985.426 2.067.65 3.2.65 2.19 0 4.192-.8 5.76-2.12L6.917 6.1v15.25zm10.153-15.11L9.125 20.31c1.547 1.05 3.425 1.69 5.458 1.69 1.487 0 2.89-.35 4.135-.97V6.24z" />
            </svg>
        )
    },
    {
        name: "TYPESCRIPT",
        category: "LANGUAGE",
        status: "ONLINE",
        icon: (
            <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM11.5 17h2.5v2h-12v-2h2.5v-8.5h-2.5v-2h7v2h-2.5V17zm11.25 0H20v2h-6.25v-2H16v-4.25c0-1.875.938-2.75 3-2.75h1.75v2h-.75c-.563 0-.75.188-.75.75V17z" />
            </svg>
        )
    },
    {
        name: "TAILWIND",
        category: "STYLING",
        status: "ACTIVE",
        icon: (
            <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
            </svg>
        )
    },
    {
        name: "FRAMER MOTION",
        category: "ANIMATION",
        status: "FLUID",
        icon: (
            <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                <path d="M12 0L24 12V24L12 12L0 24V12L12 0Z" />
                <path d="M12 24L24 12V24H12Z" fillOpacity="0.5" />
            </svg>
        )
    },
    {
        name: "WEBGL",
        category: "RENDER",
        status: "READY",
        icon: (
            <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                <path d="M9.577 2.117L2.476 16.31L12.04 21.801L21.505 16.294L14.361 2.185L9.577 2.117ZM9.957 3.328L13.979 3.38L20.457 16.142L12.031 21.056L3.524 16.166L9.957 3.328ZM7.469 7.425L5.619 15.659L11.996 19.336L18.397 15.646L16.489 7.487L7.469 7.425ZM8.56 8.591L15.393 8.63L16.821 14.819L11.987 17.625L7.149 14.84L8.56 8.591Z" />
            </svg>
        )
    },
    {
        name: "NODE.JS",
        category: "RUNTIME",
        status: "STABLE",
        icon: (
            <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                <path d="M12.001 1.714L2.094 7.43v11.428l9.907 5.715 9.907-5.715V7.43L12.001 1.714zM10.87 18.257l-4.54-2.624v-5.247l4.54 2.625v5.246zm1.131-4.707l-4.22-2.436 4.22-2.436 4.22 2.436-4.22 2.436zm1.132 4.707V13.01l4.538-2.625v5.247l-4.538 2.625zM12 2.455l8.609 4.965-3.664 2.116-4.945-2.857-4.945 2.857-3.664-2.116L12 2.455z" />
            </svg>
        )
    },
    {
        name: "POSTGRES",
        category: "DATABASE",
        status: "SECURE",
        icon: (
            <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                <path d="M23.585 13.918c-.751-.892-2.316-2.736-2.5-2.924C21.05 10.963 21 8.5 21 8.5c-.01-4.321-4.01-6.5-6.012-7-1.42-.355-4.145-.583-4.145-.583-.69-.052-1.332.115-1.921.433-2.19.78-4.437 2.37-5.463 6.007-.736 2.61.164 5.39.29 5.768.106.315-.818 2.025-1.417 3.25-.6 1.226-2.748 3.52-2.193 5.487.555 1.968 4.793 2.502 5.093 2.527.165.012 5.34.025 8.528.025 2.296 0 4.097-.68 5.35-2.022 1.096-1.17 1.488-2.645 1.166-4.084-.323-1.438-1.077-2.617-2.69-3.46zM13 14c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
            </svg>
        )
    },
    {
        name: "VERCEL",
        category: "DEPLOY",
        status: "GLOBAL",
        icon: (
            <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                <path d="M24 22.525H0l12-21.05 12 21.05z" />
            </svg>
        )
    },
];

export default function TechStack() {
    return (
        <section className="w-full py-24 px-6 md:px-12 bg-[var(--background)]">
            <div className="max-w-screen-2xl mx-auto">
                {/* Header */}
                <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-[var(--foreground)] pb-6">
                    <div>
                        <p className="font-mono text-xs md:text-sm text-[var(--muted-foreground)] mb-2">
                            [ SECTOR: ARSENAL ]
                        </p>
                        <h2 className="font-anton text-4xl md:text-6xl uppercase text-[var(--foreground)]">
                            Verified<br />Equipment
                        </h2>
                    </div>
                    <p className="font-mono text-xs md:text-sm text-[var(--foreground)] text-right max-w-xs">
                        // ALL SYSTEMS NOMINAL<br />
                        // READY FOR DEPLOYMENT
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-[var(--foreground)] opacity-90">
                    {techItems.map((tech, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            whileHover={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
                            className="group relative border-r border-b border-[var(--foreground)] p-6 md:p-8 aspect-square flex flex-col justify-between cursor-crosshair transition-colors duration-300"
                        >
                            {/* Top Status */}
                            <div className="flex justify-between items-start font-mono text-[10px] uppercase tracking-widest opacity-60">
                                <span>{tech.category}</span>
                                <span className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                    {tech.status}
                                </span>
                            </div>

                            {/* Icon (Centered) */}
                            <div className="self-center transform group-hover:scale-110 transition-transform duration-300 group-hover:text-[var(--background)] text-[var(--foreground)]">
                                {tech.icon}
                            </div>

                            {/* Main Name */}
                            <h3 className="font-anton text-xl md:text-2xl uppercase tracking-wide group-hover:translate-x-1 transition-transform">
                                {tech.name}
                            </h3>

                            {/* Corner Accents */}
                            <div className="absolute top-0 right-0 w-2 h-2 border-l border-b border-[var(--foreground)] opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-r border-t border-[var(--foreground)] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
