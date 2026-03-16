import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { LayoutDashboard, Users, Newspaper, UserCircle, Briefcase, Plus } from "lucide-react"

export default async function AdminDashboard() {
    const stats = {
        projects: await prisma.project.count(),
        clients: await prisma.clientProfile.count(),
        blogs: await prisma.blog.count(),
        revenue: (await prisma.payment.aggregate({ _sum: { amount: true } }))._sum.amount || 0
    }

    const cards = [
        {
            title: "Clients",
            count: stats.clients,
            description: "High-value client relationship management.",
            href: "/admin/clients",
            Icon: UserCircle,
            color: "text-blue-500"
        },
        {
            title: "Missions",
            count: stats.projects,
            description: "Active development and operational control.",
            href: "/admin/projects",
            Icon: Briefcase,
            color: "text-green-500"
        },
        {
            title: "Archives",
            count: stats.blogs,
            description: "Public positioning and content marketing.",
            href: "/admin/blogs",
            Icon: Newspaper,
            color: "text-purple-500"
        },
    ]

    return (
        <div className="space-y-12">
            <header>
                <h1 className="font-anton text-6xl md:text-7xl tracking-tighter text-[var(--foreground)] uppercase leading-none">
                    Command <span className="opacity-20">Center</span>
                </h1>
                <p className="font-inter text-xs uppercase tracking-[0.4em] text-[var(--muted-foreground)] mt-4 font-bold">
                    Vintvate Intelligence Agency • Operational Status: ONLINE
                </p>
            </header>

            {/* Global Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Revenue', value: `₹${stats.revenue.toLocaleString('en-IN')}` },
                    { label: 'Strategic Clients', value: stats.clients },
                    { label: 'Live Projects', value: stats.projects },
                    { label: 'Publications', value: stats.blogs },
                ].map((s, i) => (
                    <div key={i} className="bg-[var(--card)] border border-[var(--border)] p-6 group hover:border-[var(--foreground)] transition-all">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">{s.label}</p>
                        <p className="font-anton text-3xl text-[var(--foreground)]">{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Module Grids */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <Link
                        key={card.title}
                        href={card.href}
                        className="group relative bg-[var(--card)] border border-[var(--border)] p-8 hover:border-[var(--foreground)] transition-all overflow-hidden flex flex-col justify-between aspect-square md:aspect-auto"
                    >
                        <div className="relative z-10">
                            <card.Icon className={`mb-4 opacity-50 group-hover:opacity-100 transition-opacity ${card.color}`} size={32} />
                            <h3 className="font-anton text-3xl tracking-tight text-[var(--foreground)] uppercase">
                                {card.title}
                            </h3>
                            <p className="font-inter text-xs text-[var(--muted-foreground)] mt-2 leading-relaxed max-w-[200px]">
                                {card.description}
                            </p>
                        </div>
                        
                        <div className="relative z-10 flex justify-between items-end mt-8">
                            <span className="font-anton text-5xl opacity-10 group-hover:opacity-100 transition-all duration-700 translate-y-2 group-hover:translate-y-0 uppercase">
                                {card.count}
                            </span>
                            <div className="bg-[var(--foreground)] text-[var(--background)] px-4 py-2 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                Enter Module
                            </div>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute -bottom-6 -right-6 font-anton text-[150px] leading-none opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                            {card.title.charAt(0)}
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions Bar */}
            <section className="pt-8 border-t border-[var(--border)]">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-6">Rapid Deployment</h4>
                <div className="flex flex-wrap gap-4">
                    <Link href="/admin/projects/create" className="flex items-center gap-2 px-6 py-3 bg-[var(--foreground)] text-[var(--background)] font-inter text-[10px] uppercase font-bold tracking-widest hover:opacity-90">
                        <Plus size={14} /> Initiate Project
                    </Link>
                    <Link href="/admin/clients/create" className="flex items-center gap-2 px-6 py-3 border border-[var(--border)] text-[var(--foreground)] font-inter text-[10px] uppercase font-bold tracking-widest hover:bg-[var(--accent)]">
                        <Plus size={14} /> Register Client
                    </Link>
                    <Link href="/admin/blogs/create" className="flex items-center gap-2 px-6 py-3 border border-[var(--border)] text-[var(--foreground)] font-inter text-[10px] uppercase font-bold tracking-widest hover:bg-[var(--accent)]">
                        <Plus size={14} /> Draft Archive
                    </Link>
                </div>
            </section>
        </div>
    )
}
