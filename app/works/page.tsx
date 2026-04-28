import { prisma } from "@/lib/prisma";
import WorksToggle from "@/components/WorksToggle";

export const dynamic = 'force-dynamic';

export default async function WorksPage() {
    // Fetch all projects (CLIENT + TEMPLATE) for the toggle
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <main className="w-full min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-32 px-6 md:px-12 pb-20">
            {/* Header */}
            <div className="mb-10">
                <h1 className="font-anton text-6xl md:text-9xl uppercase leading-none">
                    Client Work
                </h1>
            </div>

            {/* Toggle + Grid */}
            <WorksToggle projects={projects} />
        </main>
    );
}
