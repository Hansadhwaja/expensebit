import { Expense } from '@/lib/types/expense.types'
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
import EditExpenseModal from '../Modal/EditExpenseModal';
import DeleteExpenseModal from '../Modal/DeleteExpenseModal';

interface Props {
    expense: Expense;
}

const ExpenseActions = ({ expense }: Props) => {
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
                            <EditExpenseModal expense={expense} />
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='p-0'>
                        <div onClick={(e) => e.stopPropagation()} className='w-full'>
                            <DeleteExpenseModal id={expense._id} />
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ExpenseActions