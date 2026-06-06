import { model, models, Schema, Types } from "mongoose";

const expenseSchema = new Schema({
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

const Expense = models.Expense || model("Expense", expenseSchema);

export default Expense;