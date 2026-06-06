import { Skeleton } from "@/components/ui/skeleton";

const PageHeaderSkeleton = () => {
    return (
        <div className="flex items-center justify-between border-b p-4">
            {/* Left */}
            <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-64" />
            </div>

            {/* Right button */}
            <Skeleton className="h-9 w-32 rounded-full" />
        </div>
    );
};

export default PageHeaderSkeleton;