import { Bell, Menu, Search } from "lucide-react";
import UserProfile from "../User/UserProfile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MobileSidebar from "./MobileSidebar";

interface Props {
    toggleSidebar: () => void;
}

const TopBar = ({ toggleSidebar }: Props) => {
    return (
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-popover px-6 shadow-sm backdrop-blur">
            {/* Left */}
            <div className="flex items-center gap-4">
                <Button
                    size="icon"
                    variant="outline"
                    className="rounded-xl max-lg:hidden"
                    onClick={toggleSidebar}
                >
                    <Menu size={18} />
                </Button>
                <MobileSidebar />
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative hidden lg:block">
                    <Search
                        size={16}
                        className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                    />

                    <Input
                        placeholder="Search expenses..."
                        className="w-72 rounded-xl pl-9 xl:w-80"
                    />
                </div>

                {/* Notifications */}
                <Button
                    size="icon"
                    variant="outline"
                    className="relative rounded-xl"
                >
                    <Bell size={18} />

                    <span className="absolute top-2 right-2 size-2 rounded-full bg-red-500" />
                </Button>

                <UserProfile name="User" />
            </div>
        </header>
    );
};

export default TopBar;