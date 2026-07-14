import SignupCompo from "@/components/auth/SignupCompo";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign up | WorkDock",
    description: "Create an account to continue exploring WorkDock",
};

export default async function SignupPage({ searchParams, }: { searchParams: Promise<{ redirect?: string }>; }) {
    const { redirect } = await searchParams;

    return (
        <div>
            <SignupCompo redirect={redirect} />
        </div>
    );
}