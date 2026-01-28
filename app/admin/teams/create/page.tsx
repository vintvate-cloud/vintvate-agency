import { createTeamMember } from '../../actions'
import Link from 'next/link'

export default function CreateTeamPage() {
    return (
        <div>
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="font-anton text-5xl md:text-6xl tracking-tighter text-[var(--foreground)] uppercase">
                        Add Member
                    </h1>
                    <p className="font-inter text-sm uppercase tracking-widest text-[var(--muted-foreground)] mt-2">
                        Add a new team member
                    </p>
                </div>
                <Link
                    href="/admin/teams"
                    className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                    ← Cancel
                </Link>
            </div>

            <form action={createTeamMember} className="max-w-3xl space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                            Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                            placeholder="Full Name"
                        />
                    </div>
                    <div>
                        <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                            Role *
                        </label>
                        <input
                            type="text"
                            name="role"
                            required
                            className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                            placeholder="e.g. CEO, Designer, Developer"
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                        Photo URL
                    </label>
                    <input
                        type="url"
                        name="image"
                        className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                        placeholder="https://example.com/photo.jpg"
                    />
                </div>

                <div>
                    <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                        Bio
                    </label>
                    <textarea
                        name="bio"
                        rows={4}
                        className="w-full bg-[var(--card)] border border-[var(--border)] p-4 font-inter text-sm text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors resize-none"
                        placeholder="Short bio about the team member..."
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="px-8 py-4 bg-[var(--foreground)] text-[var(--background)] font-inter text-xs uppercase tracking-widest hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Add Team Member
                    </button>
                    <Link
                        href="/admin/teams"
                        className="px-8 py-4 border border-[var(--border)] text-[var(--foreground)] font-inter text-xs uppercase tracking-widest hover:bg-[var(--accent)] transition-colors"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    )
}
