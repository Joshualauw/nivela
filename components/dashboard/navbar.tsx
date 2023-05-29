"use client";

import { CreditCard, LogOut, Menu, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useTitleStore } from "@/store/useTitleStore";
import { FaDashcube } from "react-icons/fa";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";

function Navbar() {
    const { title } = useTitleStore();
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/");
        },
    });

    return session && session.user ? (
        <div className="flex justify-between items-center w-full h-16 border-b px-3 md:px-8">
            <div className="flex items-center">
                <Sheet>
                    <SheetTrigger>
                        <div className={"block lg:hidden " + buttonVariants({ variant: "ghost" })}>
                            <Menu className="w-6 h-6" />
                        </div>
                    </SheetTrigger>
                    <SheetContent position="left">
                        <Sidebar className="absolute top-0 left-0 min-h-screen w-[250px]" />
                    </SheetContent>
                </Sheet>
                <h3 className="font-semibold">{title}</h3>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative flex">
                        <Avatar className="w-6 h-6 md:w-8 md:h-8">
                            <AvatarImage src={session.user?.image ?? ""} alt="user_avatar" />
                            <AvatarFallback>ME</AvatarFallback>
                        </Avatar>
                        <div className="text-left ml-2">
                            <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="end" forceMount>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Billing</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <FaDashcube className="mr-2 h-4 w-4" />
                        <Link href="/projects">My Projects</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    ) : (
        <></>
    );
}

export default Navbar;
