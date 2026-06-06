import DeleteAlert from '@/components/common/Alert/DeleteAlert'
import { Button } from '@/components/ui/button'
import { deleteExpenseAction } from '@/lib/actions/expense.actions';
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner';


const DeleteExpenseModal = ({ id }: { id: string }) => {

    const handleDelete = async () => {
        try {
            const res = await deleteExpenseAction(id);
            if (!res.success) {
                toast.error(res.message);
                return;
            }
            toast.success("Expense deleted successfully");
        } catch (error) {
            console.log(error);
            toast.error("Error while deleting expense");
        }

    };

    return (
        <DeleteAlert
            trigger={
                <Button variant={"ghost"} className='w-full text-destructive'>
                    <Trash2 />
                    Delete
                </Button>
            }
            title="Delete this expense?"
            description="This action cannot be undone."
            onConfirm={handleDelete}
        />
    )
}

export default DeleteExpenseModal