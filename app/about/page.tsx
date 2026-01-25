"use client";

import { motion } from "framer-motion";

const textVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: (i: number) => ({
        y: "0%",
        opacity: 1,
        transition: { duration: 0.5, delay: i * 0.05, ease: [0.33, 1, 0.68, 1] as any },
    }),
};

const values = [
    { title: "Radical Transparency", desc: "No BS. We tell it like it is." },
    { title: "Obsessive Quality", desc: "Good enough is effectively garbage." },
    { title: "Speed Wins", desc: "We move fast and break things (safely)." },
];

export default function AboutPage() {
    return (
        <main className="relative w-full min-h-screen bg-[var(--background)] pt-32 pb-20 px-6 md:px-12 flex flex-col justify-start items-start overflow-hidden">


            {/* Header */}
            <div className="w-full mb-16 md:mb-24 overflow-hidden relative z-10">
                <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] as any }}
                    className="font-anton text-[12vw] leading-[0.8] uppercase tracking-tighter text-[var(--foreground)] mix-blend-multiply dark:mix-blend-normal"
                >
                    HEY, WE ARE<br />
                    <span className="text-[var(--muted)]">VINTVATE</span>.
                </motion.h1>
            </div>

            {/* Content Body */}
            <div className="flex flex-col md:flex-row w-full gap-10 md:gap-20 max-w-screen-xl relative z-10">

                {/* Left Column: Spacer or Image placeholder if needed */}
                <div className="hidden md:block w-1/4">
                    <div className="w-full h-[1px] bg-[var(--border)] mt-4"></div>
                </div>

                {/* Right Column: Text */}
                <div className="flex flex-col gap-10 w-full md:w-3/4 font-inter text-lg md:text-2xl leading-relaxed text-[var(--muted-foreground)] font-light">

                    <div className="overflow-hidden">
                        <motion.p custom={1} initial="hidden" animate="visible" variants={textVariants}>
                            We are passionate about creating high-value websites for our clients that actually <span className="font-bold text-[var(--foreground)] border-b-2 border-[var(--border)]">make a bold impact</span> and help their businesses grow. Whether you are a startup ready to launch, a local brand needing a fresh online presence, or you simply need an upgrade.
                        </motion.p>
                    </div>

                    <div className="overflow-hidden">
                        <motion.p custom={2} initial="hidden" animate="visible" variants={textVariants}>
                            We build custom websites with personalization features that are <span className="font-bold text-[var(--foreground)]">affordable</span>, <span className="font-bold text-[var(--foreground)]">easy to manage</span>, <span className="font-bold text-[var(--foreground)]">SEO friendly</span>, and customer engaging.
                        </motion.p>
                    </div>

                    <div className="overflow-hidden">
                        <motion.p custom={3} initial="hidden" animate="visible" variants={textVariants}>
                            Our objective is to make sure you get your dream website with dozens of features while <span className="font-bold text-[var(--foreground)]">keeping things simple</span>.
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Philosophy Section */}
            <div className="w-full mt-24 md:mt-40 max-w-screen-xl relative z-10">
                <div className="w-full h-[1px] bg-[var(--border)] mb-12"></div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-anton text-4xl md:text-7xl uppercase leading-tight text-[var(--foreground)]"
                >
                    We don't just build websites.<br />
                    <span className="text-[var(--muted)]">We build digital dominance.</span>
                </motion.h2>
            </div>

            {/* Values Section */}
            <div className="w-full mt-24 max-w-screen-xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[var(--card)] border border-[var(--border)] p-8 md:p-12 hover:border-[var(--foreground)] transition-colors group"
                        >
                            <h3 className="font-anton text-2xl md:text-3xl uppercase text-[var(--foreground)] mb-4">{item.title}</h3>
                            <p className="font-inter text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="w-full mt-24 md:mt-40 flex flex-col items-center justify-center relative z-10 gap-6">
                <div className="overflow-hidden">
                    <motion.h2
                        custom={4}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={textVariants}
                        className="font-anton text-4xl md:text-6xl uppercase tracking-wide text-center"
                    >
                        Let’s create your<br />website now.
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                >
                    <a href="#" className="inline-block px-8 py-4 bg-[var(--foreground)] text-[var(--background)] font-inter font-bold uppercase tracking-widest text-sm hover:opacity-80 transition-opacity rounded-full">
                        Start Project
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="font-inter text-sm text-[var(--muted)] uppercase tracking-widest mt-4"
                >
                    <a href="#" className="border-b border-[var(--border)] hover:border-[var(--foreground)] transition-colors">For more info please visit here</a>
                </motion.div>
            </div>

        </main>
    );
}
