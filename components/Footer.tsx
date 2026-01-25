"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="relative w-full bg-[#050505] text-[#F4F4F4] pt-20 pb-6 px-6 md:px-12 overflow-hidden flex flex-col justify-between min-h-screen md:min-h-[80vh]">

            {/* Top Section: Links and Call to Action */}
            <div className="flex flex-col md:flex-row justify-between items-start w-full z-10 gap-10 md:gap-0">

                {/* CTA */}
                <div className="flex flex-col gap-4 max-w-lg">
                    <h3 className="font-anton text-4xl md:text-6xl uppercase leading-tight">
                        Let's start<br />something new.
                    </h3>
                    <Link href="#" className="font-inter text-sm md:text-base uppercase tracking-widest border-b border-white/30 pb-1 w-fit hover:border-white transition-colors">
                        Get in Touch
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex gap-12 md:gap-24 font-inter text-xs md:text-sm uppercase tracking-widest text-white/60">
                    <div className="flex flex-col gap-4">
                        <span className="text-white font-bold opacity-100 mb-2">Socials</span>
                        <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
                        <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                        <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
                        <Link href="#" className="hover:text-white transition-colors">Awwwards</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-white font-bold opacity-100 mb-2">Sitemap</span>
                        <Link href="#" className="hover:text-white transition-colors">Home</Link>
                        <Link href="#" className="hover:text-white transition-colors">About</Link>
                        <Link href="#" className="hover:text-white transition-colors">Works</Link>
                        <Link href="#" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Massive Text */}
            <div className="w-full mt-auto relative z-10 pt-20 md:pt-0">
                <motion.h1
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                    viewport={{ once: false, margin: "-10%" }}
                    className="font-anton text-[18vw] leading-[0.75] text-center md:text-justify w-full uppercase tracking-tighter mix-blend-difference opacity-90 select-none pb-0 mb-0 -ml-[1vw]"
                >
                    VINTVATE
                </motion.h1>
            </div>

            {/* Copyright / Extra Info */}
            <div className="flex flex-col md:flex-row justify-between items-center w-full mt-4 border-t border-white/10 pt-6 font-inter text-[10px] uppercase tracking-widest text-white/40">
                <p>&copy; 2024 Vintvate Agency. All Rights Reserved.</p>
                <div className="flex gap-4 mt-2 md:mt-0">
                    <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
                </div>
            </div>

        </footer>
    );
}
