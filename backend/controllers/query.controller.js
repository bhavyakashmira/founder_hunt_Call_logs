import userModel from "../models/user.model.js";
import queryModel from "../models/query.model.js";

export const createPost = async (req, res) => {
    try {
        const { queryText, MajorIssue } = req.body;
        const userId = req.user._id.toString();
        const user = await userModel.findById(userId);
        if (!user) return res.json({ message: "user not found" });
        if (!queryText && !MajorIssue) {
            return res.status(400).json({ error: "Query must have some description" });
        }

        const newQuery = new queryModel({
            createdBy:userId ,queryText,MajorIssue
        })

        await newQuery.save();
        res.status(201).json(newQuery);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

export const getAllpost = async (req, res) => {
    try {

        const query = await queryModel.find().sort({ createdAt: -1 }).populate({
            path: "createdBy",
            select :"-password"
        }).populate({
            path: "status"
        })

        if (query.length === 0) {
            return res.status(200).json([]);
        }
        res.status(200).json(query);

    } catch(error){
        console.log("error", error);
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getUsersQuery = async (req, res) =>{
    try {
        const { empCode } = req.params;
        const user = await userModel.findOne({ empCode });
        if (!user) return res.json({ message: "user not found" });
        const query = await queryModel.find({createdBy: user._id}).sort({ createdAt: -1 }).populate({
            path: "createdBy",
            select: "-password"
        }).populate({
            path: "status"
        })

        if (query.length === 0) {
            return res.status(200).json([]);
        }
        res.status(200).json(query);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "inteval server error" });

    }
}

export const deleteAdmin = async (req, res) => {
    try {
        const query = await queryModel.findById(req.params.id);
        if (!query) {
            return res.status(400).json({ error: "query Not found" });
        }
        if (query.createdBy.toString() !== req.user._id.toString()) {
            return res.status(404).json({ error: " Not Authorized" });
        }

        await queryModel.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: "query deleted" })
        
    } catch (error) {
        console.log("Error in delete post controller")
        res.status(500).json({ error: error.message });
    }
}

export const deleteQuery = async (req, res) => {
    try {
        const query = await queryModel.findById(req.params.id);
        if (!query) {
            return res.status(400).json({ error: "query Not found" }); 
        }
        if (query.createdBy.toString() !== req.user._id.toString() && !req.user.role ) {
            return res.status(404).json({ error: " Not Authorized" });
        }
        

        await queryModel.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: "query deleted" })
        
    } catch (error) {
        console.log("Error in delete post controller")
        res.status(500).json({ error: error.message });
    }
}

export const getmyquery = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.json({ message: "user not found" });
        const query = await queryModel.find({ createdBy: user._id }).sort({ createdAt: -1 }).populate({
            path: "createdBy",
            select: "-password"
        }).populate({
            path: "status"
        })

        if (query.length === 0) {
            return res.status(200).json([]);
        }
        res.status(200).json(query);
        
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "inteval server error" });
    }
}


export const addFeedback = async (req, res) => {
    try {
        const { feedback } = req.body;
        const queryId = req.params.id;
        const userId = req.user._id;
       
     
        if (!feedback){
            return res.status(400).json({ error: "Text field is required" });
        }
        const query = await queryModel.findById(queryId);
        
        if (!query) {
            return res.status(404).json({ error: "Query not found" });
        }
        
        if (query.createdBy.toString() !== userId.toString()) {
          
            return res.status(403).json({ error: "Not Authorised" });
        }
        const comment = { user: userId, text:feedback };
        query.feedback.push(comment);
        await query.save();
        res.status(200).json(query);
        
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "inteval server error" });
    }
}

export const updateStatus = async (req, res) => {
    try {
        const queryId = req.params.id;
        const { newStatus } = req.body;
        const validStatuses = ['Pending', 'In Progress', 'Completed'];
        const userId = req.user._id.toString();
        const username = req.user.username;

        if (!validStatuses.includes(newStatus)) {
            return res.status(400).json({ error: "Invalid status value" });
        }
        const updatedQuery = await queryModel.findByIdAndUpdate(
            queryId,
            { status: newStatus, closedBy: userId, CloserName: req.user.username},
            { new: true }
        );
        if (!updatedQuery) {
            return res.status(404).json({ error: "Query not found" });
        }

        res.status(200).json({
            message: "Query status updated successfully",
            query: updatedQuery
        });
    } catch (error) {
        console.error("Error updating query status:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const addremark = async (req, res) => {
    try {
        const { remark } = req.body;
        const queryId = req.params.id;
        const userId = req.user._id;
        if (!remark) {
            return res.status(400).json({ error: "Text field is required" });
        }
        const query = await queryModel.findById(queryId);
        if (!query) {
            return res.status(404).json({ error: "Query not found" });
        }
        const comment = { user: userId, text: remark };
        query.remark.push(comment);
        await query.save();
        res.status(200).json(query);

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "inteval server error" });
    }
}


