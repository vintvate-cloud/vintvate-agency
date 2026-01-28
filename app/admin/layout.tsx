import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import Image from "next/image";

export default async function AdminLayout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "ADMIN") {
        redirect("/admin-login");
    }

    return (
        <>
            <style>{`
        nav, footer, .preloader { display: none !important; }
      `}</style>
            <div className="fixed inset-0 z-[9999] flex bg-[var(--background)]">
                {/* Sidebar */}
                <aside className="w-72 bg-[var(--card)] border-r border-[var(--border)] flex flex-col">
                    {/* Logo/Brand */}
                    <div className="p-8 border-b border-[var(--border)]">
                        <Link href="/" className="block">
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
                        <p className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] mt-1">
                            {session.user.email}
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 py-6">
                        <div className="px-4 mb-4">
                            <span className="font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]">
                                Menu
                            </span>
                        </div>
                        <NavLink href="/admin" label="Dashboard" icon="◆" />
                        <NavLink href="/admin/blogs" label="Blogs" icon="◇" />
                        <NavLink href="/admin/teams" label="Teams" icon="○" />
                        <NavLink href="/admin/projects" label="Projects" icon="□" />
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
                <main className="flex-1 overflow-y-auto">
                    {/* Background Watermark */}
                    <div className="fixed top-0 right-0 w-[calc(100%-18rem)] h-full flex items-center justify-center pointer-events-none opacity-[0.02] select-none overflow-hidden">
                        <span className="font-anton text-[40vh] leading-none whitespace-nowrap text-[var(--foreground)] -rotate-12 origin-center">
                            VINTVATE
                        </span>
                    </div>

                    <div className="relative z-10 p-10">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}

function NavLink({ href, label, icon }: { href: string; label: string; icon: string }) {
    return (
        <Link
            href={href}
            className="group flex items-center gap-4 px-8 py-3 font-inter text-sm uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)] transition-all"
        >
            <span className="text-xs opacity-50 group-hover:opacity-100 transition-opacity">{icon}</span>
            {label}
        </Link>
    );
}
