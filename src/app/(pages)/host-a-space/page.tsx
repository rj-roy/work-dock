import SigninCompo from "@/components/auth/SigninCompo";
import HostOnlyModal from "@/components/modal/HostOnlyModal";
import ListNewSpace from "@/components/pages/listing/ListingSpace";
import { getUserSession } from "@/lib/core/session";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Host a Space | Word Dock",
    description: "Let's figure out your listing",
};

const HostASpace = async () => {
    const session = await getUserSession();

    return (
        <div>
            {
                !session ?
                    <div>
                        <SigninCompo redirect="/host-a-space" />
                    </div>
                    : session?.user?.role !== "host" ?
                        <div>
                            <HostOnlyModal returnTo="/host-a-space" />
                        </div>
                        : <div>
                            <ListNewSpace />
                        </div>
            }
        </div>
    );
};

export default HostASpace;