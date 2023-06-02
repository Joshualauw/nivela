import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { NextRequest } from "next/server";
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
            const _user = await prisma.user.findFirst({ where: { id: user.id } });
            return Promise.resolve({
                ...session,
                user: { ...user, ..._user },
            });
        },
    },
};

export async function isAuthenticated(request: NextRequest) {
    const tokenKey = ["next-auth.session-token", "__Secure-next-auth.session-token"];
    const token = request.cookies.get(tokenKey[0]) || request.cookies.get(tokenKey[1]);
    // for api testing
    // const token = request.headers.get("token");

    let loggedUser = null;
    if (token) {
        loggedUser = await prisma.session.findFirst({ where: { sessionToken: token.value }, include: { user: true } });
    }

    return loggedUser?.user;
}
