export const getQueryValue = (value: string | string[] | undefined) => {
    return Array.isArray(value) ? value[0] ?? "" : value ?? "";
};

export const buildPageHref = (query: Record<string, string | string[] | undefined>, page: number) => {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
        const normalized = getQueryValue(value);
        if (normalized) {
            params.set(key, normalized);
        }
    });

    params.set("page", String(Math.max(1, page)));
    return params.toString() ? `?${params.toString()}` : "";
};



export const getVisiblePages = (currentPage: number, totalPages: number) => {
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};