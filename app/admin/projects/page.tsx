import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { deleteProject } from '../actions'
import Image from 'next/image'
import DeleteProjectButton from './DeleteProjectButton'

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })

    return (
        <div>
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="font-anton text-5xl md:text-6xl tracking-tighter text-[var(--foreground)] uppercase">
                        Projects
                    </h1>
                    <p className="font-inter text-sm uppercase tracking-widest text-[var(--muted-foreground)] mt-2">
                        {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
                    </p>
                </div>
                <Link
                    href="/admin/projects/create"
                    className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)] font-inter text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                    + Add Project
                </Link>
            </div>

            {projects.length === 0 ? (
                <div className="border border-dashed border-[var(--border)] p-16 text-center">
                    <p className="font-inter text-sm text-[var(--muted-foreground)]">
                        No projects found. Add your first one!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group border border-[var(--border)] bg-[var(--card)] hover:border-[var(--foreground)] transition-all overflow-hidden"
                        >
                            {project.image && (
                                <div className="aspect-video relative overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <h3 className="font-anton text-2xl tracking-tight text-[var(--foreground)] uppercase">
                                    {project.title}
                                </h3>
                                {project.tags && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {project.tags.split(',').map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 bg-[var(--accent)] font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]"
                                            >
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <p className="font-inter text-sm text-[var(--muted-foreground)] mt-4 line-clamp-2">
                                    {project.description}
                                </p>
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block mt-4 font-inter text-xs uppercase tracking-widest text-[var(--foreground)] hover:opacity-70 transition-opacity"
                                    >
                                        View Project →
                                    </a>
                                )}
                                <div className="flex gap-4 mt-6 pt-4 border-t border-[var(--border)]">
                                    <Link
                                        href={`/admin/projects/edit/${project.id}`}
                                        className="flex-1 py-2 font-inter text-xs uppercase tracking-widest text-[var(--foreground)] hover:opacity-70 transition-opacity text-center border border-[var(--border)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                                    >
                                        Edit
                                    </Link>
                                    <DeleteProjectButton projectId={project.id} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
