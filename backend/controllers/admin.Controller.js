import userModel from "../models/user.model.js";
import queryModel from "../models/query.model.js";



export const getAllpost = async (req, res) => {
    try {

        const query = await queryModel.find().sort({ createdAt: -1 }).populate({
            path: "createdBy",
            select: "-password"
        }).populate({
            path: "status"
        })

        if (query.length === 0) {
            return res.status(200).json([]);
        }
        res.status(200).json(query);

    } catch {
        console.log("error", error);
        res.status(500).json({ error: "Internal server error" })
    }
}