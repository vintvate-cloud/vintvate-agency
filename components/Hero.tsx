"use client";

import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center bg-[var(--background)]">
            <EasterEggText />
        </section>
    );
}

function EasterEggText() {
    const [line1, setLine1] = React.useState("VINT");
    const [line2, setLine2] = React.useState("VATE");
    const [isAnimating, setIsAnimating] = React.useState(false);

    // Determines if we are currently showing the "Easter Egg" text or the Original
    const [isToggled, setIsToggled] = React.useState(false);

    const typeWriter = async (target1: string, target2: string) => {
        setIsAnimating(true);

        // 1. Delete current text
        const l1 = line1;
        const l2 = line2;
        const maxDelete = Math.max(l1.length, l2.length);

        for (let i = 0; i <= maxDelete; i++) {
            setLine1(l1.substring(0, l1.length - i));
            setLine2(l2.substring(0, l2.length - i));
            await new Promise(r => setTimeout(r, 50));
        }

        await new Promise(r => setTimeout(r, 200));

        // 2. Type new text
        const maxType = Math.max(target1.length, target2.length);
        for (let i = 1; i <= maxType; i++) {
            if (i <= target1.length) setLine1(target1.substring(0, i));
            if (i <= target2.length) setLine2(target2.substring(0, i));
            await new Promise(r => setTimeout(r, 80));
        }

        setIsAnimating(false);
    };

    const handleClick = () => {
        if (isAnimating) return;

        if (!isToggled) {
            typeWriter("CODE", "UNLEASHED");
        } else {
            typeWriter("VINT", "VATE");
        }
        setIsToggled(!isToggled);
    };

    return (
        <>
            {/* Main Text Content */}
            <div className="relative z-10 flex flex-col items-center justify-center leading-[0.85] select-none mix-blend-multiply dark:mix-blend-normal text-[var(--foreground)] text-center md:pt-16">
                <motion.h1
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-anton text-[42vw] md:text-[25vw] tracking-tighter m-0 p-0 leading-[0.8] min-h-[0.8em]"
                >
                    {line1}
                </motion.h1>
                <motion.h1
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="font-anton text-[42vw] md:text-[25vw] tracking-tighter m-0 p-0 leading-[0.8] min-h-[0.8em]"
                >
                    {line2}
                </motion.h1>
            </div>

            {/* Keyboard Image - Bottom Right */}
            <div className="absolute bottom-0 right-0 hidden md:block z-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "backOut" }}
                    onClick={handleClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer"
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

            {/* Vertical Left Text */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute left-6 md:left-10 bottom-2 md:bottom-8 z-20 hidden md:block" // Hidden on mobile to avoid clutter
            >
                <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-[var(--muted-foreground)] [writing-mode:vertical-rl] rotate-180 select-none">
                    #CODEUNLEASHED
                </span>
            </motion.div>
        </>
    )
}
