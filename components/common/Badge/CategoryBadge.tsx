import { Badge } from "@/components/ui/badge";
import { categoryColors, categoryIcons } from "@/constants";
import { Category } from "@/lib/types/category.types";

export const CategoryBadge = ({ category }: { category: Category }) => {
    if (!category || typeof category === "string") return "-";

    const color = categoryColors.find(c => c.value === category.color);
    const iconObj = categoryIcons.find(i => i.value === category.icon);
    const Icon = iconObj?.icon;

    return (
        <Badge
            className={`${color?.class}`}
        >
            {Icon && <Icon size={14} />}
            <span className="text-xs truncate max-w-30">
                {category.name}
            </span>
        </Badge>
    );
};