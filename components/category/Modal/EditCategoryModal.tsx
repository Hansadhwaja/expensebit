"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState, useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import CategoryForm from '../Form/CategoryForm';
import { CategoryFormValues } from '@/lib/schemas/category.schemas';
import { editCategoryAction } from '@/lib/actions/category.actions';
import { toast } from 'sonner';
import { Category } from '@/lib/types/category.types';

interface Props {
    category: Category;
}

const EditCategoryModal = ({ category }: Props) => {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (data: CategoryFormValues) => {
        startTransition(async () => {
            try {
                const response = await editCategoryAction({
                    categoryId: category._id,
                    data
                });

                if (!response.success) {
                    toast.error(response.message);
                    return;
                }

                setOpen(false);
                toast.success(response.message ?? "Category edited Successfully");
            } catch (error) {
                console.log(error);
                toast.error("Error while editing Category");
            }
        })
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className='w-full text-blue-500'>
                    <Edit />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>
                        Track business Categories and maintain accurate financial records.
                    </DialogDescription>
                </DialogHeader>
                <CategoryForm
                    initialData={category}
                    onSubmit={handleSubmit}
                    isLoading={isPending}
                />
            </DialogContent>
        </Dialog>
    )
}

export default EditCategoryModal