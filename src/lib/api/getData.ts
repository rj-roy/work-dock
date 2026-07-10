import { serverFetch } from "../core/server";

export const getDataByCollection = <T>(path: string): Promise<T | null> => {
    const data = serverFetch<T>(path);
    return data;
};