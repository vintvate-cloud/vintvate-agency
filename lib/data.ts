export interface Project {
    id: string;
    title: string;
    tagline: string;
    description: string;
    client: string;
    timeline: string;
    role: string;
    services: string[];
    challenge: string;
    solution: string;
    results: { label: string; value: string }[];
    heroImage: string;
    galleryImages: string[];
    liveUrl?: string;
}

export const projects: Project[] = [
    {
        id: "nova-banking",
        title: "Nova Banking",
        tagline: "The Future of Digital Finance",
        description: "A complete overhaul of Nova's digital presence, focusing on trust, speed, and accessibility for the next generation of investors.",
        client: "Nova Financial Group",
        timeline: "4 Months",
        role: "Design & Development",
        services: ["UI/UX Design", "Next.js Development", "Design System"],
        challenge: "Nova's legacy platform was slow, cluttered, and failing to convert younger demographics. They needed a mobile-first experience that felt secure yet modern.",
        solution: "We built a high-performance web application using Next.js and Tailwind CSS. The interface relies on dark mode aesthetics with neon accents to convey a 'futuristic' feel while maintaining strict accessibility standards.",
        results: [
            { label: "Conversion Rate", value: "+45%" },
            { label: "Page Load Time", value: "0.8s" },
            { label: "User Retention", value: "+30%" },
        ],
        heroImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop",
        galleryImages: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2670&auto=format&fit=crop",
        ],
        liveUrl: "#",
    },
    {
        id: "apex-fitness",
        title: "Apex Fitness",
        tagline: "Performance Tracking Redefined",
        description: "A high-energy, motion-driven landing page for a premium fitness app.",
        client: "Apex Labs",
        timeline: "6 Weeks",
        role: "Frontend Development",
        services: ["React", "GSAP Animations", "WebGL"],
        challenge: "Apex needed their web presence to match the intensity of their workouts. Static images weren't enough.",
        solution: "We utilized GSAP for scroll-triggered animations and WebGL for a 3D interactive hero section, creating an immersive experience that mirrors the app's energy.",
        results: [
            { label: "App Downloads", value: "10k+" },
            { label: "Bounce Rate", value: "-25%" },
            { label: "Session Duration", value: "3m+" },
        ],
        heroImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop",
        galleryImages: [
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?q=80&w=2670&auto=format&fit=crop",
        ],
        liveUrl: "#",
    },
    {
        id: "luna-interiors",
        title: "Luna Interiors",
        tagline: "Minimalism Meets Warmth",
        description: "E-commerce platform for high-end sustainable furniture.",
        client: "Luna Studio",
        timeline: "3 Months",
        role: "Full Stack",
        services: ["Shopify Headless", "Next.js", "Framer Motion"],
        challenge: "To sell premium furniture online without a showroom, the digital experience had to feel tactile and high-fidelity.",
        solution: "We implemented large-scale imagery, smooth page transitions, and a custom 'View in Room' feature using AR libraries.",
        results: [
            { label: "Sales Growth", value: "+120%" },
            { label: "Cart Abandonment", value: "-15%" },
            { label: "Return Rate", value: "<2%" },
        ],
        heroImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2516&auto=format&fit=crop",
        galleryImages: [
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1616486029423-aaa4789e2c97?q=80&w=2662&auto=format&fit=crop",
        ],
        liveUrl: "#",
    }
];
