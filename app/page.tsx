import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

async function Home() {
    const session = await getServerSession(authOptions);
    if (session) redirect("/dashboard/overview");

    return (
        <main className="mx-auto max-w-[550px] md:mt-24 mt-14 p-8 h-full">
            <Card className="w-full p-6">
                <CardHeader className="text-center flex justify-center items-center">
                    <Image src="/img/logo.png" alt="logo" width={50} height={50} />
                    <CardTitle>Welcome to Nivela</CardTitle>
                    <CardDescription>Login to our application</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </main>
    );
}

export default Home;
