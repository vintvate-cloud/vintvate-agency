import { prisma } from '@/lib/prisma'
import { updateProject, addPayment, deletePayment } from '../../../actions'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ClientProfile, Payment } from '@prisma/client'

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const project = await prisma.project.findUnique({
        where: { id },
        include: { 
            client: true,
            payments: { orderBy: { date: 'desc' } }
        }
    })

    if (!project) notFound()

    const clients = await prisma.clientProfile.findMany({ orderBy: { name: 'asc' } })
    const totalPaid = project.payments?.reduce((acc, p) => acc + p.amount, 0) || 0
    const remaining = (project.budget || 0) - totalPaid

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Project Configuration (2/3) */}
            <div className="lg:col-span-2 space-y-12">
                <div>
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h1 className="font-anton text-5xl tracking-tighter text-[var(--foreground)] uppercase">
                                Mission Config
                            </h1>
                            <p className="font-inter text-sm uppercase tracking-widest text-[var(--muted-foreground)] mt-2">
                                RE: {project.title}
                            </p>
                        </div>
                        <Link href="/admin/projects" className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)]">← Back</Link>
                    </div>

                    <form action={updateProject.bind(null, project.id)} className="space-y-8 bg-[var(--card)] border border-[var(--border)] p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block font-inter text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Project Title</label>
                                <input type="text" name="title" defaultValue={project.title} required className="w-full bg-transparent border-b border-[var(--border)] py-2 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none" />
                            </div>
                            <div>
                                <label className="block font-inter text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Client</label>
                                <select name="clientId" defaultValue={project.clientId || ''} className="w-full bg-transparent border-b border-[var(--border)] py-2 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none">
                                    <option value="" className="bg-[var(--background)]">Unassigned</option>
                                    {clients.map((client: ClientProfile) => (
                                        <option key={client.id} value={client.id} className="bg-[var(--background)]">{client.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block font-inter text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Internal Project Scope</label>
                            <textarea name="description" defaultValue={project.description} required rows={3} className="w-full bg-[var(--background)] border border-[var(--border)] p-4 font-inter text-sm text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none resize-none" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <label className="block font-inter text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Contract Value (USD)</label>
                                <input type="number" step="0.01" name="budget" defaultValue={project.budget || 0} className="w-full bg-transparent border-b border-[var(--border)] py-2 font-inter text-[var(--foreground)] focus:border-[var(--foreground)]" />
                            </div>
                            <div>
                                <label className="block font-inter text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Agency Status</label>
                                <select name="status" defaultValue={project.status} className="w-full bg-transparent border-b border-[var(--border)] py-2 font-inter text-[var(--foreground)] focus:border-[var(--foreground)]">
                                    <option value="PLANNED">Planned</option>
                                    <option value="PROGRESS">In Progress</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="PAUSED">Paused</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-inter text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Launch Date</label>
                                <input type="date" name="startDate" defaultValue={project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : ''} className="w-full bg-transparent border-b border-[var(--border)] py-2 font-inter text-[var(--foreground)]" />
                            </div>
                        </div>

                        <div>
                            <label className="block font-inter text-[10px] font-bold uppercase tracking-widest text-red-500 mb-3 flex items-center gap-2">Environmental Configs <span className="opacity-50">(ADMIN ONLY)</span></label>
                            <textarea name="envVars" defaultValue={project.envVars || ''} rows={6} className="w-full bg-black text-green-500 p-4 font-mono text-xs focus:outline-none border-l-2 border-red-500" placeholder="KEY=VALUE" />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button type="submit" className="px-8 py-4 bg-[var(--foreground)] text-[var(--background)] font-inter text-xs uppercase tracking-widest hover:opacity-90 font-bold transition-all">Update Configurations</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right: Operational Stats & Payments (1/3) */}
            <div className="space-y-8">
                <div className="border border-[var(--border)] bg-[var(--card)] p-6">
                    <h2 className="font-anton text-2xl uppercase tracking-tight text-[var(--foreground)] mb-6">Financial Matrix</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-end border-b border-[var(--border)] pb-2">
                            <span className="font-inter text-[10px] uppercase text-[var(--muted-foreground)]">Contracted</span>
                            <span className="font-anton text-xl">₹{(project.budget || 0).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-[var(--border)] pb-2">
                            <span className="font-inter text-[10px] uppercase text-green-500">Collected</span>
                            <span className="font-anton text-xl text-green-500">₹{totalPaid.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-[var(--border)] pb-2">
                            <span className="font-inter text-[10px] uppercase text-red-500">Awaiting</span>
                            <span className="font-anton text-xl text-red-500">₹{remaining.toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        <h4 className="font-inter text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">Log Payment</h4>
                        <form action={addPayment.bind(null, project.id)} className="space-y-4">
                            <input type="number" step="0.01" name="amount" required placeholder="Amount (₹)" className="w-full bg-[var(--background)] border border-[var(--border)] px-4 py-2 font-inter text-sm focus:outline-none" />
                            <input type="date" name="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full bg-[var(--background)] border border-[var(--border)] px-4 py-2 font-inter text-sm focus:outline-none" />
                            <input type="text" name="description" placeholder="Notes (e.g. 50% Advance)" className="w-full bg-[var(--background)] border border-[var(--border)] px-4 py-2 font-inter text-sm focus:outline-none" />
                            <button type="submit" className="w-full py-3 bg-[var(--foreground)] text-[var(--background)] font-inter text-[10px] uppercase font-bold tracking-widest hover:invert transition-all">Record Transaction</button>
                        </form>
                    </div>
                </div>

                <div className="border border-[var(--border)] bg-[var(--card)] p-6">
                    <h2 className="font-anton text-xl uppercase tracking-tight text-[var(--foreground)] mb-4">Transaction History</h2>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {project.payments?.length === 0 ? (
                            <p className="font-inter text-[10px] uppercase text-[var(--muted-foreground)] italic">No records found.</p>
                        ) : (
                            project.payments.map((p: Payment) => (
                                <div key={p.id} className="border-l-2 border-[var(--foreground)] pl-4 py-2 flex justify-between items-center group">
                                    <div>
                                        <p className="font-anton text-lg text-[var(--foreground)]">₹{p.amount.toLocaleString('en-IN')}</p>
                                        <p className="font-inter text-[10px] text-[var(--muted-foreground)] uppercase">
                                            {new Date(p.date).toLocaleDateString()} — {p.description || 'General Payment'}
                                        </p>
                                    </div>
                                    <form action={deletePayment.bind(null, p.id, project.id)}>
                                        <button type="submit" className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/10 rounded">✕</button>
                                    </form>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
