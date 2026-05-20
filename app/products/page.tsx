import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductAppCarousel from "@/components/ProductAppCarousel";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    const products = await prisma.project.findMany({
        where: { isProduct: true },
        orderBy: { createdAt: 'desc' }
    });

    const mobileApps = products.filter(p => p.productType === "MOBILE_APP");
    const webProducts = products.filter(p => p.productType !== "MOBILE_APP");

    return (
        <main className="w-full min-h-screen bg-background text-foreground pt-32 pb-20 overflow-x-hidden selection:bg-foreground selection:text-background">
            {/* Header Section */}
            <div className="px-6 md:px-12 mb-16 md:mb-24 max-w-screen-2xl mx-auto w-full">
                <div className="flex justify-between items-start w-full border-b border-foreground/10 pb-8 mb-12">
                    <span className="font-mono text-xs uppercase tracking-[0.4em] text-foreground/40">
                        [03] // The Arsenal
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.4em] text-foreground/40 text-right">
                        DIGITAL<br />PRODUCTS
                    </span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-end gap-12 md:gap-0">
                    <h1 className="font-anton text-[16vw] md:text-[14vw] leading-[0.8] uppercase tracking-tighter text-foreground m-0 p-0">
                        DIGITAL<br />
                        <span className="text-foreground/50">
                            PRODUCTS.
                        </span>
                    </h1>

                    <div className="max-w-sm pb-2">
                        <p className="font-inter text-sm md:text-base leading-relaxed text-foreground/60 tracking-wider">
                            Explore our premium suite of software products and mobile applications designed to elevate your digital infrastructure.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile Apps Section */}
            {mobileApps.length > 0 && (
                <section className="px-6 md:px-12 w-full max-w-screen-2xl mx-auto mb-24 md:mb-32">
                    <div className="border-b border-foreground/10 pb-4 mb-12">
                        <h2 className="font-anton text-3xl md:text-4xl uppercase tracking-widest text-foreground/50">Mobile Applications</h2>
                    </div>
                    <ProductAppCarousel projects={mobileApps} />
                </section>
            )}

            {/* Web Products Section */}
            {webProducts.length > 0 && (
                <section className="px-6 md:px-12 w-full max-w-screen-2xl mx-auto">
                    <div className="border-b border-foreground/10 pb-4 mb-12">
                        <h2 className="font-anton text-3xl md:text-4xl uppercase tracking-widest text-foreground/50">Web Platforms</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                        {webProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="group relative flex flex-col h-full"
                            >
                                {/* Image Container */}
                                <div className="relative w-full aspect-[4/3] overflow-hidden bg-foreground/5 mb-6 border border-foreground/10 flex items-center justify-center">
                                    {product.image ? (
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-[0.33,1,0.68,1] group-hover:scale-105"
                                        />
                                    ) : product.link ? (
                                        <img
                                            src={`https://api.microlink.io/?url=${encodeURIComponent(product.link)}&screenshot=true&meta=false&embed=screenshot.url`}
                                            alt={product.title}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-[0.33,1,0.68,1] group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                                            No Image
                                        </span>
                                    )}
                                    <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                {/* Info */}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/50 mb-2 block">
                                            {(product.productType || "WEB_PRODUCT").replace('_', ' ')}
                                        </span>
                                        <h2 className="font-anton text-4xl md:text-5xl uppercase tracking-wide text-foreground">
                                            {product.title}
                                        </h2>
                                    </div>
                                    <span className="font-mono text-sm tracking-[0.2em] text-foreground/30 mt-1">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                <p className="font-inter text-base text-foreground/70 mb-8 max-w-md">
                                    {product.description}
                                </p>

                                <div className="mt-auto">
                                    {product.link ? (
                                        <Link
                                            href={product.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-4 text-sm font-anton uppercase tracking-widest text-foreground hover:text-foreground/60 transition-colors border-b border-foreground/30 pb-2 hover:border-foreground w-fit"
                                        >
                                            View Product <ArrowRight size={16} />
                                        </Link>
                                    ) : (
                                        <span className="inline-flex items-center gap-4 text-sm font-anton uppercase tracking-widest text-foreground/40 border-b border-foreground/10 pb-2 w-fit">
                                            Coming Soon <ArrowRight size={16} />
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Empty State */}
            {products.length === 0 && (
                <section className="px-6 md:px-12 w-full max-w-screen-2xl mx-auto">
                    <div className="border border-dashed border-[var(--border)] p-16 text-center">
                        <p className="font-inter text-sm text-[var(--muted-foreground)]">
                            No products found. Check back later!
                        </p>
                    </div>
                </section>
            )}
        </main>
    );
}
