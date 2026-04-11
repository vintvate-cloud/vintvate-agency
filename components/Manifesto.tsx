"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const text = "WE DON'T BUILD WEBSITES. WE BUILD DIGITAL WEAPONS. IF YOU WANT A TEMPLATE, GO SOMEWHERE ELSE. IF YOU WANT TO DOMINATE YOUR INDUSTRY, KEEP SCROLLING.";

export default function Manifesto() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!textRef.current || !containerRef.current) return;

        const words = textRef.current.querySelectorAll(".man-word");

        // Set initial state
        gsap.set(words, { opacity: 0.15 });

        // Create the scroll animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%", // Start a bit earlier
                end: "bottom 60%", // End later (gives a much wider scroll range for the animation)
                scrub: 2, // Highly smooth, delayed scrub for luxurious feel
            }
        });

        tl.to(words, {
            opacity: 1,
            stagger: 0.5, // High stagger increases overlap of words fading in
            duration: 2, // Slow, fluid fade
            ease: "power2.inOut", // Smooth easing instead of linear "none"
        });

        return () => {
            if (tl.scrollTrigger) tl.scrollTrigger.kill();
            tl.kill();
        };
    }, []);

    // Split text by spaces to wrap each word
    const wordsArray = text.split(" ");

    return (
        <section 
            ref={containerRef}
            className="w-full min-h-[70vh] flex items-center justify-center pb-24 md:pb-40 pt-12 md:pt-20 bg-[#080808] relative z-20 px-6 md:px-12 lg:px-20"
        >
            <div className="max-w-screen-2xl mx-auto w-full flex flex-col items-center">
                <div className="flex items-center justify-center gap-4 mb-8 md:mb-16 w-full">
                    <div className="w-8 h-[1px] bg-white/30"></div>
                    <p className="font-inter text-xs md:text-sm uppercase tracking-[0.3em] text-white/40 text-center">
                        The Manifesto
                    </p>
                    <div className="w-8 h-[1px] bg-white/30"></div>
                </div>

                <h2 
                    ref={textRef}
                    className="font-anton text-[10vw] md:text-[6vw] lg:text-[7vw] leading-[0.9] text-white uppercase text-balance text-center"
                >
                    {wordsArray.map((word, i) => (
                        <span key={i} className="inline-block mr-[2vw] md:mr-[1vw] pb-2 md:pb-4">
                            <span className="man-word opacity-[0.15] transition-all duration-200 hover:!opacity-100 cursor-default">
                                {word}
                            </span>
                        </span>
                    ))}
                </h2>
                
                <div className="mt-16 md:mt-24 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>
        </section>
    );
}
