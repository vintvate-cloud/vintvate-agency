"use client";

import { motion } from "framer-motion";
import GridBackground from "./GridBackground";

export default function Hero() {
    return (
        <section className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center bg-[var(--background)]">
            <GridBackground />

            {/* Main Text Content */}
            <div className="relative z-10 flex flex-col items-center justify-center leading-[0.85] select-none mix-blend-multiply dark:mix-blend-normal text-[var(--foreground)] pt-16">
                <motion.h1
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-anton text-[22vw] md:text-[25vw] tracking-tighter m-0 p-0"
                >
                    VINT
                </motion.h1>
                <motion.h1
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="font-anton text-[22vw] md:text-[25vw] tracking-tighter m-0 p-0"
                >
                    VATE
                </motion.h1>
            </div>

            {/* Footer / Corner Details */}
            <div className="absolute bottom-10 left-10 text-[10px] md:text-xs font-bold font-inter tracking-widest text-[var(--muted-foreground)] hidden md:block z-20">
                WE MAKE WEBSITES
            </div>

            <div className="absolute bottom-10 right-10 text-[10px] md:text-xs font-bold font-inter tracking-widest text-right text-[var(--muted-foreground)] hidden md:block z-20">

            </div>



            {/*  */}

        </section>
    );
}
