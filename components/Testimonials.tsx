"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import gsap from "gsap";

/* ─── Data ─────────────────────────────────────────────────── */
const testimonials = [
    {
        quote: "Vintvate helped us grow and boosted our clothing sales more than 2 times.",
        author: "Sushil Pandey",
        role: "Proprietor, Mergvel",
        index: "01",
    },
    {
        quote: "Since we got our new website, our client interactions are really high and neighbour competitors are truly vanished.",
        author: "Rakesh Bihani",
        role: "Founder, Tejas-impex",
        index: "02",
    },
    {
        quote: "Despite having large no. of social media apps. They gave us a paradise which is highly user interactive and people are really enjoying it.",
        author: "Vedant Vyas",
        role: "Founder, PixelPilgrim",
        index: "03",
    },
];

/* ─── Ambient Orb (GSAP ticker, monochrome) ─────────────────── */
function AmbientOrb() {
    const orbRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: 0, y: 0 });
    const pos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", onMove);

        const ticker = gsap.ticker.add(() => {
            pos.current.x += (mouse.current.x - pos.current.x) * 0.05;
            pos.current.y += (mouse.current.y - pos.current.y) * 0.05;
            if (orbRef.current) {
                gsap.set(orbRef.current, {
                    x: pos.current.x - 350,
                    y: pos.current.y - 350,
                });
            }
        });

        return () => {
            window.removeEventListener("mousemove", onMove);
            gsap.ticker.remove(ticker);
        };
    }, []);

    return (
        <div
            ref={orbRef}
            className="pointer-events-none fixed z-0 w-[700px] h-[700px] rounded-full"
            style={{
                background:
                    "radial-gradient(circle, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 40%, transparent 70%)",
                filter: "blur(60px)",
                willChange: "transform",
            }}
        />
    );
}

/* ─── Noise Texture ──────────────────────────────────────────── */
function NoiseOverlay() {
    return (
        <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04] z-10"
            xmlns="http://www.w3.org/2000/svg"
        >
            <filter id="noise-t">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.72"
                    numOctaves="4"
                    stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise-t)" />
        </svg>
    );
}

/* ─── Individual draggable card ──────────────────────────────── */
interface CardProps {
    testimonial: (typeof testimonials)[0];
    isActive: boolean;
    onBringToFront: () => void;
    zIndex: number;
    initialRotate: number;
    initialX: number;
    initialY: number;
}

