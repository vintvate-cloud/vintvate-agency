import TeamGrid from "@/components/TeamGrid";
import TeamHeader from "@/components/TeamHeader";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic'; // Ensure it fetches fresh data on every request

export default async function TeamPage() {
    const team = await prisma.team.findMany({
        orderBy: {
            createdAt: 'asc' // or 'desc' depending on preference
        }
    });

    return (
        <main className="w-full min-h-screen bg-[var(--background)] pt-32 pb-20">
            <TeamHeader />
            <TeamGrid members={team} />
        </main>
    );
}
