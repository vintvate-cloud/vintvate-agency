"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const articles = [
    {
        id: 1,
        date: "APR 12, 2025",
        title: "WHY WE KILLED THE NAVBAR",
        tag: "UX Design",
        slug: "#"
    },
    {
        id: 2,
        date: "MAR 08, 2025",
        title: "SPEED IS A FEATURE",
        tag: "Engineering",
        slug: "#"
    },
    {
        id: 3,
        date: "FEB 21, 2025",
        title: "THE DEATH OF FLAT DESIGN",
        tag: "Trends",
        slug: "#"
    },
    {
        id: 4,
        date: "JAN 15, 2025",
        title: "CLIENTS DON'T BUY CODE",
        tag: "Strategy",
        slug: "#"
    },
    {
        id: 5,
        date: "DEC 10, 2024",
        title: "BUILDING DIGITAL WAR MACHINES",
        tag: "Philosophy",
        slug: "#"
    }
];

export default function SignalPage() {
    return (
        <main className="w-full min-h-screen bg-[var(--background)] pt-32 pb-20 px-6 md:px-12">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-screen-2xl mx-auto mb-20"
            >
                <div className="flex flex-col gap-1">
                    <p className="font-anton text-sm uppercase tracking-widest text-[var(--muted-foreground)]">
                        Transmission
                    </p>
                    <h1 className="font-anton text-[15vw] md:text-[12vw] leading-[0.8] uppercase tracking-tighter text-[var(--foreground)]">
                        THE<br />SIGNAL.
                    </h1>
                </div>
            </motion.div>

            <div className="max-w-screen-2xl mx-auto flex flex-col">
                {articles.map((article, index) => (
                    <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="group relative border-t border-[var(--border)] py-12 md:py-16 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors duration-300 cursor-pointer"
                    >
                        <Link href={article.slug} className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 md:gap-10 px-4">
                            <span className="font-inter text-xs md:text-sm font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">
                                {article.date}
                            </span>

                            <h2 className="font-anton text-4xl md:text-7xl uppercase leading-none group-hover:translate-x-4 transition-transform duration-500">
                                {article.title}
                            </h2>

                            <span className="font-inter text-xs md:text-sm font-bold uppercase tracking-widest border border-[var(--border)] px-3 py-1 rounded-full group-hover:border-[var(--background)] md:self-start">
                                {article.tag}
                            </span>
                        </Link>
                    </motion.div>
                ))}
                <div className="w-full h-[1px] bg-[var(--border)]"></div>
            </div>

        </main>
    );
}
