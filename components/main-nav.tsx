"use client"

import React from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Category} from "@/types";

interface MainNavProps {
    data: Category[]
}

const MainNav: React.FC<MainNavProps> = ({
                                             data
                                         }) => {
    const pathname = usePathname();

    const routes = data.map((route) => ({
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname === `/category/${route.id}`
    }))

    return (
        <div className={"mx-6 flex items-center space-x-4 lg:space-x-6"}>
            {routes.map((route) => (
                <Link
                    href={route.href}
                    key={route.href}
                    className={cn("text-sm font-medium transition-colors", route.active ? "text-gray-900" : "text-gray-500 hover:text-gray-900")}
                >
                    {route.label}
                </Link>
            ))}
        </div>
    );
}

export default MainNav;