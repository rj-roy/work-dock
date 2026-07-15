import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

const Dashboard = async () => {
    const session = await getUserSession();
    const role = session?.user?.role;

    if (!session) {
        redirect('/auth/signin');
    };
    const roleRouters = {
        seeker: '/dashboard/founder',
        recruiter: '/dashboard/collaborator',
        admin: '/dashboard/admin'
    };
    redirect(role ? roleRouters[role as keyof typeof roleRouters] : "/auth/signin");
};

export default Dashboard;