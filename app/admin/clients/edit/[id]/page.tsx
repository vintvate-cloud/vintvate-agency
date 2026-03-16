import { prisma } from '@/lib/prisma'
import { updateClient, addPayment } from '../../../actions'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { UserCircle, Briefcase, Mail, Phone, ExternalLink, Calendar } from 'lucide-react'

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const client = await prisma.clientProfile.findUnique({
        where: { id },
        include: { 
            projects: {
                include: { payments: true }
            } 
        }
    })

    if (!client) {
        notFound()
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-[1600px] mx-auto">
            {/* Left: Client Intelligence (2/3) */}
            <div className="lg:col-span-2 space-y-12">
                <div>
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h1 className="font-anton text-5xl tracking-tighter text-[var(--foreground)] uppercase">
                                Client Intelligence
                            </h1>
                            <p className="font-inter text-sm uppercase tracking-widest text-[var(--muted-foreground)] mt-2">
                                ID: {client.id.slice(-8).toUpperCase()} // {client.name}
                            </p>
                        </div>
                        <Link href="/admin/clients" className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">← Exit Profile</Link>
                    </div>

                    <form action={updateClient.bind(null, client.id)} className="space-y-8 bg-[var(--card)] border border-[var(--border)] p-10 relative overflow-hidden">
                        {/* Technical Background Decoration */}
                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] select-none pointer-events-none">
                            <span className="font-anton text-9xl">INTEL</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-6">
                                <div>
                                    <label className="block font-inter text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-3 flex items-center gap-2">
                                        <UserCircle size={10} /> Legal Name / Primary Contact
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={client.name}
                                        required
                                        className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-anton text-xl text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block font-inter text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-3 flex items-center gap-2">
                                        <Briefcase size={10} /> Corporate Identity / Brand
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        defaultValue={client.company || ''}
                                        placeholder="Private Entity"
                                        className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6 border-l border-[var(--border)]/30 pl-0 md:pl-10">
                                <div>
                                    <label className="block font-inter text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-3 flex items-center gap-2">
                                        <Mail size={10} /> Encryption-Ready Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        defaultValue={client.email || ''}
                                        className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block font-inter text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-3 flex items-center gap-2">
                                        <Phone size={10} /> Direct Comms Line
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        defaultValue={client.phone || ''}
                                        className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <label className="block font-inter text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Operational Notes (Classified)</label>
                            <textarea
                                name="notes"
                                defaultValue={client.notes || ''}
                                rows={4}
                                className="w-full bg-[var(--background)] border border-[var(--border)] p-6 font-inter text-sm text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors resize-none leading-relaxed"
                                placeholder="Strategy, personality traits, or key account requirements..."
                            />
                        </div>

                        <div className="pt-6 border-t border-[var(--border)]/50">
                            <button
                                type="submit"
                                className="px-10 py-4 bg-[var(--foreground)] text-[var(--background)] font-inter text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-[var(--foreground)]/10"
                            >
                                Synchronize Profile Data
                            </button>
                        </div>
                    </form>
                </div>

                {/* Account Projects Matrix */}
                <div className="space-y-8">
                    <div className="flex justify-between items-center border-b border-[var(--border)] pb-4">
                        <h2 className="font-anton text-3xl tracking-tight text-[var(--foreground)] uppercase">
                            Operational Assets
                        </h2>
                        <Link
                            href={`/admin/projects/create?clientId=${client.id}`}
                            className="bg-[var(--foreground)] text-[var(--background)] px-4 py-2 font-inter text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:invert transition-all"
                        >
                            + Deploy New Mission
                        </Link>
                    </div>

                    {client.projects.length === 0 ? (
                        <div className="border border-dashed border-[var(--border)] p-20 text-center bg-[var(--card)]/30">
                            <p className="font-inter text-xs text-[var(--muted-foreground)] uppercase tracking-widest font-bold">
                                Zero Active Assets. Awaiting Deployment.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {client.projects.map((project: any) => {
                                const received = project.payments?.reduce((acc: number, p: any) => acc + p.amount, 0) || 0
                                const progress = project.budget ? (received / project.budget) * 100 : 0
                                
                                return (
                                    <div 
                                        key={project.id} 
                                        className="border border-[var(--border)] bg-[var(--card)] p-8 group hover:border-[var(--foreground)] transition-all flex flex-col md:flex-row justify-between items-center gap-8"
                                    >
                                        <div className="space-y-3 flex-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-anton text-2xl uppercase text-[var(--foreground)] tracking-tight">
                                                    {project.title}
                                                </h3>
                                                <span className={`px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest ${project.status === 'COMPLETED' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                                                    {project.status}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-4 items-center">
                                                <div className="flex items-center gap-1.5 font-inter text-[10px] uppercase text-[var(--muted-foreground)]">
                                                    <Calendar size={12} className="opacity-50" />
                                                    Started: {project.startDate ? new Date(project.startDate).toLocaleDateString() : '—'}
                                                </div>
                                                <div className="flex items-center gap-1.5 font-inter text-[10px] uppercase text-[var(--muted-foreground)]">
                                                    <ExternalLink size={12} className="opacity-50" />
                                                    {project.link ? (
                                                        <a href={project.link} target="_blank" className="hover:text-[var(--foreground)] hover:underline">View Live Mission</a>
                                                    ) : 'Local Environment'}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-48 space-y-2">
                                            <div className="flex justify-between text-[8px] uppercase font-bold tracking-widest text-[var(--muted-foreground)]">
                                                <span>Collection</span>
                                                <span>{Math.round(progress)}%</span>
                                            </div>
                                            <div className="h-1 bg-[var(--border)] w-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-green-500" 
                                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                                />
                                            </div>
                                            <p className="text-right font-anton text-sm text-[var(--foreground)]">
                                                ₹{received.toLocaleString('en-IN')} / ₹{(project.budget || 0).toLocaleString('en-IN')}
                                            </p>
                                        </div>

                                        <Link 
                                            href={`/admin/projects/edit/${project.id}`}
                                            className="px-6 py-3 border border-[var(--border)] font-inter text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all"
                                        >
                                            Access Ops
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Right: Asset Health & Quick Actions (1/3) */}
            <div className="space-y-8">
                <div className="bg-[var(--card)] border border-[var(--border)] p-8">
                    <h3 className="font-anton text-2xl uppercase tracking-tighter mb-8 bg-[var(--foreground)] text-[var(--background)] p-3 text-center">
                        Snapshot
                    </h3>
                    
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-[var(--border)] pb-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">Joint Ventures</span>
                            <span className="font-anton text-2xl">{client.projects.length}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-[var(--border)] pb-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">Total Value Portfolio</span>
                            <span className="font-anton text-2xl">
                                ₹{client.projects.reduce((acc: number, p: any) => acc + (p.budget || 0), 0).toLocaleString('en-IN')}
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-[var(--border)] pb-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-green-500">Collected Revenue</span>
                            <span className="font-anton text-2xl text-green-500">
                                ₹{client.projects.reduce((acc: number, proj: any) => {
                                    return acc + (proj.payments?.reduce((pa: number, c: any) => pa + c.amount, 0) || 0)
                                }, 0).toLocaleString('en-IN')}
                            </span>
                        </div>
                    </div>

                    <div className="mt-12 bg-black/5 p-4 border border-dashed border-[var(--border)]">
                        <p className="text-[9px] font-bold uppercase text-[var(--muted-foreground)] leading-relaxed italic">
                            This client intelligence profile is intended for internal agency use only. Do not share confidential financial projections outside of HQ.
                        </p>
                    </div>
                </div>

                {/* Financial Log */}
                <div className="border border-[var(--border)] bg-[var(--card)] p-8 space-y-6">
                    <div>
                        <h3 className="font-anton text-xl uppercase tracking-tight text-[var(--foreground)]">Financial Log</h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mt-2">Record Payment Received</p>
                    </div>

                    {client.projects.length > 0 ? (
                        <form 
                            action={async (formData) => {
                                'use server'
                                const projectId = formData.get('projectId') as string
                                await addPayment(projectId, formData)
                            }} 
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-[8px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">Target Asset / Project</label>
                                <select 
                                    name="projectId" 
                                    required 
                                    className="w-full bg-[var(--background)] border border-[var(--border)] px-4 py-2 font-inter text-xs uppercase tracking-widest text-[var(--foreground)] focus:outline-none"
                                >
                                    {client.projects.map((p: any) => (
                                        <option key={p.id} value={p.id}>{p.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[8px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">Amount (₹)</label>
                                <input 
                                    type="number" 
                                    step="0.01" 
                                    name="amount" 
                                    required 
                                    placeholder="0.00" 
                                    className="w-full bg-[var(--background)] border border-[var(--border)] px-4 py-2 font-inter text-sm text-[var(--foreground)] focus:outline-none" 
                                />
                            </div>
                            <div>
                                <label className="block text-[8px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">Date</label>
                                <input 
                                    type="date" 
                                    name="date" 
                                    required 
                                    defaultValue={new Date().toISOString().split('T')[0]} 
                                    className="w-full bg-[var(--background)] border border-[var(--border)] px-4 py-2 font-inter text-sm text-[var(--foreground)] focus:outline-none" 
                                />
                            </div>
                            <div>
                                <label className="block text-[8px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">Reference / Notes</label>
                                <input 
                                    type="text" 
                                    name="description" 
                                    placeholder="Advance, Milestone 1, etc." 
                                    className="w-full bg-[var(--background)] border border-[var(--border)] px-4 py-2 font-inter text-sm text-[var(--foreground)] focus:outline-none" 
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="w-full py-4 bg-[var(--foreground)] text-[var(--background)] font-inter text-[10px] font-bold uppercase tracking-widest hover:invert transition-all flex items-center justify-center gap-2"
                            >
                                Record Transaction
                            </button>
                        </form>
                    ) : (
                        <div className="bg-black/5 p-4 border border-dashed border-[var(--border)] text-center">
                            <p className="text-[9px] font-bold uppercase text-[var(--muted-foreground)]">No projects available to record payments.</p>
                        </div>
                    )}
                </div>

                <div className="border border-[var(--border)] p-8 space-y-4">
                     <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">Strategic Navigation</h4>
                     <Link href={`/admin/projects/create?clientId=${client.id}`} className="block w-full text-center py-3 bg-[var(--foreground)] text-[var(--background)] font-inter text-[10px] font-bold uppercase tracking-widest hover:opacity-90">
                        Initiate Advance Assets
                     </Link>
                     <Link href="/admin/clients" className="block w-full text-center py-3 border border-[var(--border)] font-inter text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--accent)] text-[var(--foreground)]">
                        Return to Client Deck
                     </Link>
                </div>
            </div>
        </div>
    )
}
