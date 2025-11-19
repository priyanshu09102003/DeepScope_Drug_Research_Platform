"use client";

import { useState } from "react";
import { ChevronDown, LogOut, Settings, User2, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/app/context/UserContext";
import { signOut, useSession } from "next-auth/react";

const DropdownUser = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const router = useRouter();

    const user = useUser();
    const { data: session } = useSession();


    const handleLogout = async()=>{
        await signOut({redirect: false})
        router.push('/auth-page/signin')
    }
    
    return(
        <div className="relative">
            <Link
                onClick={() => setDropdownOpen(!dropdownOpen)}
                href={'#'} className="flex items-center gap-4"> 

                    <span className="hidden text-right lg:block">

                        <span className="block text-sm font-bold text-black dark:text-white">
                            {user.firstName} {user.lastName}
                        </span>

                        <span className="block text-xs text-body dark:text-bodydark">
                            Researcher
                        </span>


                    </span>

                    {user.photo ? (
                        <span className="relative h-12 w-12 rounded-full bg-gradient-to-tr from-primary via-primary to-primary/80 p-0.5 shadow-md">
                            <span className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-boxdark p-0.5">
                                <Image 
                                    width={44} 
                                    height={44} 
                                    src={user.photo} 
                                    alt=""
                                    className="h-full w-full rounded-full object-cover"
                                />
                            </span>
                        </span>
                    ) : (
                        <span className="relative h-12 w-12 rounded-full bg-gradient-to-tr from-primary via-primary to-primary/80 p-0.5 shadow-md">
                            <span className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-boxdark">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80">
                                    <User2 className="h-5 w-5 text-white" />
                                </span>
                            </span>
                        </span>
                    )}

                    <ChevronDown className="h-4 w-4 text-body dark:text-bodydark" />
                
                </Link>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
                <li>
                <Link
                    href="/profile"
                    className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                >
                    <User2 />
                    My Profile
                </Link>
                </li>
                <li>
                <Link
                    href="/settings"
                    className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                >
                    <Settings />
                    Account Settings
                </Link>
                </li>
            </ul>
            {session ? (
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base cursor-pointer"
                >
                    <LogOut />
                    Log Out
                </button>
            ) : (
                <Link
                    href="/auth-page/signup"
                    className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base cursor-pointer"
                >
                    <UserPlus />
                    Create New User
                </Link>
            )}
            </div>
            )}
        </div>
    )
}

export default DropdownUser