import { prisma } from '@/lib/prisma'
import { updateProject } from '../../../actions'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const project = await prisma.project.findUnique({
        where: { id }
    })

    if (!project) {
        notFound()
    }

    return (
        <div>
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="font-anton text-5xl md:text-6xl tracking-tighter text-[var(--foreground)] uppercase">
                        Edit Project
                    </h1>
                    <p className="font-inter text-sm uppercase tracking-widest text-[var(--muted-foreground)] mt-2">
                        Update project details
                    </p>
                </div>
                <Link
                    href="/admin/projects"
                    className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                    ← Cancel
                </Link>
            </div>

            <form action={updateProject.bind(null, project.id)} className="max-w-3xl space-y-8">
                <div>
                    <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                        Title *
                    </label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={project.title}
                        required
                        className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                        placeholder="Project Title"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                            Project URL
                        </label>
                        <input
                            type="url"
                            name="link"
                            defaultValue={project.link || ''}
                            className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                            placeholder="https://project-url.com"
                        />
                    </div>
                    <div>
                        <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                            Tags
                        </label>
                        <input
                            type="text"
                            name="tags"
                            defaultValue={project.tags || ''}
                            className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                            placeholder="React, Node, Design (comma separated)"
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                        Project Image
                    </label>
                    {project.image && (
                        <div className="mb-4 relative w-40 h-24 overflow-hidden border border-[var(--border)]">
                            <Image
                                src={project.image}
                                alt="Current project image"
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[var(--foreground)] file:text-[var(--background)] hover:file:opacity-90 cursor-pointer"
                    />
                    <p className="mt-2 text-[10px] text-[var(--muted-foreground)]">
                        Leave empty to keep current image
                    </p>
                </div>

                <div>
                    <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                        Description *
                    </label>
                    <textarea
                        name="description"
                        defaultValue={project.description}
                        required
                        rows={5}
                        className="w-full bg-[var(--card)] border border-[var(--border)] p-4 font-inter text-sm text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors resize-none"
                        placeholder="Describe the project, technologies used, challenges overcome..."
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="px-8 py-4 bg-[var(--foreground)] text-[var(--background)] font-inter text-xs uppercase tracking-widest hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Update Project
                    </button>
                    <Link
                        href="/admin/projects"
                        className="px-8 py-4 border border-[var(--border)] text-[var(--foreground)] font-inter text-xs uppercase tracking-widest hover:bg-[var(--accent)] transition-colors"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    )
}
