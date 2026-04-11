import { createProject } from '../../actions'
import Link from 'next/link'

export default function CreateTemplatePage() {
    return (
        <div className="max-w-3xl">
            <div className="flex justify-between items-start mb-12">
                <div>
                    <h1 className="font-anton text-5xl md:text-6xl tracking-tighter text-[var(--foreground)] uppercase">
                        New Template
                    </h1>
                    <p className="font-inter text-sm uppercase tracking-widest text-[var(--muted-foreground)] mt-2">
                        Add a new product or template to the catalogue
                    </p>
                </div>
                <Link
                    href="/admin/templates"
                    className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                    ← Cancel
                </Link>
            </div>

            <form action={createProject} className="space-y-10">
                {/* Hidden: force type to TEMPLATE */}
                <input type="hidden" name="type" value="TEMPLATE" />

                <section className="space-y-6">
                    <h2 className="font-anton text-xl uppercase tracking-wider text-[var(--muted-foreground)] border-b border-[var(--border)] pb-2">01. Details</h2>

                    <div>
                        <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Template Name *</label>
                        <input
                            type="text" name="title" required
                            className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                            placeholder="e.g. Agency Landing Page"
                        />
                    </div>

                    <div>
                        <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Description *</label>
                        <textarea
                            name="description" required rows={4}
                            className="w-full bg-[var(--card)] border border-[var(--border)] p-4 font-inter text-sm text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors resize-none"
                            placeholder="What does this template include? Who is it for?"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Live / Demo URL</label>
                            <input
                                type="url" name="link"
                                className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                                placeholder="https://"
                            />
                        </div>
                        <div>
                            <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Stack / Tags</label>
                            <input
                                type="text" name="tags"
                                className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                                placeholder="Next.js, Tailwind, GSAP..."
                            />
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="font-anton text-xl uppercase tracking-wider text-[var(--muted-foreground)] border-b border-[var(--border)] pb-2">02. Media</h2>

                    <div>
                        <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Preview Image</label>
                        <input
                            type="file" name="image" accept="image/*"
                            className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[var(--foreground)] file:text-[var(--background)] hover:file:opacity-90"
                        />
                    </div>
                </section>

                {/* Hidden defaults for required Project fields */}
                <input type="hidden" name="status" value="COMPLETED" />
                <input type="hidden" name="budget" value="0" />
                <input type="hidden" name="startDate" value={new Date().toISOString().split('T')[0]} />

                <div className="flex gap-4 pt-10 border-t border-[var(--border)]">
                    <button
                        type="submit"
                        className="px-12 py-4 bg-[var(--foreground)] text-[var(--background)] font-inter text-xs uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer font-bold"
                    >
                        Save Template
                    </button>
                    <Link
                        href="/admin/templates"
                        className="px-12 py-4 border border-[var(--border)] text-[var(--foreground)] font-inter text-xs uppercase tracking-widest hover:bg-[var(--accent)] transition-colors"
                    >
                        Discard
                    </Link>
                </div>
            </form>
        </div>
    )
}
