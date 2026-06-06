import { Loader2 } from "lucide-react";

const Loader = ({ size = 12 }: { size?: number }) => {
    return (
        <div className="flex items-center justify-center py-8">
            <Loader2 size={size} className="animate-spin" />
        </div>
    );
};

export default Loader;