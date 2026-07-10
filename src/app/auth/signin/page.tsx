import SigninCompo from "@/components/auth/SigninCompo";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Signin | WorkDock",
    description: "Let's continue"
};

const SigninPage = () => {
    return (
        <div>
            <SigninCompo/>
        </div>
    );
};

export default SigninPage;