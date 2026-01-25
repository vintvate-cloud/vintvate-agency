"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

const navLinks = [
    { name: "The Team", href: "/team" },
    { name: "About", href: "/about" },
    { name: "Hypeboard", href: "/hypeboard" },
    { name: "Let's Work", href: "/lets-work" },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme } = useTheme();

    // Determine logo class based on theme
    // Assumption: Source image is WHITE (based on "looks white in website")
    // Light Mode -> Need Black -> Apply 'invert' (White -> Black) or 'brightness-0'
    // Dark Mode -> Need White -> No filter (stays White)

    // Using brightness-0 to force Black in light mode is safer than invert if source isn't pure white.
    // Using invert on top of brightness-0 ensures White in dark mode.
    const logoClass = theme === "dark"
        ? "w-16 h-16 md:w-20 md:h-20 object-contain invert brightness-0" // Force Black then Invert -> White
        : "w-16 h-16 md:w-20 md:h-20 object-contain brightness-0";      // Force Black

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="fixed top-0 left-0 w-full z-50 px-6 py-5 md:px-12 transition-all duration-300 bg-transparent"
            >
                <div className="flex justify-between items-center max-w-screen-2xl mx-auto relative">
                    {/* Left Links (Desktop) */}
                    <div className="hidden md:flex gap-8">
                        {navLinks.slice(0, 2).map((link, index) => (
                            <NavLink key={index} name={link.name} href={link.href} />
                        ))}
                    </div>

                    {/* Center Logo */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                        <Link href="/" className="block hover:scale-105 transition-transform duration-300">
                            <Image
                                key={theme} // Force re-render on theme change
                                src="/vintvatelogo-removebg-preview.png"
                                alt="Vintvate Logo"
                                width={80}
                                height={80}
                                className={logoClass}
                                priority
                            />
                        </Link>
                    </div>

                    {/* Right Links (Desktop) */}
                    <div className="hidden md:flex gap-8 items-center">
                        {navLinks.slice(2, 4).map((link, index) => (
                            <NavLink key={index} name={link.name} href={link.href} />
                        ))}
                        <ThemeToggle />
                    </div>

                    {/* Mobile Controls */}
                    <div className="md:hidden flex items-center gap-4 ml-auto">
                        <ThemeToggle />
                        <button
                            className="text-[var(--foreground)] focus:outline-none"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-[var(--background)]/95 backdrop-blur-xl flex flex-col justify-center items-center"
                    >
                        <button
                            className="absolute top-6 right-6 text-[var(--foreground)] p-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X size={32} />
                        </button>

                        <div className="flex flex-col gap-8 text-center">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="font-anton text-4xl uppercase tracking-wide text-[var(--foreground)] hover:text-[var(--muted-foreground)] transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function NavLink({ name, href }: { name: string; href: string }) {
    return (
        <Link href={href} className="group relative font-inter text-sm font-bold uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors py-1">
            {name}
            <span className="absolute bottom-0 right-0 w-0 h-[1.5px] bg-current transition-all duration-300 ease-in-out group-hover:w-full" />
        </Link>
    );
}
