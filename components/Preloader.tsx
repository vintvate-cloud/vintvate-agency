"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Lock scroll on both html and body for mobile support
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        // Simple timer for exit (matches fill duration)
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "unset";
            document.documentElement.style.overflow = "unset";
        }, 3500); // 3s fill + 0.5s hold

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "unset";
            document.documentElement.style.overflow = "unset";
        };
    }, []);

    // Wave Animation Variants
    const waveVariants = {
        animate: {
            x: ["0%", "-50%"],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 2, // Speed of the wave ripple
                    ease: "linear",
                },
            },
        },
    };

    const fillVariants = {
        initial: { y: 25 }, // Start below text
        animate: {
            y: -15, // End fully covering text
            transition: {
                duration: 3,
                ease: "easeInOut"
            }
        }
    };

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1a1a1a] text-white touch-none"
                >
                    <div className="relative w-[90vw] md:w-[60vw] h-[20vw] md:h-[12vw]">
                        <svg className="w-full h-full" viewBox="0 0 100 25" style={{ overflow: "hidden" }}>
                            <defs>
                                {/* The Text Mask */}
                                <clipPath id="text-mask">
                                    <text
                                        x="50%"
                                        y="50%"
                                        dominantBaseline="middle"
                                        textAnchor="middle"
                                        className="font-anton font-bold" // ViewBox relative size
                                        style={{ fontSize: "22px" }}
                                    >
                                        VINTVATE
                                    </text>
                                </clipPath>
                            </defs>

                            {/* Background Text (Empty/Ghost) */}
                            <text
                                x="50%"
                                y="50%"
                                dominantBaseline="middle"
                                textAnchor="middle"
                                className="font-anton fill-[#333]" // Dark gray empty state
                                style={{ fontSize: "22px" }}
                            >
                                VINTVATE
                            </text>

                            {/* The Liquid Wave Group */}
                            <g clipPath="url(#text-mask)">
                                <motion.g
                                    variants={fillVariants}
                                    initial="initial"
                                    animate="animate"
                                >
                                    <motion.path
                                        variants={waveVariants}
                                        animate="animate"
                                        fill="white" // Water Color
                                        // A really long wave path repeated
                                        d="M0,0 C30,10 70,0 100,0 C130,0 170,10 200,0 V50 H0 V0 Z"
                                    />
                                </motion.g>
                            </g>
                        </svg>
                    </div>

                    {/* Simple Loading Text */}
                    <div className="absolute bottom-10 right-10 font-mono text-sm opacity-50">
                        INITIALIZING SYSTEM...
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
