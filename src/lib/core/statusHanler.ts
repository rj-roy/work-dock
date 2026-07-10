import { redirect } from "next/navigation";

export const statusHandler = async <T>(res: Response): Promise<T | null> => {
    switch (res.status) {
        case 401:
            redirect("/unauthorized");

        case 403:
            redirect("/forbidden");

        case 404:
            redirect("/not-found");
    };

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
        return null;
    };

    try {
        return JSON.parse(text) as T;
    } catch {
        throw new Error("Invalid response from server");
    };
};