
export type ActionResponse<T = null> = {
    success: boolean;
    message: string;
    data?: T;
};

export type Pagination = {
    page: number,
    limit: number,
    totalPages: number,
    totalCount: number
}