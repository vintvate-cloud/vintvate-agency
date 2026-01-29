import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProjectView from "@/components/ProjectView";

export const dynamic = 'force-dynamic';

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const project = await prisma.project.findUnique({
        where: { id }
    });

    if (!project) {
        notFound();
    }

    // Attempt to find the next project
    // This is a simple query, finding the first one created after this one, or looping back.
    // For simplicity, let's just grab one that isn't this one.
    const nextProject = await prisma.project.findFirst({
        where: {
            NOT: { id: id }
        },
        orderBy: { createdAt: 'desc' }
    });


    return <ProjectView project={project} nextProject={nextProject} />;
}
