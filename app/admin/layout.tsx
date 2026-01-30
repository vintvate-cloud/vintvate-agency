import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";

export default async function AdminLayout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "ADMIN") {
        redirect("/admin-login");
    }

    return (
        <AdminLayoutWrapper user={session.user}>
            {children}
        </AdminLayoutWrapper>
    );
}

