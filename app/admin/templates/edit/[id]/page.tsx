import { prisma } from '@/lib/prisma'
import { updateProject } from '../../../actions'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export default async function EditTemplatePage({ params }: { params: Promise<{ id: string }> }) {
    // Need to await params in Next.js 15+ if needed, but here it's fine for server components or we can await it
    const { id } = await params;
    const template = await prisma.project.findUnique({
        where: { id: id }
    })

    if (!template || template.type !== 'TEMPLATE') {
        notFound()
    }

    const updateProjectWithId = updateProject.bind(null, template.id)

    return (
        <div className="max-w-3xl">
            <div className="flex justify-between items-start mb-12">
                <div>
                    <h1 className="font-anton text-5xl md:text-6xl tracking-tighter text-[var(--foreground)] uppercase">
                        Edit Template
                    </h1>
                    <p className="font-inter text-sm uppercase tracking-widest text-[var(--muted-foreground)] mt-2">
                        Update {template.title}
                    </p>
                </div>
                <Link
                    href="/admin/templates"
                    className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                    ← Cancel
                </Link>
            </div>

            <form action={updateProjectWithId} className="space-y-10">
                {/* Hidden: force type to TEMPLATE */}
                <input type="hidden" name="type" value="TEMPLATE" />

                <section className="space-y-6">
                    <h2 className="font-anton text-xl uppercase tracking-wider text-[var(--muted-foreground)] border-b border-[var(--border)] pb-2">01. Details</h2>

                    <div>
                        <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Template Name *</label>
                        <input
                            type="text" name="title" required
                            defaultValue={template.title}
                            className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Description *</label>
                        <textarea
                            name="description" required rows={4}
                            defaultValue={template.description || ''}
                            className="w-full bg-[var(--card)] border border-[var(--border)] p-4 font-inter text-sm text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Live / Demo URL</label>
                            <input
                                type="url" name="link"
                                defaultValue={template.link || ''}
                                className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Stack / Tags</label>
                            <input
                                type="text" name="tags"
                                defaultValue={template.tags || ''}
                                className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                            />
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="font-anton text-xl uppercase tracking-wider text-[var(--muted-foreground)] border-b border-[var(--border)] pb-2">02. Media</h2>

                    <div>
                        <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Update Preview Image (Optional)</label>
                        {template.image && (
                            <div className="mb-4 flex flex-col gap-3">
                                <div className="relative aspect-video w-48 border border-[var(--border)]">
                                    <Image src={template.image} alt={template.title} fill className="object-cover object-top" />
                                </div>
                                <label className="flex items-center gap-2 font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] cursor-pointer hover:text-[var(--foreground)] transition-colors">
                                    <input type="checkbox" name="removeImage" value="true" className="w-3 h-3 accent-[var(--foreground)]" />
                                    Remove this image and use live preview instead
                                </label>
                            </div>
                        )}
                        <input
                            type="file" name="image" accept="image/*"
                            className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[var(--foreground)] file:text-[var(--background)] hover:file:opacity-90"
                        />
                        <p className="text-[10px] text-[var(--muted-foreground)] mt-2">Leave empty to keep current image. If there is no image and you provide a link, an automatic live preview will be generated.</p>
                    </div>
                </section>

                {/* Hidden defaults for required Project fields */}
                <input type="hidden" name="status" value={template.status} />
                <input type="hidden" name="budget" value={template.budget?.toString() || "0"} />
                <input type="hidden" name="startDate" value={template.startDate?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0]} />

                <div className="flex gap-4 pt-10 border-t border-[var(--border)]">
                    <button
                        type="submit"
                        className="px-12 py-4 bg-[var(--foreground)] text-[var(--background)] font-inter text-xs uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer font-bold"
                    >
                        Save Changes
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
