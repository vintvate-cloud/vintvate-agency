import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function TemplatesPage() {
    // Fetch all and filter in JS until 'type' column is migrated
    const allProjects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    });
    const projects = allProjects.filter(p => p.type === 'TEMPLATE');

    return (
        <main className="w-full min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-32 px-6 md:px-12 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <h1 className="font-anton text-6xl md:text-9xl uppercase leading-none">
                    Templates
                </h1>
                <Link
                    href="/works"
                    className="group flex items-center gap-3 font-inter text-sm uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors border-b border-[var(--border)] pb-1 w-fit self-end md:self-auto"
                >
                    ← Client Work
                </Link>
            </div>

            <p className="font-inter text-base opacity-60 mb-16 max-w-xl">
                Ready-to-use templates and products we&apos;ve crafted. Deploy instantly with full customization support.
            </p>

            {projects.length === 0 ? (
                <div className="border border-dashed border-[var(--border)] p-20 text-center">
                    <p className="font-inter text-sm text-[var(--muted-foreground)]">No templates yet. Add some from the admin panel.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {projects.map((project) => (
                        <Link href={`/works/${project.id}`} key={project.id} className="group block">
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg mb-6 border border-[var(--border)]">
                                <Image
                                    src={project.image || "/placeholder-project.jpg"}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                                {/* Template badge */}
                                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold font-inter uppercase tracking-widest px-2 py-1">
                                    Template
                                </div>

                                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ArrowUpRight className="w-5 h-5 text-white" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <h2 className="font-anton text-2xl md:text-3xl uppercase">{project.title}</h2>
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="mt-1 font-inter text-[10px] uppercase tracking-widest text-blue-500 hover:underline flex items-center gap-1"
                                        >
                                            Live <ArrowUpRight className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>
                                <p className="font-inter text-sm opacity-70 line-clamp-2 max-w-md">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {project.tags && project.tags.split(',').slice(0, 3).map((s, i) => (
                                        <span key={i} className="text-[10px] font-bold font-inter uppercase tracking-widest border border-[var(--foreground)]/20 px-2 py-1 rounded-full opacity-60">
                                            {s.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}
