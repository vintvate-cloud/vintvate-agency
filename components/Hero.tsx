"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center bg-[var(--background)]">
            {/* Background Removed */}

            {/* Main Text Content */}
            <div className="relative z-10 flex flex-col items-center justify-center leading-[0.85] select-none mix-blend-multiply dark:mix-blend-normal text-[var(--foreground)] text-center md:pt-16">
                <motion.h1
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-anton text-[42vw] md:text-[25vw] tracking-tighter m-0 p-0 leading-[0.8]"
                >
                    VINT
                </motion.h1>
                <motion.h1
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="font-anton text-[42vw] md:text-[25vw] tracking-tighter m-0 p-0 leading-[0.8]"
                >
                    VATE
                </motion.h1>
            </div>

            {/* Keyboard Image - Bottom Right */}
            <div className="absolute bottom-0 right-0 hidden md:block z-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "backOut" }}
                >
                    <Image
                        src="/keyboard-removebg-preview.png"
                        alt="Mechanical Keyboard"
                        width={300}
                        height={200}
                        className="rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
                    />
                </motion.div>
            </div>



            {/*  */}

        </section>
    );
}
