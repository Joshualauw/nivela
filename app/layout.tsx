import "@/styles/global.css";
import { ReactNode } from "react";

export const metadata = {
    title: "Nivela",
    description: "Create and Manage your Novel Projects",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <main className="bg-slate-50 min-h-screen w-full fixed top-0 left-0">{children}</main>
            </body>
        </html>
    );
}
