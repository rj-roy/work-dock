import { ApiResponse, WorkSpaceResult } from "@/types/serverTypes";
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
        throw new Error(JSON.parse(text).message || "Something went wrong! Please try again later.");
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

export const handleStatus = async <T>(res: Response): Promise<ApiResponse<T>> => {
    const data: ApiResponse<T> = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    };

    return data;
};