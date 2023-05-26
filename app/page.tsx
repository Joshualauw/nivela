import { LoginForm } from "@/components/Auth/LoginForm";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
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
