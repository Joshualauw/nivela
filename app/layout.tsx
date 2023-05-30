"use client";

import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import Providers from "@/components/providers";
import "@/styles/global.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
    title: "Nivela",
    description: "Create and Manage your Novel Projects",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <div className="bg-slate-50 h-screen w-full fixed top-0 left-0">
                        {children}
                        <ToastContainer />
                        <div className="mb-4"></div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
