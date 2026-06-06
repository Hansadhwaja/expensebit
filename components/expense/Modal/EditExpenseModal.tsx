"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState, useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import ExpenseForm from '../Form/ExpenseForm';
import { ExpenseFormValues } from '@/lib/schemas/expense.schemas';
import { editExpenseAction } from '@/lib/actions/expense.actions';
import { toast } from 'sonner';
import { Expense } from '@/lib/types/expense.types';
import { useExpenseContext } from '@/features/context/ExpenseContext';

interface Props {
    expense: Expense;
}

const EditExpenseModal = ({ expense }: Props) => {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const { categories } = useExpenseContext();

    const handleSubmit = (data: ExpenseFormValues) => {
        startTransition(async () => {
            try {
                const response = await editExpenseAction({
                    expenseId: expense._id,
                    data
                });

                if (!response.success) {
                    toast.error(response.message);
                    return;
                }

                setOpen(false);
                toast.success(response.message ?? "Expense edited Successfully");
            } catch (error) {
                console.log(error);
                toast.error("Error while editing expense");
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
                    <DialogTitle>Add New Expense</DialogTitle>
                    <DialogDescription>
                        Track business expenses and maintain accurate financial records.
                    </DialogDescription>
                </DialogHeader>
                <ExpenseForm
                    initialData={expense}
                    onSubmit={handleSubmit}
                    isLoading={isPending}
                    categories={categories}
                />
            </DialogContent>
        </Dialog>
    )
}

export default EditExpenseModal