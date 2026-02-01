"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, ExternalLink } from "lucide-react";

interface DBProject {
    id: string;
    title: string;
    description: string;
    image: string | null;
    link: string | null;
    tags: string | null;
    createdAt: Date;
}

export default function ProjectView({ project, nextProject }: { project: DBProject, nextProject: DBProject | null }) {

    // Derived/Fallback Data
    const services = project.tags ? project.tags.split(',') : ["Design", "Development"];
    const year = new Date(project.createdAt).getFullYear();
    const timeline = `${year}`;

    const renderDescription = (text: string) => {
        const lines = text.split('\n');
        const elements: React.ReactNode[] = [];
        let listItems: string[] = [];

        lines.forEach((line, index) => {
            const trimmed = line.trim();
            if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
                listItems.push(trimmed.substring(1).trim());
            } else {
                if (listItems.length > 0) {
                    elements.push(
                        <ul key={`list-${index}`} className="list-disc pl-5 mb-6 space-y-2 text-lg md:text-xl text-[var(--muted-foreground)] font-inter font-light">
                            {listItems.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    );
                    listItems = [];
                }
                if (trimmed) {
                    elements.push(
                        <p key={`p-${index}`} className="font-inter text-lg md:text-xl leading-relaxed text-[var(--muted-foreground)] mb-6 font-light">
                            {trimmed}
                        </p>
                    );
                }
            }
        });

        if (listItems.length > 0) {
            elements.push(
                <ul key="list-end" className="list-disc pl-5 mb-6 space-y-2 text-lg md:text-xl text-[var(--muted-foreground)] font-inter font-light">
                    {listItems.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            );
        }

        return elements;
    };

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-white pt-20 md:pt-32 pb-20">

            {/* Header Content */}
            <section className="px-6 md:px-12 max-w-[1920px] mx-auto mb-12 md:mb-20">
                <div className="flex flex-col gap-6">
                    {/* Back Link */}
                    <Link href="/works" className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors w-fit group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-inter uppercase tracking-widest text-xs">Back to Works</span>
                    </Link>

                    {/* Title & Tags */}
                    <div className="space-y-8 mt-8">
                        <div className="flex flex-wrap gap-3">
                            {services.map((s, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-1.5 border border-[var(--border)] rounded-full text-xs font-inter uppercase tracking-widest text-[var(--muted-foreground)]"
                                >
                                    {s.trim()}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                            <h1 className="font-anton text-[10vw] md:text-[6vw] leading-[0.9] uppercase text-[var(--foreground)]">
                                {project.title}
                            </h1>

                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--foreground)] text-[var(--background)] rounded-full hover:scale-105 transition-transform duration-300 font-inter text-sm uppercase tracking-widest font-medium w-fit whitespace-nowrap mb-2"
                                >
                                    Visit Live Site <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Hero Image Block */}
            <section className="px-6 md:px-12 max-w-[1920px] mx-auto mb-20 md:mb-32">
                <div className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden bg-[var(--card)]">
                    <Image
                        src={project.image || "/placeholder-project.jpg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </section>

            {/* Project Details Grid */}
            <section className="px-6 md:px-12 max-w-[1920px] mx-auto mb-32">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">

                    {/* Sidebar / Metadata */}
                    <div className="md:col-span-4 space-y-8 md:sticky md:top-32 h-fit">
                        <div className="flex flex-col gap-8 border-t border-[var(--border)] pt-8">
                            <div>
                                <h3 className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-2">Timeline</h3>
                                <p className="font-inter text-lg text-[var(--foreground)]">{timeline}</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-8">
                        <div className="prose prose-lg max-w-none">
                            <h3 className="font-anton text-4xl uppercase text-[var(--foreground)] mb-8">Overview</h3>
                            <div className="text-[var(--muted-foreground)]">
                                {renderDescription(project.description)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Project Footer */}
            {nextProject && (
                <section className="border-t border-[var(--border)] mt-20">
                    <Link href={`/works/${nextProject.id}`} className="group block py-20 px-6 md:px-12 bg-[var(--card)] hover:bg-[var(--foreground)] transition-colors duration-500">
                        <div className="max-w-[1920px] mx-auto flex flex-col items-center text-center">
                            <span className="font-inter uppercase tracking-widest text-sm text-[var(--muted-foreground)] mb-4 group-hover:text-[var(--background)] transition-colors">Next Case Study</span>
                            <h2 className="font-anton text-6xl md:text-8xl uppercase text-[var(--foreground)] group-hover:text-[var(--background)] transition-colors">
                                {nextProject.title}
                            </h2>
                        </div>
                    </Link>
                </section>
            )}
        </main>
    );
}
