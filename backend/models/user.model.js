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
    
    ram: {
        type: String,
        required: false 
    },
    systemType: {
        type: String,
        required: false 
    },
    hdd: {
        type: String,
        required: false 
    },
    monitorType: {
        type: String,
        required: false 
    },
    brand: {
        type: String,
        required: false 
    },
    monitorSNo: {
        type: String,
        required: false 
    },
    os: {
        type: String,
        required: false 
    },
    msOffice: {
        type: String,
        required: false 
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