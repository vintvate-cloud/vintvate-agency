"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        setMessage("");

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setMessage("Signal received. Welcome.");
                setEmail("");
            } else {
                setStatus("error");
                setMessage(data.error || "Transmission failed.");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Connection lost.");
        }
    };

    return (
        <div className="w-full max-w-md">
            <h3 className="font-anton text-2xl uppercase tracking-wide mb-4 text-white">
                Join The Signal
            </h3>
            <p className="font-inter text-xs text-white/60 mb-6 leading-relaxed">
                Insights on design, tech, and the future of digital. No noise, just signal.
            </p>

            <form onSubmit={handleSubmit} className="relative w-full">
                <input
                    type="email"
                    placeholder="ENTER YOUR EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading" || status === "success"}
                    className="w-full bg-transparent border-b border-white/20 py-3 pr-12 text-sm font-inter tracking-widest text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors disabled:opacity-50"
                />

                <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white hover:text-[var(--primary)] transition-colors disabled:hover:text-white"
                >
                    <AnimatePresence mode="wait">
                        {status === "loading" ? (
                            <motion.div
                                key="loader"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                            >
                                <Loader2 className="w-5 h-5 animate-spin" />
                            </motion.div>
                        ) : status === "success" ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                            >
                                <Check className="w-5 h-5 text-green-400" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="arrow"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                            >
                                <ArrowRight className="w-5 h-5" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </form>

            <AnimatePresence>
                {(status === "success" || status === "error") && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={`text-[10px] font-inter tracking-widest mt-3 ${status === "success" ? "text-green-400" : "text-red-400"
                            }`}
                    >
                        {message}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
