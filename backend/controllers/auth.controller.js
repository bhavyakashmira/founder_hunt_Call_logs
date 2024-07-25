import userModel from "../models/user.model.js";
import { generateTokenandCookie } from "../lib/utils/generatecookieandtoken.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
    try {
        const { username, empCode, designation, department, password, role } = req.body;

        const existingUser = await userModel.findOne({ empCode });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password too short" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            username,
            empCode,
            designation,
            department,
            password: hashPassword, 
            role,
        });

        await newUser.save();

        generateTokenandCookie(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            empCode: newUser.empCode,
            username: newUser.username,
            role: newUser.role,
        });

    } catch (error) {
        console.error("Error in signUp function:", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { empCode, password , role } = req.body;
        const user = await userModel.findOne({ empCode });
        const ispassword = await bcrypt.compare(password, user?.password || "")
        if (!user || !ispassword) {
            return res.json({ message: "user/password does not exists" })
        }
        if (user.role != role) {
            return res.json({ message: "you cannot login as an admin" });
        }
        generateTokenandCookie(user._id, res);
        res.status(200).json({
            message:"user logged in"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Invalid user data"
        })
    }
}


export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged Out successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "loggin out error"
        })
    }
}


export const getMe = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log("error in get me controller", error.message);
        res.status(500).json({
            error: "Interal sever error"
        })
    }
}