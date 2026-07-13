import { ApiResponse, WorkSpaceResult } from "@/types/serverTypes";
import { handleStatus, statusHandler } from "./statusHandler";
import { HTTPMethod } from "better-auth";

const serverBase = process.env.SERVER_BASE!;

export const serverFetch = async <T>(path: string): Promise<WorkSpaceResult<T>> => {
    const res = await fetch(`${serverBase}${path}`);
    return statusHandler<T>(res);
    // return res.json();
};

export const serverMutation = async <T>(path: string, data: unknown, method: HTTPMethod): Promise<ApiResponse<T>> => {
    const res = await fetch(`${serverBase}${path}`, {
        method: method,
        headers: {
            'Content-type' : 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleStatus(res);
};