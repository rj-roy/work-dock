'use server'
import { serverMutation } from "../core/server";
import { getUserSession } from "../core/session";
import { ApiResponse } from "@/types/serverTypes";

export const postAction = async <T, B>(data: B, path: string, role: string): Promise<ApiResponse<T>> => {
    const session = await getUserSession();

    if (!session?.user?.id || session?.user?.role !== role) {
        throw new Error("Unauthorized");
    };

    const res = await serverMutation<T>(`${path}`, data, 'POST');
    return res;
};