"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smoother, "floaty" spring configuration for premium feel
    const springConfig = { damping: 20, stiffness: 100, mass: 0.1 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check for interactive elements
            const isInteractive =
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button") ||
                window.getComputedStyle(target).cursor === "pointer";

            setIsHovering(!!isInteractive);
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY, isVisible]);

    // Hide on touch devices
    const [isTouch, setIsTouch] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Add a small delay to avoid synchronous state update warning
            const timer = setTimeout(() => {
                setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, []);

    if (isTouch) return null;

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <>
                        {/* Main Dot - Disappears on hover for cleaner look */}
                        <motion.div
                            className="fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: isHovering ? 0 : 1, // Hide dot when hovering
                                opacity: 1,
                                x: "-50%",
                                y: "-50%"
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                translateX: cursorX,
                                translateY: cursorY,
                            }}
                        />

                        {/* Trailing Ring */}
                        <motion.div
                            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] mix-blend-difference"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                width: isHovering ? 80 : 30, // Larger expansion
                                height: isHovering ? 80 : 30,
                                borderWidth: isHovering ? "0px" : "1px",
                                backgroundColor: isHovering ? "rgba(255, 255, 255, 0.2)" : "transparent",
                                borderColor: "rgba(255, 255, 255, 0.5)",
                                x: "-50%",
                                y: "-50%"
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                                width: { type: "spring", damping: 20, stiffness: 300 },
                                height: { type: "spring", damping: 20, stiffness: 300 },
                                opacity: { duration: 0.2 }
                            }}
                            style={{
                                translateX: cursorXSpring,
                                translateY: cursorYSpring,
                            }}
                        />
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
