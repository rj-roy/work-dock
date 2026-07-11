import { ServerFetchResult, statusHandler } from "./statusHanler";

const serverBase = process.env.SERVER_BASE!;

export const serverFetch = async <T>(path: string): Promise<ServerFetchResult<T>> => {
    const res = await fetch(`${serverBase}${path}`);
    return statusHandler<T>(res);
    // return res.json();
};