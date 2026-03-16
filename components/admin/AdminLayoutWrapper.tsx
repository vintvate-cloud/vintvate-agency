"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, Users, Newspaper, UserCircle, Briefcase, ChevronRight } from "lucide-react";
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
        <div className="min-h-screen bg-[var(--background)] flex font-inter">
            {/* Global Styles for Admin */}
            <style jsx global>{`
                nav.main-nav, footer.main-footer, .preloader { display: none !important; }
            `}</style>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 w-full z-40 bg-[var(--card)] border-b border-[var(--border)] p-4 flex justify-between items-center shadow-sm">
                <Link href="/" className="block">
                    <Image
                        src="/vintvatelogo-removebg-preview.png"
                        alt="Vintvate Logo"
                        width={30}
                        height={30}
                        className="brightness-0 dark:invert"
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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`
                    fixed md:sticky top-0 left-0 h-screen w-72 bg-[var(--card)] border-r border-[var(--border)] flex flex-col z-[60] transition-transform duration-500 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}
            >
                {/* Branding */}
                <div className="p-8 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-[var(--foreground)] p-2">
                             <Image
                                src="/vintvatelogo-removebg-preview.png"
                                alt="Vintvate Logo"
                                width={24}
                                height={24}
                                className="invert dark:brightness-0"
                            />
                        </div>
                        <h1 className="font-anton text-2xl tracking-tighter text-[var(--foreground)] uppercase">
                            Admin OS
                        </h1>
                    </div>
                    <div className="mt-8 flex items-center gap-3 p-3 bg-[var(--background)] border border-[var(--border)]">
                        <div className="w-8 h-8 bg-[var(--accent)] flex items-center justify-center font-anton text-xs">
                            {user.name?.charAt(0) || 'A'}
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase text-[var(--foreground)] truncate">{user.name || 'Administrator'}</p>
                            <p className="text-[8px] uppercase text-[var(--muted-foreground)] tracking-widest truncate">{user.email}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-8 overflow-y-auto space-y-1">
                    <div className="px-4 mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted-foreground)] opacity-40">
                            Core Modules
                        </span>
                    </div>
                    <NavLink href="/admin" label="Dashboard" Icon={LayoutDashboard} pathname={pathname} setOpen={setIsSidebarOpen} />
                    <NavLink href="/admin/clients" label="Clients" Icon={UserCircle} pathname={pathname} setOpen={setIsSidebarOpen} />
                    <NavLink href="/admin/projects" label="Mission Control" Icon={Briefcase} pathname={pathname} setOpen={setIsSidebarOpen} />
                    
                    <div className="px-4 mt-10 mb-4 pt-4 border-t border-[var(--border)]/50">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted-foreground)] opacity-40">
                            Content Ops
                        </span>
                    </div>
                    <NavLink href="/admin/blogs" label="Archives" Icon={Newspaper} pathname={pathname} setOpen={setIsSidebarOpen} />
                    <NavLink href="/admin/teams" label="Commanders" Icon={Users} pathname={pathname} setOpen={setIsSidebarOpen} />
                </nav>

                {/* Footer */}
                <div className="p-6">
                    <Link
                        href="/"
                        className="group flex items-center justify-between p-4 border border-[var(--border)] hover:border-[var(--foreground)] transition-all bg-[var(--background)]"
                    >
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">Terminate Session</span>
                        <ChevronRight size={14} className="text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors" />
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 w-full min-w-0 md:pt-0">
                {/* Visual Accent */}
                <div className="h-1 bg-[var(--foreground)] w-full opacity-10"></div>
                
                <div className="relative z-10 p-6 md:p-12 max-w-[1600px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

function NavLink({ href, label, Icon, pathname, setOpen }: { href: string; label: string; Icon: any; pathname: string; setOpen: (open: boolean) => void }) {
    const isActive = pathname === href;
    return (
        <Link
            href={href}
            onClick={() => setOpen(false)}
            className={`group flex items-center justify-between px-4 py-3 font-inter text-[11px] font-bold uppercase tracking-widest transition-all ${isActive
                ? "bg-[var(--foreground)] text-[var(--background)] shadow-lg shadow-[var(--foreground)]/10"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]"
                }`}
        >
            <div className="flex items-center gap-4">
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                <span>{label}</span>
            </div>
            {isActive && <motion.div layoutId="active" className="w-1 h-4 bg-[var(--background)]" />}
        </Link>
    );
}
