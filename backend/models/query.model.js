import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
    
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    queryText: {
        type: String,
        required: true
    },
    MajorIssue: {
        type: String,
        required:true
    },
    response: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    closedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    CloserName: {
        type: String, 
    },
    responseTime: {
        type: Number, 
        default: null
    },
    feedback: [
        {
            text: {
                type: String,
                required: true,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        },
    ],
    remark: [
        {
            text: {
                type: String,
                required: true,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        },
    ],
}, { timestamps: true }); 
querySchema.pre('save', function (next) {
    if (this.isModified('response') && this.response) {
        this.responseTime = Date.now() - this.createdAt.getTime();
    }
    next();
});

const queryModel = mongoose.model("Query", querySchema);

export default queryModel;

