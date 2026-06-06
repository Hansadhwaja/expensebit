import { Skeleton } from "@/components/ui/skeleton";

const CategoryTableSkeleton = () => {
    return (
        <div className="space-y-3 p-4">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-full" />
                ))}
            </div>

            {/* Rows */}
            {Array.from({ length: 6 }).map((_, row) => (
                <div key={row} className="grid grid-cols-5 gap-4">
                    {Array.from({ length: 4 }).map((_, col) => (
                        <Skeleton key={col} className="h-10 w-full" />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default CategoryTableSkeleton;