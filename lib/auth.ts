import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "./db";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            return Promise.resolve({
                ...session,
                user: {
                    ...session.user,
                    id: user.id,
                },
            });
        },
    },
};

export async function isAuthenticated(request: NextRequest) {
    // const token = request.cookies.get("next-auth.session-token");
    //for api testing
    const token = request.headers.get("token");
    let loggedUser = null;

    if (token) {
        loggedUser = await prisma.session.findFirst({ where: { sessionToken: token }, include: { user: true } });
    }

    return loggedUser?.user;
}