function TestimonialCard({
    testimonial,
    isActive,
    onBringToFront,
    zIndex,
    initialRotate,
    initialX,
    initialY,
}: CardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // 3-D tilt on hover
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springCfg = { damping: 22, stiffness: 180 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springCfg);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springCfg);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (isDragging || !cardRef.current) return;
            const r = cardRef.current.getBoundingClientRect();
            mouseX.set((e.clientX - r.left) / r.width - 0.5);
            mouseY.set((e.clientY - r.top) / r.height - 0.5);
        },
        [isDragging, mouseX, mouseY]
    );

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0);
        mouseY.set(0);
    }, [mouseX, mouseY]);

    // GSAP entrance
    useEffect(() => {
        if (!cardRef.current) return;
        gsap.fromTo(
            cardRef.current,
            { opacity: 0, scale: 0.88, y: 50 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1,
                delay: parseInt(testimonial.index) * 0.18,
                ease: "power4.out",
            }
        );
    }, [testimonial.index]);

    return (
        <motion.div
            ref={cardRef}
            drag
            dragMomentum={false}
            dragElastic={0.06}
            onDragStart={() => { setIsDragging(true); onBringToFront(); }}
            onDragEnd={() => setIsDragging(false)}
            onMouseDown={onBringToFront}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ rotate: initialRotate, x: initialX, y: initialY }}
            whileDrag={{ scale: 1.03, rotate: 0 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 900,
                zIndex,
                position: "absolute",
                touchAction: "none",
                userSelect: "none",
            }}
            className="w-[300px] md:w-[360px] cursor-grab active:cursor-grabbing"
        >
            {/* Glass shell */}
            <div
                className="relative rounded-none p-8 md:p-10 overflow-hidden select-none"
                style={{
                    background: isActive
                        ? "rgba(255,255,255,0.055)"
                        : "rgba(255,255,255,0.032)",
                    backdropFilter: "blur(32px) saturate(160%)",
                    WebkitBackdropFilter: "blur(32px) saturate(160%)",
                    border: isActive
                        ? "1px solid rgba(255,255,255,0.16)"
                        : "1px solid rgba(255,255,255,0.07)",
                    boxShadow: isActive
                        ? "0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12)"
                        : "0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
                    transition: "box-shadow 0.4s ease, border 0.4s ease, background 0.4s ease",
                }}
            >
                {/* Ghost index watermark */}
                <span className="font-anton text-[88px] leading-none absolute -top-3 right-4 select-none pointer-events-none text-white/[0.04]">
                    {testimonial.index}
                </span>

                {/* Open-quote glyph */}
                <div className="font-anton text-[52px] leading-none mb-1 text-white/25 select-none">
                    &ldquo;
                </div>

                {/* Quote */}
                <p className="font-inter text-[15px] md:text-[16px] leading-[1.75] text-white/75 mb-9 tracking-wide">
                    {testimonial.quote}
                </p>

                {/* Rule */}
                <div className="h-px w-8 mb-5 bg-white/20" />

                {/* Author block */}
                <div>
                    <p className="font-anton text-sm uppercase tracking-[0.2em] text-white/80">
                        {testimonial.author}
                    </p>
                    <p className="font-inter text-[11px] uppercase tracking-[0.25em] mt-1 text-white/30">
                        {testimonial.role}
                    </p>
                </div>

                {/* Drag label */}
                <AnimatePresence>
                    {!isDragging && (
                        <motion.div
                            className="absolute bottom-4 right-5 flex items-center gap-1.5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <svg
                                width="10"
                                height="10"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="rgba(255,255,255,0.2)"
                                strokeWidth="2"
                            >
                                <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20" />
                            </svg>
                            <span className="text-[9px] font-inter uppercase tracking-widest text-white/20">
                                drag
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

/* ─── Main Section ────────────────────────────────────────────── */
export default function Testimonials() {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const [zOrders, setZOrders] = useState([10, 11, 12]);

    // Character-stagger heading via GSAP
    useEffect(() => {
        if (!headingRef.current) return;
        const chars = headingRef.current.querySelectorAll(".char");
        gsap.fromTo(
            chars,
            { y: 90, opacity: 0, skewY: 4 },
            {
                y: 0,
                opacity: 1,
                skewY: 0,
                stagger: 0.04,
                duration: 0.9,
                ease: "power4.out",
                delay: 0.15,
            }
        );
    }, []);

    const bringToFront = (i: number) => {
        setZOrders((prev) => {
            const max = Math.max(...prev);
            if (prev[i] === max) return prev;
            const next = [...prev];
            next[i] = max + 1;
            return next;
        });
    };

    const initialPositions = [
        { rotate: -5, x: -30, y: 8 },
        { rotate: 3, x: 45, y: -25 },
        { rotate: -2, x: 8, y: 32 },
    ];

    const headingText = "Client Love.";

    return (
        <section
            className="relative w-full min-h-screen overflow-hidden"
            style={{ background: "#080808" }}
        >
            <NoiseOverlay />
            <AmbientOrb />

            {/* Fine grid */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
                    `,
                    backgroundSize: "64px 64px",
                }}
            />

            <div className="relative z-20 px-6 md:px-16 pt-16 md:pt-24 pb-20">

                {/* Top rule + label */}
                <div className="flex items-center justify-between mb-10 md:mb-14">
                    <div className="h-px flex-1 bg-white/[0.08]" />
                    <span className="font-inter text-[10px] uppercase tracking-[0.35em] text-white/25 px-6">
                        What they say
                    </span>
                    <div className="h-px flex-1 bg-white/[0.08]" />
                </div>

                {/* Heading */}
                <div className="overflow-hidden mb-2">
                    <h2
                        ref={headingRef}
                        className="font-anton text-[14vw] md:text-[9.5vw] leading-[0.88] uppercase text-white"
                    >
                        {headingText.split("").map((char, i) => (
                            <span
                                key={i}
                                className="char inline-block"
                                style={{ opacity: 0 }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </h2>
                </div>

                {/* Sub-label */}
                <p className="font-inter text-[11px] uppercase tracking-[0.28em] text-white/25 mb-0 md:mb-2">
                    — Real words · Real clients · Real results
                </p>

                {/* Drag stage */}
                <div
                    className="relative flex items-center justify-center"
                    style={{ height: "62vh", minHeight: 460 }}
                >
                    <motion.p
                        className="absolute font-inter text-[10px] uppercase tracking-[0.4em] text-white/10 pointer-events-none select-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        drag to explore
                    </motion.p>

                    {testimonials.map((t, i) => (
                        <TestimonialCard
                            key={t.index}
                            testimonial={t}
                            isActive={zOrders[i] === Math.max(...zOrders)}
                            onBringToFront={() => bringToFront(i)}
                            zIndex={zOrders[i]}
                            initialRotate={initialPositions[i].rotate}
                            initialX={initialPositions[i].x}
                            initialY={initialPositions[i].y}
                        />
                    ))}
                </div>

                {/* Bottom strip */}
                <div className="flex items-center justify-between pt-6 border-t border-white/[0.05]">
                    <div className="flex items-center gap-3">
                        {testimonials.map((t) => (
                            <div
                                key={t.index}
                                className="w-1 h-1 rounded-full bg-white/25"
                            />
                        ))}
                    </div>
                    <span className="font-inter text-[10px] uppercase tracking-[0.3em] text-white/15">
                        Vintvate Agency · {new Date().getFullYear()}
                    </span>
                </div>
            </div>
        </section>
    );
}
