import { statusHandler } from "./statusHanler";

const serverBase = process.env.SERVER_BASE!;

export const serverFetch = async <T>(path: string): Promise<T | null> => {
    const res = await fetch(`${serverBase}${path}`);
    return statusHandler<T>(res);
    // return res.json();
};