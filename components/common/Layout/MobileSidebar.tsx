"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Menu, Wallet } from "lucide-react";

import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

const MobileSidebar = () => {
    const pathname = usePathname();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    variant="outline"
                    className="rounded-xl lg:hidden"
                >
                    <Menu size={18} />
                </Button>
            </SheetTrigger>

            <SheetContent
                side="left"
                className="w-72 border-r p-0"
            >
                {/* Header */}
                <SheetHeader className="border-b px-6 py-5">
                    <div className="flex items-center gap-3 text-left">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                            <Wallet size={22} />
                        </div>

                        <div className="flex flex-col">
                            <SheetTitle className="text-lg font-bold tracking-tight">
                                Expense Tracker
                            </SheetTitle>

                            <SheetDescription className="text-xs font-normal text-muted-foreground">
                                Personal Finance Dashboard
                            </SheetDescription>
                        </div>
                    </div>
                </SheetHeader>

                {/* Navigation */}
                <nav className="flex flex-col gap-2 p-4">
                    {navLinks.map((item) => {
                        const isActive =
                            item.href === "/dashboard"
                                ? pathname === "/dashboard"
                                : pathname === item.href ||
                                pathname.startsWith(`${item.href}/`);

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground",
                                    isActive &&
                                    "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary hover:text-primary-foreground"
                                )}
                            >
                                <item.icon size={20} />

                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="mt-auto p-4">
                    <div className="rounded-3xl border bg-muted/40 p-4">
                        <h3 className="text-sm font-semibold">
                            Track smarter 💸
                        </h3>

                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            Stay on top of your expenses and understand where
                            your money goes every month.
                        </p>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;