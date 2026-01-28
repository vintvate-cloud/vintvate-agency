'use client'

import Link from "next/link";
import { motion } from "framer-motion";

const cards = [
    {
        title: "Blogs",
        description: "Manage your blog posts, create new articles, and update existing ones.",
        href: "/admin/blogs",
        icon: "◇",
    },
    {
        title: "Teams",
        description: "Manage team members, roles, and profiles.",
        href: "/admin/teams",
        icon: "○",
    },
    {
        title: "Projects",
        description: "Showcase your work, manage project details and images.",
        href: "/admin/projects",
        icon: "□",
    },
];

export default function AdminDashboard() {
    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="font-anton text-5xl md:text-6xl tracking-tighter text-[var(--foreground)] uppercase">
                    Dashboard
                </h1>
                <p className="font-inter text-sm uppercase tracking-widest text-[var(--muted-foreground)] mt-2">
                    Welcome back, Admin
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {cards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    >
                        <Link
                            href={card.href}
                            className="group block p-8 bg-[var(--card)] border border-[var(--border)] hover:border-[var(--foreground)] transition-all duration-300"
                        >
                            <span className="text-2xl opacity-30 group-hover:opacity-100 transition-opacity">
                                {card.icon}
                            </span>
                            <h3 className="font-anton text-2xl tracking-tight text-[var(--foreground)] uppercase mt-4">
                                {card.title}
                            </h3>
                            <p className="font-inter text-sm text-[var(--muted-foreground)] mt-2 leading-relaxed">
                                {card.description}
                            </p>
                            <div className="flex items-center gap-2 mt-6 font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
                                <span>Manage</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Stats Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-16"
            >
                <h2 className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-6">
                    Quick Actions
                </h2>
                <div className="flex flex-wrap gap-4">
                    <Link
                        href="/admin/blogs/create"
                        className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)] font-inter text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
                    >
                        + New Blog
                    </Link>
                    <Link
                        href="/admin/teams/create"
                        className="px-6 py-3 border border-[var(--border)] text-[var(--foreground)] font-inter text-xs uppercase tracking-widest hover:bg-[var(--accent)] transition-colors"
                    >
                        + New Team Member
                    </Link>
                    <Link
                        href="/admin/projects/create"
                        className="px-6 py-3 border border-[var(--border)] text-[var(--foreground)] font-inter text-xs uppercase tracking-widest hover:bg-[var(--accent)] transition-colors"
                    >
                        + New Project
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}
