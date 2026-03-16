import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import DeleteClientButton from './DeleteClientButton'
import { ClientProfile, Project, Payment } from '@prisma/client'

type ClientWithProjects = ClientProfile & {
    projects: (Project & {
        payments: Payment[]
    })[]
}

export default async function ClientsPage() {
    const clients = await prisma.clientProfile.findMany({
        include: { 
            projects: {
                include: { payments: true }
            } 
        },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="font-anton text-5xl md:text-6xl tracking-tighter text-[var(--foreground)] uppercase">
                        Clients
                    </h1>
                    <p className="font-inter text-sm uppercase tracking-widest text-[var(--muted-foreground)] mt-2">
                        Strategic Accounts & Relationships ({clients.length})
                    </p>
                </div>
                <Link
                    href="/admin/clients/create"
                    className="px-8 py-3 bg-[var(--foreground)] text-[var(--background)] font-inter text-xs uppercase tracking-widest hover:opacity-90 transition-all font-bold"
                >
                    + New Client
                </Link>
            </div>

            {clients.length === 0 ? (
                <div className="border border-dashed border-[var(--border)] p-16 text-center">
                    <p className="font-inter text-sm text-[var(--muted-foreground)] uppercase tracking-widest">Digital vacuum detected. Add a client.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clients.map((client: ClientWithProjects) => {
                        const totalLTV = client.projects.reduce((acc: number, proj: (Project & { payments: Payment[] })) => {
                            return acc + (proj.payments?.reduce((pa: number, c: Payment) => pa + c.amount, 0) || 0)
                        }, 0)

                        return (
                            <div
                                key={client.id}
                                className="group border border-[var(--border)] bg-[var(--card)] hover:border-[var(--foreground)] transition-all p-8 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-anton text-3xl tracking-tight text-[var(--foreground)] uppercase">
                                                {client.name}
                                            </h3>
                                            <p className="font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-bold">
                                                {client.company || 'Private Entity'}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-anton text-xl text-green-500">₹{totalLTV.toLocaleString('en-IN')}</p>
                                            <p className="font-inter text-[8px] uppercase font-bold text-[var(--muted-foreground)]">LTV Revenue</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2 mt-8 py-4 border-y border-[var(--border)]">
                                        {client.email && (
                                            <p className="font-inter text-[10px] text-[var(--foreground)] uppercase tracking-wide truncate">
                                                <span className="opacity-40 mr-2">SECURE:</span> {client.email}
                                            </p>
                                        )}
                                        {client.phone && (
                                            <p className="font-inter text-[10px] text-[var(--foreground)] uppercase tracking-wide">
                                                <span className="opacity-40 mr-2">DIRECT:</span> {client.phone}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-8">
                                        <p className="font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-bold mb-4">
                                            Active Clusters ({client.projects.length})
                                        </p>
                                        <div className="flex flex-col gap-2">
                                            {client.projects.length > 0 ? (
                                                client.projects.slice(0, 3).map((p: Project) => (
                                                    <Link 
                                                        key={p.id} 
                                                        href={`/admin/projects/edit/${p.id}`}
                                                        className="text-[10px] font-inter uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center justify-between group/link"
                                                    >
                                                        <span>{p.title}</span>
                                                        <span className="opacity-0 group-hover/link:opacity-100 transition-opacity">→</span>
                                                    </Link>
                                                ))
                                            ) : (
                                                <span className="font-inter text-[10px] uppercase text-[var(--muted-foreground)] italic opacity-30">No active deployments</span>
                                            )}
                                            {client.projects.length > 3 && (
                                                <span className="text-[10px] font-inter uppercase text-[var(--muted-foreground)] opacity-50">+{client.projects.length - 3} more...</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-12 pt-4">
                                    <Link
                                        href={`/admin/clients/edit/${client.id}`}
                                        className="flex-1 py-3 bg-[var(--foreground)] text-[var(--background)] font-inter text-[10px] uppercase font-bold tracking-widest hover:invert transition-all text-center"
                                    >
                                        Access Profile
                                    </Link>
                                    <DeleteClientButton clientId={client.id} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
