import mongoose from "mongoose";

const systemSchema = new mongoose.Schema({
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
    }
}, { timestamps: true });

const System = mongoose.model('System', systemSchema);

export default System
