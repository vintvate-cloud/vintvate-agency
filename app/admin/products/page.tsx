import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { toggleProjectProduct } from '../actions'

export default async function ProductsPage() {
    const products = await prisma.project.findMany({ 
        where: { isProduct: true },
        orderBy: { createdAt: 'desc' } 
    })

    return (
        <div>
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="font-anton text-5xl md:text-6xl tracking-tighter text-[var(--foreground)] uppercase">
                        Products
                    </h1>
                    <p className="font-inter text-sm uppercase tracking-widest text-[var(--muted-foreground)] mt-2">
                        {products.length} {products.length === 1 ? 'Product' : 'Products'}
                    </p>
                </div>
                <Link
                    href="/admin/projects"
                    className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)] font-inter text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                    + Add from Projects
                </Link>
            </div>

            {products.length === 0 ? (
                <div className="border border-dashed border-[var(--border)] p-16 text-center">
                    <p className="font-inter text-sm text-[var(--muted-foreground)]">
                        No products found. Turn on the &quot;Is Product&quot; toggle in your Projects list!
                    </p>
                </div>
            ) : (
                <div className="border border-[var(--border)]">
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[var(--border)] bg-[var(--card)]">
                        <span className="col-span-5 font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]">Title</span>
                        <span className="col-span-3 font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]">Type</span>
                        <span className="col-span-2 font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]">Date</span>
                        <span className="col-span-2 font-inter text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] text-right">Actions</span>
                    </div>
                    {products.map((product) => (
                        <div key={product.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--accent)] transition-colors">
                            <div className="col-span-5">
                                <p className="font-inter text-sm text-[var(--foreground)] font-medium truncate">{product.title}</p>
                                <p className="font-inter text-xs text-[var(--muted-foreground)] truncate mt-1">{product.description}</p>
                            </div>
                            <div className="col-span-3 flex items-center">
                                <span className="font-inter text-sm text-[var(--muted-foreground)]">{(product.productType || "WEB_PRODUCT").replace('_', ' ')}</span>
                            </div>
                            <div className="col-span-2 flex items-center">
                                <span className="font-inter text-sm text-[var(--muted-foreground)]">
                                    {new Date(product.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="col-span-2 flex items-center justify-end gap-4">
                                <form action={toggleProjectProduct.bind(null, product.id, false, product.productType || 'WEB_PRODUCT')}>
                                    <button
                                        className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer border border-[var(--border)] px-3 py-1.5"
                                    >
                                        Remove from Products
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

