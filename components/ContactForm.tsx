"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactForm() {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const inputClasses = "bg-transparent border-0 border-b-[1px] border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:ring-0 focus:outline-none focus:border-b-[2px] focus:border-[var(--foreground)] transition-all duration-300 w-full py-2 font-inter text-xl md:text-3xl leading-tight";

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            service: formData.get("service"),
            budget: formData.get("budget"),
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus("success");
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    }

    return (
        <form className="flex flex-col gap-12 w-full max-w-2xl" onSubmit={handleSubmit}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col gap-2"
            >
                <label className="font-anton text-sm uppercase tracking-widest text-[var(--foreground)]">01. What's your name?</label>
                <input
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className={inputClasses}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col gap-2"
            >
                <label className="font-anton text-sm uppercase tracking-widest text-[var(--foreground)]">02. What's your email?</label>
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className={inputClasses}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col gap-2"
            >
                <label className="font-anton text-sm uppercase tracking-widest text-[var(--foreground)]">03. What can we help you with?</label>
                <input
                    name="service"
                    type="text"
                    required
                    placeholder="Web Design, Branding, Development..."
                    className={inputClasses}
                    onFocus={() => setFocusedField("service")}
                    onBlur={() => setFocusedField(null)}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col gap-2"
            >
                <label className="font-anton text-sm uppercase tracking-widest text-[var(--foreground)]">04. What's your budget?</label>
                <input
                    name="budget"
                    type="text"
                    required
                    placeholder="2-5k, 5-10k, 10k+"
                    className={inputClasses}
                    onFocus={() => setFocusedField("budget")}
                    onBlur={() => setFocusedField(null)}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-8 flex items-center gap-6"
            >
                <button
                    disabled={status === "loading" || status === "success"}
                    className="px-10 py-5 bg-[var(--foreground)] text-[var(--background)] font-anton text-xl uppercase tracking-widest hover:scale-105 transition-transform duration-300 w-full md:w-auto rounded-sm disabled:opacity-50 disabled:hover:scale-100"
                >
                    {status === "loading" ? "Sending..." : status === "success" ? "Sent!" : "Send It"}
                </button>

                {status === "success" && (
                    <p className="font-inter text-green-500 font-bold">Message received. We'll be in touch.</p>
                )}
                {status === "error" && (
                    <p className="font-inter text-red-500 font-bold">Something went wrong. Try again.</p>
                )}
            </motion.div>
        </form>
    );
}
