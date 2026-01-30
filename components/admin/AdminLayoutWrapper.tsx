"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminLayoutWrapperProps {
    children: React.ReactNode;
    user: {
        email?: string | null;
        name?: string | null;
        role?: string | null;
    };
}



export default function AdminLayoutWrapper({ children, user }: AdminLayoutWrapperProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-[var(--background)] flex">
            {/* Global Styles for Admin */}
            <style jsx global>{`
                nav.main-nav, footer.main-footer, .preloader { display: none !important; }
            `}</style>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 w-full z-40 bg-[var(--card)] border-b border-[var(--border)] p-4 flex justify-between items-center">
                <Link href="/" className="block">
                    <Image
                        src="/vintvatelogo-removebg-preview.png"
                        alt="Vintvate Logo"
                        width={40}
                        height={40}
                        className="brightness-0 dark:invert dark:brightness-0"
                    />
                </Link>
                <button onClick={() => setIsSidebarOpen(true)} className="text-[var(--foreground)]">
                    <Menu size={24} />
                </button>
            </div>

            {/* Backdrop */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 z-50 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`
                    fixed md:sticky top-0 left-0 h-screen w-72 bg-[var(--card)] border-r border-[var(--border)] flex flex-col z-[60] transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}
            >
                {/* Close Button (Mobile) */}
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute top-4 right-4 md:hidden text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                    <X size={24} />
                </button>

                {/* Logo/Brand */}
                <div className="p-8 border-b border-[var(--border)]">
                    <Link href="/" className="hidden md:block">
                        <Image
                            src="/vintvatelogo-removebg-preview.png"
                            alt="Vintvate Logo"
                            width={60}
                            height={60}
                            className="brightness-0 dark:invert dark:brightness-0"
                        />
                    </Link>
                    <h1 className="font-anton text-2xl tracking-tight text-[var(--foreground)] mt-4 uppercase">
                        Admin Panel
                    </h1>
                    <p className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] mt-1 truncate">
                        {user.email}
                    </p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 overflow-y-auto">
                    <div className="px-4 mb-4">
                        <span className="font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]">
                            Menu
                        </span>
                    </div>
                    <NavLink href="/admin" label="Dashboard" icon="◆" pathname={pathname} setOpen={setIsSidebarOpen} />
                    <NavLink href="/admin/blogs" label="Blogs" icon="◇" pathname={pathname} setOpen={setIsSidebarOpen} />
                    <NavLink href="/admin/teams" label="Teams" icon="○" pathname={pathname} setOpen={setIsSidebarOpen} />
                    <NavLink href="/admin/projects" label="Projects" icon="□" pathname={pathname} setOpen={setIsSidebarOpen} />
                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-[var(--border)]">
                    <Link
                        href="/"
                        className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors flex items-center gap-2"
                    >
                        <span>←</span> Back to Site
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 w-full min-w-0 pt-[72px] md:pt-0 overflow-y-auto h-screen">
                {/* Background Watermark */}
                <div className="fixed top-0 right-0 w-full md:w-[calc(100%-18rem)] h-full flex items-center justify-center pointer-events-none opacity-[0.02] select-none overflow-hidden">
                    <span className="font-anton text-[20vh] md:text-[40vh] leading-none whitespace-nowrap text-[var(--foreground)] -rotate-12 origin-center">
                        VINTVATE
                    </span>
                </div>

                <div className="relative z-10 p-6 md:p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}

function NavLink({ href, label, icon, pathname, setOpen }: { href: string; label: string; icon: string; pathname: string; setOpen: (open: boolean) => void }) {
    const isActive = pathname === href;
    return (
        <Link
            href={href}
            onClick={() => setOpen(false)}
            className={`group flex items-center gap-4 px-8 py-3 font-inter text-sm uppercase tracking-widest transition-all ${isActive
                ? "bg-[var(--foreground)] text-[var(--background)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]"
                }`}
        >
            <span className={`text-xs transition-opacity ${isActive ? "opacity-100" : "opacity-50 group-hover:opacity-100"}`}>{icon}</span>
            {label}
        </Link>
    );
}
