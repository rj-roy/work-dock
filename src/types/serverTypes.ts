export interface ServerFetchResult<T> {
    success: boolean;
    message: string;
    data: T | null;
    headers: Headers;
};

export interface WorkSpaceResult <T> {
    data: T | null;
    headers: Headers;
};