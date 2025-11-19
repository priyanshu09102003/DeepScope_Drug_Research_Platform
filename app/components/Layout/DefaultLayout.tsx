'use client';

import React, { useLayoutEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { getUserByEmail } from "@/app/lib/actions/user.actions";


export default function DefaultLayout({
    children,
}:{
    children: React.ReactNode;
}){
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const {data: session, status} = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [isChecking, setIsChecking] = useState(true);
    const [userExists, setUserExists] = useState(false);

    const publicRoutes = [
        "/auth-page/signin",
        "/auth-page/signup",
        "/verify-email",
        "/reset-password",
        "/forget-password"
    ];

    useLayoutEffect(() => {
        const checkUserAndRedirect = async () => {
            // If on public route, allow access immediately
            if (publicRoutes.includes(pathname)) {
                setIsChecking(false);
                return;
            }

            // If still loading session, wait
            if (status === "loading") {
                return;
            }

            // If not authenticated, redirect to signin (changed from signup)
            if (status === "unauthenticated") {
                router.push("/auth-page/signin"); // ✅ Changed this line
                return;
            }

            // If authenticated, check if user exists in database
            if (status === "authenticated" && session?.user?.email) {
                try {
                    const user = await getUserByEmail(session.user.email);
                    
                    if (!user) {
                        // User doesn't exist in DB, redirect to signup
                        router.push("/auth-page/signup");
                    } else {
                        // User exists, allow access
                        setUserExists(true);
                        setIsChecking(false);
                    }
                } catch (error) {
                    console.error("Error checking user:", error);
                    router.push("/auth-page/signup");
                }
            }
        };

        checkUserAndRedirect();
    }, [status, session, router, pathname]);

    // Show loading state while checking (only for protected routes)
    if (!publicRoutes.includes(pathname) && (status === "loading" || isChecking)) {
        return (
            <div className="flex h-screen items-center justify-center bg-white dark:bg-[#121212]">
                <div className="text-center">
                    <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                    <p className="text-lg text-black dark:text-white">Loading...</p>
                </div>
            </div>
        );
    }

    // Only render content if:
    // 1. On public route, OR
    // 2. User exists in database
    if (publicRoutes.includes(pathname) || userExists) {
        return (
            <div className="flex">
                {/* SideBar Component */}
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <div className="relative flex flex-1 flex-col lg:ml-72.5">
                    {/* Header Component */}
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 dark:bg-[#121212] md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    // Return null while redirecting
    return null;
}