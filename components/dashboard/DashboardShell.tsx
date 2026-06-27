"use client";

import { ReactNode, useState } from "react";

import Sidebar from "@/components/common/Layout/Sidebar";
import TopBar from "@/components/common/Layout/TopBar";

const DashboardShell = ({
    children,
    userName
}: {
    children: ReactNode;
    userName:string
}) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <div className="flex h-screen overflow-hidden bg-muted/30">
            {/* Sidebar */}
            <Sidebar collapsed={collapsed} />

            {/* Right Section */}
            <div className="flex min-w-0 flex-1 flex-col">
                {/* Topbar */}
                <TopBar toggleSidebar={toggleSidebar} userName={userName} />

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardShell;