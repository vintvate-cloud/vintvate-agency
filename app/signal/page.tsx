"use client";

import { motion } from "framer-motion";
import FlowingMenu from "@/components/FlowingMenu";

const articles = [
    {
        link: "#",
        text: "WHY WE KILLED THE NAVBAR",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop"
    },
    {
        link: "#",
        text: "SPEED IS A FEATURE",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2670&auto=format&fit=crop"
    },
    {
        link: "#",
        text: "THE DEATH OF FLAT DESIGN",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
    },
    {
        link: "#",
        text: "CLIENTS DON'T BUY CODE",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2670&auto=format&fit=crop"
    },
    {
        link: "#",
        text: "BUILDING DIGITAL WAR MACHINES",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop"
    }
];

export default function SignalPage() {
    return (
        <main className="w-full min-h-screen bg-[var(--background)] pt-32 pb-20 px-6 md:px-12 flex flex-col">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-screen-2xl mx-auto mb-10 w-full"
            >
                <div className="flex flex-col gap-1">
                    <p className="font-anton text-sm uppercase tracking-widest text-[var(--muted-foreground)]">
                        Transmission
                    </p>
                    <h1 className="font-anton text-[15vw] md:text-[12vw] leading-[0.8] uppercase tracking-tighter text-[var(--foreground)]">
                        THE<br />SIGNAL.
                    </h1>
                </div>
            </motion.div>

            <div className="w-full h-[85vh] relative border-t border-b border-[var(--border)]">
                <FlowingMenu
                    items={articles}
                    speed={20}
                    textColor="var(--foreground)"
                    bgColor="transparent"
                    marqueeBgColor="var(--foreground)"
                    marqueeTextColor="var(--background)"
                    borderColor="var(--border)"
                />
            </div>

        </main>
    );
}
