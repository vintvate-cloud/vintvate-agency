
import { prisma } from "@/lib/prisma"
import { updateTeamMember } from "../../actions"
import { notFound } from "next/navigation"

export default async function EditTeamPage({ params }: { params: Promise<{ id: string }> }) {
    // Await params specifically for Next.js 15+ if needed, though mostly direct access works in older.
    // However, it is safer to treat params as a promise in the newest versions or just use directly.
    // For now we assume standard behavior.

    // In Next 15, params is a promise.
    const { id } = await params

    const member = await prisma.team.findUnique({
        where: { id }
    })

    if (!member) {
        notFound()
    }

    const updateAction = updateTeamMember.bind(null, id)

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="font-anton text-4xl mb-8">Edit Team Member</h1>

            <form action={updateAction} className="space-y-6 bg-[var(--card)] p-8 border border-[var(--border)] rounded-lg">
                <div>
                    <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={member.name}
                        required
                        className="w-full bg-transparent border-b-2 border-[var(--border)] py-2 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                    />
                </div>

                <div>
                    <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-2">
                        Role
                    </label>
                    <input
                        type="text"
                        name="role"
                        defaultValue={member.role}
                        required
                        className="w-full bg-transparent border-b-2 border-[var(--border)] py-2 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                    />
                </div>

                <div>
                    <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-2">
                        Bio / Description
                    </label>
                    <textarea
                        name="bio"
                        rows={4}
                        defaultValue={member.bio || ''}
                        className="w-full bg-transparent border-b-2 border-[var(--border)] py-2 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors resize-none"
                    />
                </div>

                <div>
                    <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                        New Image (Optional)
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[var(--foreground)] file:text-[var(--background)] hover:file:opacity-90 cursor-pointer"
                    />
                    {member.image && (
                        <p className="mt-2 text-xs text-[var(--muted-foreground)]">Current image exists. Uploading a new one will replace it.</p>
                    )}
                </div>

                <div className="pt-8">
                    <button
                        type="submit"
                        className="w-full bg-[var(--foreground)] text-[var(--background)] py-4 font-inter font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}
