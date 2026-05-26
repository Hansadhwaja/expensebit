import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    image: {
        type: String,
    },
    currency: {
        type: String
    },
}, { timestamps: true, versionKey: false });

const User = models.User || model("User", userSchema);

export default User;