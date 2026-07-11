import { serverFetch } from "../core/server";

export const getDataByCollection = async <T>(path: string) => {
    return serverFetch<T>(path);
};