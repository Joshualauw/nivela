import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function thousandSeparator(x: string | number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function exclude<T, Key extends keyof T>(obj: T, keys: Key[]): Omit<T, Key> {
    const newObj = { ...obj };
    for (const key of keys) {
        delete newObj[key];
    }
    return newObj;
}

export function axiosError(err: any) {
    const error = err as AxiosError;
    console.error(error);
    return JSON.stringify({ code: error.response?.status, detail: error.response?.data });
}
