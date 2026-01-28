import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { deleteBlog } from '../actions'

export default async function BlogsPage() {
    const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } })

    return (
        <div>
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="font-anton text-5xl md:text-6xl tracking-tighter text-[var(--foreground)] uppercase">
                        Blogs
                    </h1>
                    <p className="font-inter text-sm uppercase tracking-widest text-[var(--muted-foreground)] mt-2">
                        {blogs.length} {blogs.length === 1 ? 'Post' : 'Posts'}
                    </p>
                </div>
                <Link
                    href="/admin/blogs/create"
                    className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)] font-inter text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                    + New Blog
                </Link>
            </div>

            {blogs.length === 0 ? (
                <div className="border border-dashed border-[var(--border)] p-16 text-center">
                    <p className="font-inter text-sm text-[var(--muted-foreground)]">
                        No blogs found. Create your first one!
                    </p>
                </div>
            ) : (
                <div className="border border-[var(--border)]">
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[var(--border)] bg-[var(--card)]">
                        <span className="col-span-5 font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]">Title</span>
                        <span className="col-span-3 font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]">Author</span>
                        <span className="col-span-2 font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]">Date</span>
                        <span className="col-span-2 font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] text-right">Actions</span>
                    </div>
                    {blogs.map((blog) => (
                        <div key={blog.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--accent)] transition-colors">
                            <div className="col-span-5">
                                <p className="font-inter text-sm text-[var(--foreground)] font-medium truncate">{blog.title}</p>
                                <p className="font-inter text-xs text-[var(--muted-foreground)] truncate mt-1">{blog.excerpt}</p>
                            </div>
                            <div className="col-span-3 flex items-center">
                                <span className="font-inter text-sm text-[var(--muted-foreground)]">{blog.author || '-'}</span>
                            </div>
                            <div className="col-span-2 flex items-center">
                                <span className="font-inter text-sm text-[var(--muted-foreground)]">
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="col-span-2 flex items-center justify-end gap-4">
                                <Link
                                    href={`/admin/blogs/${blog.id}/edit`}
                                    className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                                >
                                    Edit
                                </Link>
                                <form action={deleteBlog.bind(null, blog.id)}>
                                    <button
                                        className="font-inter text-xs uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
