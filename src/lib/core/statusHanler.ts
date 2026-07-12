import { WorkSpaceResult } from "@/types/serverTypes";
import { redirect } from "next/navigation";

export const statusHandler = async <T>(res: Response): Promise<WorkSpaceResult<T>> => {
    switch (res.status) {
        case 401:
            redirect("/unauthorized");

        case 403:
            redirect("/forbidden");

        case 404:
            redirect("/not-found");
    };

    const headers = res.headers;
    const text = await res.text();

    if (!res.ok) {
        let errorMessage = "Something went wrong! Please try again later.";
        try {
            errorMessage = JSON.parse(text).message || errorMessage;
        } catch {
            // 
        }
        throw new Error(errorMessage);
    };

    if (!text) {
        return { data: null, headers };
    };

    try {
        return { data: JSON.parse(text) as T, headers };
    } catch {
        throw new Error("Invalid response from server");
    };
};