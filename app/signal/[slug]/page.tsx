
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const blog = await prisma.blog.findUnique({
        where: { slug }
    });

    if (!blog) {
        notFound();
    }

    return (
        <main className="w-full min-h-screen bg-[var(--background)] pt-32 pb-20 px-6 md:px-12 flex flex-col items-center">

            <div className="max-w-4xl w-full">
                {/* Back Link */}
                <Link
                    href="/signal"
                    className="inline-block mb-8 font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                    ← Incoming Signal
                </Link>

                {/* Header Info */}
                <div className="flex flex-col gap-6 mb-12">
                    <h1 className="font-anton text-[10vw] md:text-[6vw] leading-[0.9] uppercase tracking-tighter text-[var(--foreground)]">
                        {blog.title}
                    </h1>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center font-inter text-xs md:text-sm uppercase tracking-widest text-[#888] border-t border-b border-[var(--border)] py-6 w-full opacity-80 hover:opacity-100 transition-opacity">
                        <div className="flex gap-4">
                            <span>{'//'} {format(new Date(blog.createdAt), "MMMM dd, yyyy")}</span>
                        </div>
                        <div className="flex gap-4">
                            <span>OPR: <span className="text-white">{blog.author}</span></span>
                            <span className="opacity-50">|</span>
                            <span>ID: {blog.id.slice(-4)}</span>
                        </div>
                    </div>
                </div>

                {/* Cover Image */}
                {blog.image && (
                    <div className="w-full h-[40vh] md:h-[65vh] relative mb-16 overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700 group">
                        <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                            priority
                        />
                    </div>
                )}

                {/* Content */}
                <article className="prose prose-xl prose-invert max-w-none font-inter text-[#EAEAEA] md:text-xl leading-relaxed tracking-wide prose-headings:font-anton prose-headings:uppercase prose-headings:text-white prose-a:text-white prose-a:underline prose-strong:text-white prose-p:mb-6 first-letter:float-left first-letter:text-6xl first-letter:font-anton first-letter:mr-3 first-letter:leading-none first-letter:text-white">
                    <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }} />
                </article>

                {/* Footer Navigation */}
                <div className="mt-20 pt-10 border-t border-[var(--border)] w-full flex justify-between items-center">
                    <span className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)]">End of Transmission</span>
                    <Link href="/signal" className="px-6 py-3 border border-[var(--border)] font-inter text-xs uppercase tracking-widest hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all">
                        Return
                    </Link>
                </div>

            </div>
        </main>
    );
}
