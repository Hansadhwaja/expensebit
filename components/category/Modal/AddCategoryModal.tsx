"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState, useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import CategoryForm from '../Form/CategoryForm';
import { CategoryFormValues } from '@/lib/schemas/category.schemas';
import { addCategoryAction } from '@/lib/actions/category.actions';
import { toast } from 'sonner';

const AddCategoryModal = () => {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (data: CategoryFormValues) => {
        startTransition(async () => {
            try {
                const response = await addCategoryAction(data);

                if (!response.success) {
                    toast.error(response.message);
                    return;
                }

                setOpen(false);
                toast.success(response.message ?? "Category added Successfully");
            } catch (error) {
                console.log(error);
                toast.error("Error while adding Category");
            }
        })
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    Add Category
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>
                        Create and organize categories to better track and manage your expenses.
                    </DialogDescription>
                </DialogHeader>
                <CategoryForm
                    onSubmit={handleSubmit}
                    isLoading={isPending}
                />
            </DialogContent>
        </Dialog>
    )
}

export default AddCategoryModal