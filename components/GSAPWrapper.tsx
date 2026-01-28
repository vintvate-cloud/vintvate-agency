"use client";

import { useLayoutEffect, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GSAPWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    // Refresh ScrollTrigger on route change to handle dynamic height changes
    useEffect(() => {
        ScrollTrigger.refresh();
    }, [pathname]);

    return <>{children}</>;
}
