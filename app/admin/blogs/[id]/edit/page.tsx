import { prisma } from '@/lib/prisma'
import { updateBlog } from '../../../actions'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const blog = await prisma.blog.findUnique({
        where: { id }
    })

    if (!blog) {
        notFound()
    }

    return (
        <div>
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="font-anton text-5xl md:text-6xl tracking-tighter text-[var(--foreground)] uppercase">
                        Edit Blog
                    </h1>
                    <p className="font-inter text-sm uppercase tracking-widest text-[var(--muted-foreground)] mt-2">
                        Update blog post details
                    </p>
                </div>
                <Link
                    href="/admin/blogs"
                    className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                    ← Cancel
                </Link>
            </div>

            <form action={updateBlog.bind(null, blog.id)} className="max-w-3xl space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                            Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            defaultValue={blog.title}
                            className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                            placeholder="Blog Title"
                        />
                    </div>
                    <div>
                        <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                            Author *
                        </label>
                        <input
                            type="text"
                            name="author"
                            required
                            defaultValue={blog.author || ''}
                            className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                            placeholder="Author Name"
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                        Cover Image
                    </label>

                    {blog.image && (
                        <div className="mb-4 relative w-40 h-24 overflow-hidden border border-[var(--border)]">
                            <Image
                                src={blog.image}
                                alt="Current cover"
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="w-full bg-[var(--card)] border border-[var(--border)] p-3 font-inter text-xs text-[var(--foreground)] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-semibold file:bg-[var(--foreground)] file:text-[var(--background)] hover:file:opacity-80 transition-all"
                        placeholder="Upload Image"
                    />
                    <p className="font-inter text-[10px] text-[var(--muted-foreground)] mt-2">
                        Upload a new image to replace the current one (Max 5MB)
                    </p>
                </div>

                <div>
                    <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                        Excerpt *
                    </label>
                    <textarea
                        name="excerpt"
                        required
                        defaultValue={blog.excerpt || ''}
                        rows={3}
                        className="w-full bg-[var(--card)] border border-[var(--border)] p-4 font-inter text-sm text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors resize-none"
                        placeholder="Short summary of the blog..."
                    />
                </div>

                <div>
                    <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                        Content *
                    </label>
                    <textarea
                        name="content"
                        required
                        defaultValue={blog.content}
                        rows={12}
                        className="w-full bg-[var(--card)] border border-[var(--border)] p-4 font-inter text-sm text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors resize-none font-mono"
                        placeholder="Write your blog content here..."
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="px-8 py-4 bg-[var(--foreground)] text-[var(--background)] font-inter text-xs uppercase tracking-widest hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Update Blog Post
                    </button>
                    <Link
                        href="/admin/blogs"
                        className="px-8 py-4 border border-[var(--border)] text-[var(--foreground)] font-inter text-xs uppercase tracking-widest hover:bg-[var(--accent)] transition-colors"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    )
}
