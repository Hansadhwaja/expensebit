import { Category } from '@/lib/types/category.types'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from 'lucide-react';
import EditCategoryModal from '../Modal/EditCategoryModal';
import DeleteCategoryModal from '../Modal/DeleteCategoryModal';

interface Props {
    category: Category;
}

const CategoryActions = ({ category }: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon-xs">
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuItem className='p-0'>
                        <div onClick={(e) => e.stopPropagation()} className='w-full'>
                            <EditCategoryModal category={category} />
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='p-0'>
                        <div onClick={(e) => e.stopPropagation()} className='w-full'>
                            <DeleteCategoryModal id={category._id} />
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CategoryActions