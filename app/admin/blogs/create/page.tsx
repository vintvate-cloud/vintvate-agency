import { createBlog } from '../../actions'
import Link from 'next/link'

export default function CreateBlogPage() {
    return (
        <div>
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="font-anton text-5xl md:text-6xl tracking-tighter text-[var(--foreground)] uppercase">
                        New Blog
                    </h1>
                    <p className="font-inter text-sm uppercase tracking-widest text-[var(--muted-foreground)] mt-2">
                        Create a new blog post
                    </p>
                </div>
                <Link
                    href="/admin/blogs"
                    className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                    ← Cancel
                </Link>
            </div>

            <form action={createBlog} className="max-w-3xl space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                            Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
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
                            className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                            placeholder="Author Name"
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                        Image URL
                    </label>
                    <input
                        type="url"
                        name="image"
                        className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                        placeholder="https://example.com/image.jpg"
                    />
                    <p className="font-inter text-[10px] text-[var(--muted-foreground)] mt-2">
                        Provide a direct link to a hosted image
                    </p>
                </div>

                <div>
                    <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                        Excerpt *
                    </label>
                    <textarea
                        name="excerpt"
                        required
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
                        Create Blog Post
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
