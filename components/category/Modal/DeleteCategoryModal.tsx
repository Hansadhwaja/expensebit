import DeleteAlert from '@/components/common/Alert/DeleteAlert'
import { Button } from '@/components/ui/button'
import { deleteCategoryAction } from '@/lib/actions/category.actions';
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner';


const DeleteCategoryModal = ({ id }: { id: string }) => {

    const handleDelete = async () => {
        try {
            const res = await deleteCategoryAction(id);
            if (!res.success) {
                toast.error(res.message);
                return;
            }
            toast.success("Category deleted successfully");
        } catch (error) {
            console.log(error);
            toast.error("Error while deleting Category");
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
            title="Delete this Category?"
            description="This action cannot be undone."
            onConfirm={handleDelete}
        />
    )
}

export default DeleteCategoryModal