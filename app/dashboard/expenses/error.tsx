"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    console.log(error);
    return (
        <div className="flex flex-col items-center justify-center h-[400px] text-center gap-4">
            <AlertTriangle className="text-red-500 w-10 h-10" />

            <div className="space-y-1">
                <h2 className="text-lg font-semibold">Something went wrong</h2>
                <p className="text-sm text-muted-foreground">
                    Failed to load expenses. Please try again.
                </p>
            </div>

            <Button onClick={() => reset()}>
                Try Again
            </Button>
        </div>
    );
}