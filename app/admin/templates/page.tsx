import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import DeleteProjectButton from '../projects/DeleteProjectButton'

export const dynamic = 'force-dynamic'

export default async function TemplatesPage() {
    const templates = await prisma.project.findMany({
        where: { type: 'TEMPLATE' },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="font-anton text-5xl tracking-tighter text-[var(--foreground)] uppercase">
                        Templates
                    </h1>
                    <p className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] mt-1">
                        {templates.length} Template{templates.length !== 1 ? 's' : ''} in the catalogue
                    </p>
                </div>
                <Link
                    href="/admin/templates/create"
                    className="px-8 py-3 bg-[var(--foreground)] text-[var(--background)] font-inter text-xs uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-2"
                >
                    <span className="text-lg">+</span> New Template
                </Link>
            </div>

            {templates.length === 0 ? (
                <div className="border border-dashed border-[var(--border)] p-16 text-center">
                    <p className="font-inter text-sm text-[var(--muted-foreground)] mb-4">No templates yet. Create one to showcase your products.</p>
                    <Link href="/admin/templates/create" className="font-inter text-xs uppercase tracking-widest underline hover:opacity-70">
                        Create First Template →
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className="group border border-[var(--border)] bg-[var(--card)] hover:border-[var(--foreground)] transition-all overflow-hidden flex flex-col"
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-[4/3] bg-[var(--background)] flex-shrink-0">
                                {template.image ? (
                                    <Image
                                        src={template.image}
                                        alt={template.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center font-anton text-6xl opacity-10">
                                        {template.title.charAt(0)}
                                    </div>
                                )}
                                <div className="absolute top-3 left-3 bg-[var(--foreground)] text-[var(--background)] text-[8px] font-bold uppercase tracking-widest px-2 py-1">
                                    Template
                                </div>
                                {template.link && (
                                    <a
                                        href={template.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 hover:bg-black transition-colors"
                                    >
                                        Live ↗
                                    </a>
                                )}
                            </div>

                            {/* Info */}
                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="font-anton text-xl tracking-tight text-[var(--foreground)] uppercase mb-1">
                                    {template.title}
                                </h3>
                                <p className="font-inter text-xs text-[var(--muted-foreground)] line-clamp-2 mb-4 flex-1">
                                    {template.description}
                                </p>

                                {/* Tags */}
                                {template.tags && (
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {template.tags.split(',').slice(0, 4).map((tag, i) => (
                                            <span key={i} className="text-[9px] font-bold font-inter uppercase tracking-widest border border-[var(--border)] px-2 py-0.5 opacity-60">
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2 mt-auto">
                                    <Link
                                        href={`/admin/projects/edit/${template.id}`}
                                        className="flex-1 py-2 font-inter text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] text-center border border-[var(--border)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    <DeleteProjectButton projectId={template.id} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
