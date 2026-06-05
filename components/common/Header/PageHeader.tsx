import Link from "next/link";
import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
    title: string;
    description?: string;
    previousLink?: string;
    others?: ReactNode;
}

const PageHeader = ({
    title,
    description,
    previousLink,
    others,
}: Props) => {
    return (
        <div className="sticky top-0 z-50 flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between bg-popover/80 rounded-b-2xl backdrop-blur-md shadow-sm">
            {/* Left Section */}
            <div className="space-y-3">
                {previousLink && (
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-fit rounded-xl"
                    >
                        <Link href={previousLink}>
                            <ArrowLeft size={16} />
                            Back
                        </Link>
                    </Button>
                )}

                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight">
                        {title}
                    </h1>

                    {description && (
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {/* Right Section */}
            {others && (
                <div className="flex items-center gap-2">
                    {others}
                </div>
            )}
        </div>
    );
};

export default PageHeader;