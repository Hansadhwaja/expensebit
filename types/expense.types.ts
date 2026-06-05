

export type PaymentMethod =
    | "cash"
    | "upi"
    | "card"
    | "bank"
    | "other";
export type Expense = {
    _id: string;
    title: string;
    amount: number;
    category: string;
    paymentMethod: PaymentMethod;
    date: string;
    note?: string | undefined;
    receiptImage?: string | undefined;
}