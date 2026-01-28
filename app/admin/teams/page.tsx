import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { deleteTeamMember } from '../actions'
import Image from 'next/image'

export default async function TeamsPage() {
    const members = await prisma.team.findMany({ orderBy: { createdAt: 'desc' } })

    return (
        <div>
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="font-anton text-5xl md:text-6xl tracking-tighter text-[var(--foreground)] uppercase">
                        Teams
                    </h1>
                    <p className="font-inter text-sm uppercase tracking-widest text-[var(--muted-foreground)] mt-2">
                        {members.length} {members.length === 1 ? 'Member' : 'Members'}
                    </p>
                </div>
                <Link
                    href="/admin/teams/create"
                    className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)] font-inter text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                    + Add Member
                </Link>
            </div>

            {members.length === 0 ? (
                <div className="border border-dashed border-[var(--border)] p-16 text-center">
                    <p className="font-inter text-sm text-[var(--muted-foreground)]">
                        No team members found. Add your first one!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {members.map((member) => (
                        <div
                            key={member.id}
                            className="group border border-[var(--border)] bg-[var(--card)] hover:border-[var(--foreground)] transition-all"
                        >
                            {member.image && (
                                <div className="aspect-square relative overflow-hidden">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <h3 className="font-anton text-xl tracking-tight text-[var(--foreground)] uppercase">
                                    {member.name}
                                </h3>
                                <p className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] mt-1">
                                    {member.role}
                                </p>
                                {member.bio && (
                                    <p className="font-inter text-sm text-[var(--muted-foreground)] mt-4 line-clamp-2">
                                        {member.bio}
                                    </p>
                                )}
                                <div className="flex gap-4 mt-6 pt-4 border-t border-[var(--border)]">
                                    <form action={deleteTeamMember.bind(null, member.id)} className="flex-1">
                                        <button
                                            className="w-full py-2 font-inter text-xs uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
