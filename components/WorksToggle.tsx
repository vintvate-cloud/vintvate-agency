"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Monitor, Smartphone, LayoutTemplate } from "lucide-react";

type Project = {
    id: string;
    title: string;
    description: string | null;
    image: string | null;
    tags: string | null;
    link: string | null;
    type: string | null;
    createdAt: Date;
};

type Tab = "website" | "app" | "template";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "website", label: "Website", icon: <Monitor className="w-3.5 h-3.5" /> },
    { id: "app", label: "App", icon: <Smartphone className="w-3.5 h-3.5" /> },
    { id: "template", label: "Template", icon: <LayoutTemplate className="w-3.5 h-3.5" /> },
];

function matchesTab(project: Project, tab: Tab): boolean {
    if (tab === "template") return project.type === "TEMPLATE";
    if (tab === "app")     return project.type === "APP";
    if (tab === "website") return project.type === "WEBSITE" || project.type === "CLIENT" || !project.type;
    return false;
}

export default function WorksToggle({ projects }: { projects: Project[] }) {
    const [active, setActive] = useState<Tab>("website");

    const filtered = projects.filter((p) => matchesTab(p, active));

    return (
        <>
            {/* Toggle Bar */}
            <div className="flex items-center mb-16">
                <div
                    className="inline-flex items-center gap-1 p-1 rounded-full border border-[var(--border)] bg-[var(--background)]"
                    style={{ boxShadow: "0 2px 16px 0 rgba(0,0,0,0.07)" }}
                >
                    {TABS.map((tab) => {
                        const isActive = active === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActive(tab.id)}
                                className={`
                                    relative flex items-center gap-2 px-5 py-2 rounded-full
                                    font-inter text-xs font-bold uppercase tracking-widest
                                    transition-all duration-300 ease-out
                                    ${isActive
                                        ? "bg-[var(--foreground)] text-[var(--background)] shadow-sm"
                                        : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                    }
                                `}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Project count */}
                <span className="ml-4 font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                    {filtered.length} project{filtered.length !== 1 ? "s" : ""}
                </span>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <div className="border border-dashed border-[var(--border)] p-20 text-center">
                    <p className="font-inter text-sm text-[var(--muted-foreground)]">
                        No {active} projects yet. Add some from the admin panel.
                    </p>
                </div>
            ) : (
                <div
                    key={active}
                    className={`grid gap-x-8 gap-y-16 ${
                        active === "template"
                            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1 md:grid-cols-2"
                    }`}
                    style={{ animation: "worksGridFadeIn 0.4s ease-out" }}
                >
                    {filtered.map((project) => (
                        <Link
                            href={`/works/${project.id}`}
                            key={project.id}
                            className="group block"
                        >
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg mb-6 border border-[var(--border)]">
                                <Image
                                    src={project.image || "/placeholder-project.jpg"}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                                {/* Template badge */}
                                {active === "template" && (
                                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold font-inter uppercase tracking-widest px-2 py-1">
                                        Template
                                    </div>
                                )}

                                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ArrowUpRight className="w-5 h-5 text-white" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <h2
                                        className={`font-anton uppercase ${
                                            active === "template"
                                                ? "text-2xl md:text-3xl"
                                                : "text-3xl md:text-4xl"
                                        }`}
                                    >
                                        {project.title}
                                    </h2>
                                    <div className="flex flex-col items-end gap-1 mt-1">
                                        <span className="font-inter text-xs uppercase tracking-widest opacity-60">
                                            {new Date(project.createdAt).getFullYear()}
                                        </span>
                                        {project.link && active === "template" && (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    window.open(project.link!, "_blank", "noopener,noreferrer");
                                                }}
                                                className="font-inter text-[10px] uppercase tracking-widest text-blue-500 hover:underline flex items-center gap-1"
                                            >
                                                Live <ArrowUpRight className="w-3 h-3" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <p className="font-inter text-sm md:text-base opacity-70 line-clamp-2 max-w-md">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {project.tags &&
                                        project.tags
                                            .split(",")
                                            .slice(0, 3)
                                            .map((s, i) => (
                                                <span
                                                    key={i}
                                                    className="text-[10px] font-bold font-inter uppercase tracking-widest border border-[var(--foreground)]/20 px-2 py-1 rounded-full opacity-60"
                                                >
                                                    {s.trim()}
                                                </span>
                                            ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            <style>{`
                @keyframes worksGridFadeIn {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}
