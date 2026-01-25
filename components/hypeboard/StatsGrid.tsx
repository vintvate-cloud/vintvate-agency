"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
    { label: "Projects Shipped", value: 42, suffix: "+" },
    { label: "Lines of Code", value: 120, suffix: "k" },
    { label: "Coffee Consumed", value: 9000, suffix: "", subtext: "Approximately" },
    { label: "Awards Won", value: 7, suffix: "🏆" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const springValue = useSpring(0, { duration: 2000, bounce: 0 });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (inView) {
            springValue.set(value);
        }
    }, [inView, value, springValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
    }, [springValue]);

    return (
        <span ref={ref} className="font-anton text-6xl md:text-8xl text-[var(--foreground)]">
            {displayValue}{suffix}
        </span>
    );
}

export default function StatsGrid() {
    return (
        <section className="w-full py-20 px-6 md:px-12">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-anton text-4xl md:text-6xl uppercase mb-12 text-[var(--muted)]"
            >
                The Flex
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center justify-center p-10 bg-[var(--card)] border border-[var(--border)] rounded-sm aspect-square text-center group hover:border-[var(--foreground)] transition-colors"
                    >
                        <Counter value={stat.value} suffix={stat.suffix} />
                        <span className="font-inter text-sm font-bold uppercase tracking-widest text-[var(--muted-foreground)] mt-4 group-hover:text-[var(--foreground)] transition-colors">{stat.label}</span>
                        {stat.subtext && <span className="font-inter text-[10px] uppercase tracking-wider text-[var(--muted)] mt-1">{stat.subtext}</span>}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
