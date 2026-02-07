"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShaderAnimation } from "./shader-animation";


export default function Footer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();



    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            // Parallax Text Effect
            gsap.fromTo(textRef.current,
                { y: 100 },
                {
                    y: -100,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    }
                }
            );

            // CTA Reveal
            gsap.from(ctaRef.current?.children || [], {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: "top 80%",
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    if (pathname?.startsWith("/admin")) return null;

    return (
        <footer ref={containerRef} className="relative w-full bg-[#050505] text-[#F4F4F4] pt-20 pb-6 px-6 md:px-12 overflow-hidden flex flex-col justify-between min-h-screen">

            {/* Background Shader */}
            <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
                <ShaderAnimation />
            </div>

            {/* Top Section: Links and Call to Action */}
            <div className="flex flex-col md:flex-row justify-between items-start w-full z-10 gap-10 md:gap-0">

                {/* CTA */}
                <div ref={ctaRef} className="flex flex-col gap-4 max-w-lg">
                    <h3 className="font-anton text-4xl md:text-6xl uppercase leading-tight">
                        Let&apos;s start<br />something new.
                    </h3>
                    <Link href="/lets-work" className="font-inter text-sm md:text-base uppercase tracking-widest border-b border-white/30 pb-1 w-fit hover:border-white transition-colors">
                        Get in Touch
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col md:flex-row gap-12 md:gap-20 font-inter text-xs md:text-sm uppercase tracking-widest text-white/60">



                    <div className="flex flex-col gap-4">
                        <span className="text-white font-bold opacity-100 mb-2">Socials</span>
                        <Link href="https://instagram.com" target="_blank" className="hover:text-white transition-colors">Instagram</Link>
                        <Link href="https://twitter.com" target="_blank" className="hover:text-white transition-colors">Twitter</Link>
                        <Link href="https://linkedin.com" target="_blank" className="hover:text-white transition-colors">LinkedIn</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-white font-bold opacity-100 mb-2">Directory</span>
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <Link href="/about" className="hover:text-white transition-colors">About</Link>
                        <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                        <Link href="/works" className="hover:text-white transition-colors">Works</Link>
                        <Link href="/lets-work" className="hover:text-white transition-colors">Let&apos;s Work</Link>
                        <Link href="/sitemap" className="hover:text-[var(--primary)] transition-colors text-white font-bold">System Index</Link>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Massive Text */}
            <div className="w-full mt-auto relative z-10 pt-20 md:pt-0">
                <h1
                    ref={textRef}
                    className="font-anton text-[26vw] md:text-[18vw] leading-[0.75] text-center md:text-justify w-full uppercase tracking-tighter mix-blend-difference opacity-90 select-none pb-0 mb-0 -ml-[1vw]"
                >
                    VINTVATE
                </h1>
                <span className="hidden md:block absolute right-0 bottom-8 font-mono text-sm tracking-[0.3em] text-[#F4F4F4] [writing-mode:vertical-rl] rotate-180 opacity-60">
                    #CODEUNLEASHED
                </span>
            </div>

            {/* Copyright / Extra Info */}
            <div className="flex flex-col md:flex-row justify-between items-center w-full mt-4 border-t border-white/10 pt-6 font-inter text-[10px] uppercase tracking-widest text-white/40">
                <p>&copy; 2026 Vintvate Agency. All Rights Reserved.</p>
                <div className="flex gap-4 mt-2 md:mt-0">
                    <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
                </div>
            </div>

        </footer>
    );
}
