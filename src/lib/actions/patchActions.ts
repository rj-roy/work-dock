'use server'
import { serverMutation } from "../core/server";
import { getUserSession } from "../core/session";
import { ServerFetchResult } from "@/types/serverTypes";

export const patchAction = async <T, B>(data: B, path: string, role: string): Promise<ServerFetchResult<T>> => {
    const session = await getUserSession();

    if (!session?.user?.id || session?.user?.role !== role) {
        throw new Error("Unauthorized");
    };

    const res = await serverMutation<T>(`${path}`, data, 'POST');
    return res;
};