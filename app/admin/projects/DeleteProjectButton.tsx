'use client'

import { deleteProject } from "../actions"

export default function DeleteProjectButton({ projectId }: { projectId: string }) {
    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault()
        if (window.confirm('Are you sure you want to delete this project?')) {
            await deleteProject(projectId)
        }
    }

    return (
        <form onSubmit={handleDelete} className="flex-1">
            <button
                type="submit"
                className="w-full py-2 font-inter text-xs uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors cursor-pointer"
            >
                Delete
            </button>
        </form>
    )
}
