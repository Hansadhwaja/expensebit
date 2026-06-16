import { Document, model, models, Schema, Types } from "mongoose";

export interface IExpense extends Document {
    title: string;
    amount: number;
    category: Types.ObjectId;
    paymentMethod: "cash" | "upi" | "card" | "bank" | "other";
    note?: string;
    date: Date;
    receiptImage?: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

const expenseSchema = new Schema<IExpense>({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: Types.ObjectId,
        ref: "Category",
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["cash", "upi", "card", "bank", "other"],
    },
    note: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
        index: true
    },
    receiptImage: {
        type: String,
    },
    userId: {
        type: String,
        required: true,
        index: true
    },
}, { timestamps: true, versionKey: false });

const Expense = models.Expense || model<IExpense>("Expense", expenseSchema);

export default Expense;