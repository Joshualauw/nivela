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

export async function getFileFromUrl(url: string, fileName: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName);
}

export function swapItems(arr: any[], idx: number) {
    if (idx < 0 || idx >= arr.length - 1) {
        return arr;
    }
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    return arr;
}
