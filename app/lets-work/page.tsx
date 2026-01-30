"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

export default function LetsWorkPage() {
    return (
        <main className="w-full min-h-screen bg-[var(--background)] pt-32 pb-20 px-6 md:px-12 flex flex-col md:flex-row gap-12 md:gap-24">

            {/* Left Column: Info & Statement */}
            <div className="w-full md:w-1/3 flex flex-col justify-between h-full md:sticky top-32">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-anton text-[12vw] md:text-8xl leading-[0.8] uppercase tracking-tighter text-[var(--foreground)] mb-8"
                    >
                        LET&apos;S<br />WORK.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="font-inter text-lg text-[var(--muted-foreground)] max-w-sm"
                    >
                        Ready to start a project? Fill out the form or just shoot us an email. We hate boring forms too, so we made this one big and bold.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-12 md:mt-auto flex flex-col gap-4 text-[var(--foreground)]"
                >
                    <div>
                        <p className="font-anton text-sm uppercase tracking-widest text-[var(--muted)] mb-1">Email</p>
                        <a href="mailto:vintvate@gmail.com" className="font-inter text-xl font-bold hover:underline">vintvate@gmail.com</a>
                    </div>
                    <div>
                        <p className="font-anton text-sm uppercase tracking-widest text-[var(--muted)] mb-1">Phone</p>
                        <p className="font-inter text-xl font-bold">+91 9407358891</p>
                    </div>
                </motion.div>
            </div>

            {/* Right Column: Form */}
            <div className="w-full md:w-2/3 pt-12 md:pt-4">
                <ContactForm />
            </div>

        </main>
    );
}
