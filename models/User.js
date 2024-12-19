import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        fullname: String,
        gender: { type: String, enum: ["Male", "Female"] },
        city: { type: String },
        country: { type: String },
        dob: { type: String },
        isProfileCompleted: { type: Boolean }
    },
    { timestamps: true }
)

const User = mongoose.model("Users", userSchema);

export default User;