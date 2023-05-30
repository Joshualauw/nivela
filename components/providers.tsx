"use client";

import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export function Providers({ children, session }: any) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </SessionProvider>
    );
}

export default Providers;
