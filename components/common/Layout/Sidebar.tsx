"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet } from "lucide-react";

import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
    collapsed: boolean;
}

const Sidebar = ({ collapsed }: Props) => {
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                "sticky top-0 lg:flex h-screen flex-col border-r bg-popover py-6 backdrop-blur transition-all duration-300 hidden",
                collapsed ? "w-24 px-3" : "w-72 px-5"
            )}
        >
            {/* Logo */}
            <div
                className={cn(
                    "flex items-center",
                    collapsed ? "justify-center" : "gap-3 px-2"
                )}
            >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                    <Wallet size={22} />
                </div>

                {!collapsed && (
                    <div className="flex flex-col overflow-hidden">
                        <h2 className="truncate text-lg font-bold tracking-tight">
                            Expense Tracker
                        </h2>

                        <p className="truncate text-xs text-muted-foreground">
                            Personal Finance Dashboard
                        </p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="mt-10 flex flex-1 flex-col gap-2">
                {navLinks.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);

                    return (
                        <Tooltip key={item.label}>
                            <TooltipTrigger asChild>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "group relative flex items-center overflow-hidden rounded-2xl text-sm font-medium transition-all duration-200 hover:bg-muted hover:text-foreground",

                                        collapsed
                                            ? "justify-center px-0 py-3"
                                            : "gap-3 px-4 py-3",

                                        isActive &&
                                        "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary hover:text-primary-foreground"
                                    )}
                                >
                                    <item.icon
                                        size={20}
                                        className={cn(
                                            "transition-transform duration-200 group-hover:scale-110",
                                            isActive && "scale-110"
                                        )}
                                    />

                                    {!collapsed && (
                                        <span>{item.label}</span>
                                    )}
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                {item.label}
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </nav>


            <div
                className={cn("rounded-3xl border bg-muted/40 p-4",
                    collapsed ? "opacity-0" : "opacity-100"
                )}
            >
                <h3 className="text-sm font-semibold">
                    Track smarter 💸
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Stay on top of your expenses and understand where your
                    money goes every month.
                </p>
            </div>

        </aside>
    );
};

export default Sidebar;