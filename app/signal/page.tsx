import { motion } from "framer-motion";
import FlowingMenu from "@/components/FlowingMenu";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function SignalPage() {
    const blogs = await prisma.blog.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
            title: true,
            slug: true,
            image: true
        }
    });

    const articles = blogs.map(blog => ({
        link: `/signal/${blog.slug}`,
        text: blog.title,
        image: blog.image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop" // Fallback
    }));

    return (
        <main className="w-full min-h-screen bg-[var(--background)] pt-32 pb-20 px-6 md:px-12 flex flex-col">

            <div // Removed Motion div for server component compatibility, or keep it if using client wrapper
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
            </div>

            <div className="w-full h-[85vh] relative border-t border-b border-[var(--border)]">
                {articles.length > 0 ? (
                    <FlowingMenu
                        items={articles}
                        speed={20}
                        textColor="var(--foreground)"
                        bgColor="transparent"
                        marqueeBgColor="var(--foreground)"
                        marqueeTextColor="var(--background)"
                        borderColor="var(--border)"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-[var(--muted-foreground)] font-inter uppercase tracking-widest">
                        No Transmissions Yet
                    </div>
                )}
            </div>

        </main>
    );
}
