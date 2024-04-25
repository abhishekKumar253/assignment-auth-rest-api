import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Please provide an username"]
        },
        username: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Please provide a password"]
        }
    }, {timestamps: true})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User