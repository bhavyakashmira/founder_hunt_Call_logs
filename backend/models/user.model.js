import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    empCode: {
        type: Number,
        required: true,
        unique: true
    },
    designation: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    role: {
        type: Boolean,
        required: true
    },
    queries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Query'
        } 
    ]
}, { timestamps:true })

const userModel = mongoose.model("User", userSchema);
export default userModel;