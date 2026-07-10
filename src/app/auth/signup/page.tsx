import SignupCompo from "@/components/auth/SignupCompo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up | WorkDock",
  description: "Create an account to continue exploring WorkDock",
};

const SignupPage = () => {
    return (
        <div>
            <SignupCompo/>
        </div>
    );
};

export default SignupPage;