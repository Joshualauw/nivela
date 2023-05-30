export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export interface ApiResponse<T> {
    data: T;
    message: string;
}

export interface ErrorResponse {
    code: number;
    detail: {
        errors: string[];
        message: string;
    };
}
