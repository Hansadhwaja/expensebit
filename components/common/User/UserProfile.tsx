import { cn } from "@/lib/utils";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

interface Props {
    name: string;
    src?: string;
    className?: string;
}

const UserProfile = ({
    name,
    src,
    className,
}: Props) => {
    const initials = name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <Avatar className={cn("size-10 border", className)}>
            <AvatarImage
                src={src}
                alt={name}
                className="object-cover"
            />

            <AvatarFallback className="bg-primary/10 font-medium text-primary">
                {initials}
            </AvatarFallback>
        </Avatar>
    );
};

export default UserProfile;