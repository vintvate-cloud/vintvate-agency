"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const teamSync = [


    {
        name: "Vedant Vyas",
        role: "Founder",
        image: "/vedant.jpg",
        bio: "The vision behind Vintvate. Creating digital legacies."
    },
    {
        name: "Rajat Jhade",
        role: "Tech Lead",
        image: "/rajat.jpg",
        bio: "Engineering the impossible. Code is art."
    },
    {
        name: "Kushagra",
        role: "The CA",
        image: "/20250413_235710.jpg",
        bio: "Master of numbers. Architect of growth."
    }
];

export default function TeamGrid() {
    return (
        <section className="w-full py-20 px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-2xl mx-auto">
                {teamSync.map((member, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative"
                    >
                        <div className="w-full aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 mb-6 bg-gray-200">
                            <Image
                                src={member.image}
                                alt={member.name}
                                width={600}
                                height={800}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <h3 className="font-anton text-2xl uppercase text-[var(--foreground)]">
                                {member.name}
                            </h3>
                            <p className="font-inter text-sm font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                                {member.role}
                            </p>
                            <p className="font-inter text-sm text-[var(--muted-foreground)] mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {member.bio}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
