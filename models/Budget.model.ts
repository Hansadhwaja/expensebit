import { model, models, Schema } from "mongoose";

const budgetSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    limit: {
        type: Number,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true, versionKey: false });

const Budget = models.Budget || model("Budget", budgetSchema);

export default Budget;