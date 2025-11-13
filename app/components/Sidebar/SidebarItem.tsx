import React from "react";
import Link from "next/link";
import SidebarDropdown from "./SidebarDropdown";
import { usePathname } from "next/navigation";

const SidebarItem = ({item , pageName, setPageName} : any) => {
    const handleClick = () => {
        const updatePageName = pageName !== item.label.toLowerCase() ? item.label.toLowerCase(): "";

        return setPageName(updatePageName);
    };

    const pathname = usePathname();

    const isActive = (item: any) => {
        if (item.route === pathname) return true;
        if (item.children) {
        return item.children.some((child: any) => isActive(child));
        }
        return false;
    };

    const isItemActive = isActive(item);

    const linkClassName = `${isItemActive ? "rounded-md bg-graydark dark:bg-[#1e1e1e]" : ""} group relative flex items-center gap-2.5 rounded-md px-4 py-2  text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-[#1e1e1e]`;

    return (
        <>
            <li>
                {item.route ? (
                    <Link href={item.route} onClick={handleClick}
                        className={linkClassName}
                    >
                        {item.icon}
                        {item.label}
                    </Link>
                ) : item.href ? (
                    <a 
                        href={item.href} 
                        onClick={handleClick}
                        className={linkClassName}
                    >
                        {item.icon}
                        {item.label}
                    </a>
                ) : null}

                {item.children && (
                     <div
                        className={`translate transform overflow-hidden ${
                        pageName !== item.label.toLowerCase() && "hidden"
                        }`}
                    >
                        <SidebarDropdown item={item.children} />
                    </div>
                )}
            </li>
        
        </>
    )
}

export default SidebarItem;