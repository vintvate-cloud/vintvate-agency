"use client";

import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative overflow-hidden"
            aria-label="Toggle Theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 180 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10"
            >
                {theme === "light" ? (
                    <Sun className="w-5 h-5 text-black" />
                ) : (
                    <Moon className="w-5 h-5 text-white" />
                )}
            </motion.div>
        </button>
    );
}
