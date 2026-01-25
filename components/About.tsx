"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms - adjusting values for smooth horizontal gliding
  const x1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const x2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const x3 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const xRight1 = useTransform(scrollYProgress, [0, 1], [50, -100]);
  const xRight2 = useTransform(scrollYProgress, [0, 1], [-20, 80]); // Different speed/direction

  const textVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: { duration: 0.8, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] },
    }),
  };

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-black text-[#F4F4F4] px-6 py-24 md:px-12 flex flex-col justify-center items-start overflow-hidden">
      
      {/* Decorative Line */}
      <div className="w-full h-[1px] bg-white/20 mb-20 md:mb-32"></div>

      <div className="flex flex-col gap-2 md:gap-6 font-anton text-[12vw] leading-[0.9] uppercase tracking-wide mix-blend-difference w-full">
        {/* Line 1 */}
        <div className="overflow-hidden">
          <motion.div style={{ x: x1 }}>
            <motion.h2
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={textVariants}
            >
                WE CRAFT
            </motion.h2>
          </motion.div>
        </div>

        {/* Line 2 */}
        <div className="overflow-hidden self-center">
            <motion.div style={{ x: x2 }}>
                <motion.h2
                    custom={1}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    variants={textVariants}
                    className="text-transparent stroke-white stroke-[2px]" 
                    style={{ WebkitTextStroke: "2px white", color: "transparent" }}
                >
                    DIGITAL
                </motion.h2>
           </motion.div>
        </div>

        {/* Line 3 */}
        <div className="overflow-hidden">
             <motion.div style={{ x: x3 }}>
                <motion.h2
                    custom={2}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    variants={textVariants}
                >
                    EXPERIENCES
                </motion.h2>
            </motion.div>
        </div>
      </div>

       <div className="flex flex-col gap-2 md:gap-6 font-anton text-[12vw] leading-[0.9] uppercase tracking-wide text-right self-end mt-12 md:mt-0 w-full">
          {/* Line 4 - Right Aligned */}
          <div className="overflow-hidden self-end">
             <motion.div style={{ x: xRight1 }}>
                 <motion.h2
                  custom={3}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10%" }}
                  variants={textVariants}
                   className="text-[#F4F4F4]"
                >
                  THAT REFUSE
                </motion.h2>
            </motion.div>
          </div>
           {/* Line 5 - Right Aligned */}
           <div className="overflow-hidden self-end">
              <motion.div style={{ x: xRight2 }}>
                 <motion.h2
                  custom={4}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10%" }}
                  variants={textVariants}
                   className="text-transparent"
                   style={{ WebkitTextStroke: "2px white", color: "transparent" }}
                >
                  TO BE IGNORED
                </motion.h2>
             </motion.div>
          </div>
       </div>

       <div className="w-full h-[1px] bg-white/20 mt-20 md:mt-32"></div>
       
       <div className="w-full flex justify-between items-start mt-8 font-inter text-xs md:text-sm uppercase tracking-widest text-white/60">
          <p>Strategy / Design / Development</p>
          <p className="text-right max-w-xs normal-case tracking-normal">
            Based in Charlotte, we help brands define their voice in a crowded digital landscape.
          </p>
       </div>

    </section>
  );
}
