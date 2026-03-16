'use client'

import { useState } from 'react'
import { deleteClient } from '../actions'

export default function DeleteClientButton({ clientId }: { clientId: string }) {
    const [isDeleting, setIsDeleting] = useState(false)

    async function handleDelete() {
        if (!confirm('Are you sure you want to delete this client? This will NOT delete their projects, but they will no longer be associated.')) return
        
        setIsDeleting(true)
        try {
            await deleteClient(clientId)
        } catch (error) {
            console.error(error)
            alert('Failed to delete client')
            setIsDeleting(false)
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 py-2 font-inter text-xs uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500 disabled:opacity-50"
        >
            {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
    )
}
