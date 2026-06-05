import { model, models, Schema } from "mongoose";


const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    color: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index:true
    }
}, { timestamps: true, versionKey: false });

categorySchema.index({ userId: 1, name: 1 }, { unique: true });

const Category = models.Category || model("Category", categorySchema);

export default Category;