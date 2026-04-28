import { createProject } from '../../actions'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ClientProfile } from '@prisma/client'

export default async function CreateProjectPage() {
    const clients = await prisma.clientProfile.findMany({
        orderBy: { name: 'asc' }
    })

    return (
        <div className="max-w-4xl">
            <div className="flex justify-between items-start mb-12">
                <div>
                    <h1 className="font-anton text-5xl md:text-6xl tracking-tighter text-[var(--foreground)] uppercase">
                        Initiate Project
                    </h1>
                    <p className="font-inter text-sm uppercase tracking-widest text-[var(--muted-foreground)] mt-2">
                        Define scope, budget, and timeline
                    </p>
                </div>
                <Link
                    href="/admin/projects"
                    className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                    ← Cancel
                </Link>
            </div>

            <form action={createProject} className="space-y-12">
                {/* Basic Info */}
                <section className="space-y-6">
                    <h2 className="font-anton text-xl uppercase tracking-wider text-[var(--muted-foreground)] border-b border-[var(--border)] pb-2 mb-8">01. Identity</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Project Title *</label>
                            <input type="text" name="title" required className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors" placeholder="Project Title" />
                        </div>
                        <div>
                            <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Project Type *</label>
                            <select name="type" required defaultValue="" className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors">
                                <option value="" disabled className="bg-[var(--background)]">Select a type...</option>
                                <option value="WEBSITE" className="bg-[var(--background)]">Website</option>
                                <option value="APP" className="bg-[var(--background)]">App</option>
                                <option value="TEMPLATE" className="bg-[var(--background)]">Template / Product</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Client</label>
                        <select name="clientId" className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors">
                            <option value="" className="bg-[var(--background)]">Unassigned</option>
                            {clients.map((client: ClientProfile) => (
                                <option key={client.id} value={client.id} className="bg-[var(--background)]">{client.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Brief Description *</label>
                        <textarea name="description" required rows={3} className="w-full bg-[var(--card)] border border-[var(--border)] p-4 font-inter text-sm text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors resize-none" placeholder="What are we building?" />
                    </div>
                </section>

                {/* Financials & Logic */}
                <section className="space-y-6">
                    <h2 className="font-anton text-xl uppercase tracking-wider text-[var(--muted-foreground)] border-b border-[var(--border)] pb-2 mb-8">02. Financials & Logic</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Contract Value (USD)</label>
                            <input type="number" step="0.01" name="budget" defaultValue="0" className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors" />
                        </div>
                        <div>
                            <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Current Status</label>
                            <select name="status" className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors">
                                <option value="PLANNED">Planned</option>
                                <option value="PROGRESS">In Progress</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="PAUSED">Paused</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Launch Date</label>
                            <input type="date" name="startDate" defaultValue={new Date().toISOString().split('T')[0]} className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <div>
                            <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Live URLs (Links)</label>
                            <input type="url" name="link" className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors" placeholder="https://" />
                        </div>
                        <div>
                            <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Stack Tags</label>
                            <input type="text" name="tags" className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors" placeholder="Next.js, Tailwind, etc." />
                        </div>
                    </div>
                </section>

                {/* Secure Ops */}
                <section className="space-y-6">
                    <h2 className="font-anton text-xl uppercase tracking-wider text-[var(--muted-foreground)] border-b border-[var(--border)] pb-2 mb-8">03. Secure Ops</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Project Banner</label>
                            <input type="file" name="image" accept="image/*" className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[var(--foreground)] file:text-[var(--background)] hover:file:opacity-90" />
                        </div>
                        <div>
                            <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Environmental Config (Hidden)</label>
                            <textarea name="envVars" rows={4} className="w-full bg-black/5 border border-[var(--border)] p-4 font-mono text-xs text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors resize-none" placeholder="API_KEY=..." />
                        </div>
                    </div>
                </section>

                <div className="flex gap-4 pt-10 border-t border-[var(--border)]">
                    <button type="submit" className="px-12 py-4 bg-[var(--foreground)] text-[var(--background)] font-inter text-xs uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer font-bold">Initiate Project</button>
                    <Link href="/admin/projects" className="px-12 py-4 border border-[var(--border)] text-[var(--foreground)] font-inter text-xs uppercase tracking-widest hover:bg-[var(--accent)] transition-colors">Discard</Link>
                </div>
            </form>
        </div>
    )
}
