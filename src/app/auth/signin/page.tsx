import SigninCompo from "@/components/auth/SigninCompo";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Signin | WorkDock",
    description: "Let's continue"
};

export default async function SigninPage({ searchParams, }: { searchParams: Promise<{ redirect?: string }>; }) {
    const { redirect } = await searchParams;

    return (
        <div>
            <SigninCompo redirect={redirect} />
        </div>
    );
}