import { ServerFetchResult, WorkSpaceResult } from "@/types/serverTypes";
import { statusHandler } from "./statusHanler";
import { HTTPMethod } from "better-auth";

const serverBase = process.env.SERVER_BASE!;

export const serverFetch = async <T>(path: string): Promise<WorkSpaceResult<T>> => {
    const res = await fetch(`${serverBase}${path}`);
    return statusHandler<T>(res);
    // return res.json();
};

export const serverMutation = async <T>(path: string, data: unknown, method: HTTPMethod): Promise<ServerFetchResult<T>> => {
    const res = await fetch(`${serverBase}${path}`, {
        method: method,
        headers: {
            'Content-type' : 'application/json',
        },
        body: JSON.stringify(data),
    });
    return res.json();
};