"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState, useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import ExpenseForm from '../Form/ExpenseForm';
import { ExpenseFormValues } from '@/lib/schemas/expense.schemas';
import { addExpenseAction } from '@/lib/actions/expense.actions';
import { toast } from 'sonner';

const AddExpenseModal = () => {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (data: ExpenseFormValues) => {
        startTransition(async () => {
            try {
                const response = await addExpenseAction(data);

                if (!response.success) {
                    toast.error(response.message);
                    return;
                }

                setOpen(false);
                toast.success(response.message ?? "Expense added Successfully");
            } catch (error) {
                console.log(error);
                toast.error("Error while adding expense");
            }
        })
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    Add Expense
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
                    onSubmit={handleSubmit}
                    isLoading={isPending}
                />
            </DialogContent>
        </Dialog>
    )
}

export default AddExpenseModal