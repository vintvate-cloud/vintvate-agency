import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import DeleteProjectButton from './DeleteProjectButton'

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({ 
        include: { 
            client: true,
            payments: true
        },
        orderBy: { createdAt: 'desc' } 
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PROGRESS': return 'bg-blue-500 text-white'
            case 'COMPLETED': return 'bg-green-500 text-white'
            case 'PAUSED': return 'bg-yellow-500 text-black'
            default: return 'bg-[var(--accent)] text-[var(--muted-foreground)]'
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="font-anton text-5xl tracking-tighter text-[var(--foreground)] uppercase">
                        Portfolio & Ops
                    </h1>
                    <p className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] mt-1">
                        Monitoring {projects.length} Agency Projects
                    </p>
                </div>
                <Link
                    href="/admin/projects/create"
                    className="px-8 py-3 bg-[var(--foreground)] text-[var(--background)] font-inter text-xs uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-2"
                >
                    <span className="text-lg">+</span> Initiate Project
                </Link>
            </div>

            {/* Project Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Volume', value: `₹${projects.reduce((acc, p) => acc + (p.budget || 0), 0).toLocaleString('en-IN')}` },
                    { label: 'Amount Received', value: `₹${projects.reduce((acc, p) => acc + (p.payments?.reduce((pa, c) => pa + c.amount, 0) || 0), 0).toLocaleString('en-IN')}` },
                    { label: 'Active Builds', value: projects.filter(p => p.status === 'PROGRESS').length },
                    { label: 'Completed', value: projects.filter(p => p.status === 'COMPLETED').length },
                ].map((stat, i) => (
                    <div key={i} className="border border-[var(--border)] bg-[var(--card)] p-4">
                        <p className="font-inter text-[10px] uppercase tracking-tighter text-[var(--muted-foreground)] mb-1">{stat.label}</p>
                        <p className="font-anton text-2xl text-[var(--foreground)]">{stat.value}</p>
                    </div>
                ))}
            </div>

            {projects.length === 0 ? (
                <div className="border border-dashed border-[var(--border)] p-16 text-center">
                    <p className="font-inter text-sm text-[var(--muted-foreground)]">🚀 Ready to start a new mission? Click "Initiate Project".</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {projects.map((project: any) => {
                        const received = project.payments?.reduce((acc: any, p: any) => acc + p.amount, 0) || 0
                        const progress = project.budget ? (received / project.budget) * 100 : 0

                        return (
                            <div
                                key={project.id}
                                className="group border border-[var(--border)] bg-[var(--card)] hover:border-[var(--foreground)] transition-all flex flex-col md:flex-row overflow-hidden"
                            >
                                {/* Mini Image / Branding */}
                                <div className="md:w-48 aspect-video md:aspect-square relative bg-[var(--background)] border-r border-[var(--border)] flex-shrink-0">
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center font-anton text-4xl opacity-10">
                                            {project.title.charAt(0)}
                                        </div>
                                    )}
                                    <div className={`absolute top-2 left-2 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest ${getStatusColor(project.status)}`}>
                                        {project.status}
                                    </div>
                                </div>

                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-anton text-2xl tracking-tight text-[var(--foreground)] uppercase">
                                                    {project.title}
                                                </h3>
                                                {project.client && (
                                                    <span className="text-[10px] text-[var(--muted-foreground)] opacity-50 uppercase font-inter">/ {project.client.name}</span>
                                                )}
                                            </div>
                                            <p className="font-inter text-xs text-[var(--muted-foreground)] line-clamp-1 max-w-xl">
                                                {project.description}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-anton text-xl text-[var(--foreground)]">₹{(project.budget || 0).toLocaleString('en-IN')}</p>
                                            <p className="font-inter text-[10px] uppercase text-[var(--muted-foreground)]">Contract Value</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[8px] uppercase font-bold tracking-widest text-[var(--muted-foreground)]">
                                                <span>Payment Status</span>
                                                <span>{Math.round(progress)}% PAID</span>
                                            </div>
                                            <div className="h-1 bg-[var(--border)] w-full rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-green-500 transition-all duration-1000" 
                                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-4 items-center">
                                            <div className="text-[10px] font-inter uppercase tracking-widest text-[var(--muted-foreground)]">
                                                Starts: <span className="text-[var(--foreground)]">{project.startDate ? new Date(project.startDate).toLocaleDateString() : '—'}</span>
                                            </div>
                                            {project.link && (
                                                <a href={project.link} target="_blank" className="text-[10px] uppercase font-bold text-blue-500 hover:underline">Deploy ↗</a>
                                            )}
                                        </div>

                                        <div className="flex gap-2">
                                            <Link
                                                href={`/admin/projects/edit/${project.id}`}
                                                className="flex-1 py-1.5 font-inter text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] text-center border border-[var(--border)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
                                            >
                                                Manage Ops
                                            </Link>
                                            <DeleteProjectButton projectId={project.id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
