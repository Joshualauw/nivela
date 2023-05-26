import Provider from "@/components/provider";
import { ReactNode } from "react";
import "@/styles/global.css";

export const metadata = {
    title: "Nivela",
    description: "Create and Manage your Novel Projects",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <main className="bg-slate-50 min-h-screen w-full fixed top-0 left-0">{children}</main>
                </Provider>
            </body>
        </html>
    );
}
