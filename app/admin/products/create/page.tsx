import { createAdminProduct } from '../../actions'
import Link from 'next/link'

export default function CreateProductPage() {
    return (
        <div>
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="font-anton text-5xl md:text-6xl tracking-tighter text-[var(--foreground)] uppercase">
                        New Product
                    </h1>
                    <p className="font-inter text-sm uppercase tracking-widest text-[var(--muted-foreground)] mt-2">
                        Create a new digital product
                    </p>
                </div>
                <Link
                    href="/admin/products"
                    className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                    ← Cancel
                </Link>
            </div>

            <form action={createAdminProduct} className="max-w-3xl space-y-8">
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
                            placeholder="Product Title"
                        />
                    </div>
                    <div>
                        <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                            Product Type *
                        </label>
                        <select
                            name="type"
                            required
                            className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                        >
                            <option value="WEB_PRODUCT" className="text-black">Web Product</option>
                            <option value="MOBILE_APP" className="text-black">Mobile App</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                        Link (Optional)
                    </label>
                    <input
                        type="url"
                        name="link"
                        className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
                        placeholder="https://example.com"
                    />
                </div>

                <div>
                    <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                        Cover Image
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="w-full bg-[var(--card)] border border-[var(--border)] p-3 font-inter text-xs text-[var(--foreground)] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-semibold file:bg-[var(--foreground)] file:text-[var(--background)] hover:file:opacity-80 transition-all"
                    />
                    <p className="font-inter text-[10px] text-[var(--muted-foreground)] mt-2">
                        Upload a product image (Max 5MB)
                    </p>
                </div>

                <div>
                    <label className="block font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                        Description *
                    </label>
                    <textarea
                        name="description"
                        required
                        rows={5}
                        className="w-full bg-[var(--card)] border border-[var(--border)] p-4 font-inter text-sm text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors resize-none"
                        placeholder="Product description..."
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="px-8 py-4 bg-[var(--foreground)] text-[var(--background)] font-inter text-xs uppercase tracking-widest hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Create Product
                    </button>
                    <Link
                        href="/admin/products"
                        className="px-8 py-4 border border-[var(--border)] text-[var(--foreground)] font-inter text-xs uppercase tracking-widest hover:bg-[var(--accent)] transition-colors"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    )
}
