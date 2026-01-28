"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <main className="w-full h-screen bg-black flex flex-col items-center justify-center p-6 text-[#F4F4F4] overflow-hidden relative">

            {/* Glitch Effect Containers */}
            <div className="relative">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="font-anton text-[30vw] leading-none text-red-600 mix-blend-screen opacity-50 absolute top-[2px] left-[2px] blur-[1px]"
                >
                    404
                </motion.h1>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="font-anton text-[30vw] leading-none text-blue-600 mix-blend-screen opacity-50 absolute -top-[2px] -left-[2px] blur-[1px]"
                >
                    404
                </motion.h1>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="font-anton text-[30vw] leading-none relative z-10"
                >
                    404
                </motion.h1>
            </div>

            <div className="flex flex-col items-center gap-4 z-20">
                <p className="font-inter font-bold text-sm tracking-[0.5em] text-red-500 animate-pulse">
                    SYSTEM FAILURE
                </p>
                <p className="font-anton text-2xl uppercase tracking-wide text-center">
                    Signal Lost in the Void.
                </p>

                <Link href="/" className="mt-8 px-8 py-4 border border-[#F4F4F4] hover:bg-[#F4F4F4] hover:text-black transition-colors duration-300 font-anton text-xl uppercase tracking-widest">
                    Return to Base
                </Link>
            </div>

        </main>
    );
}
