import userModel from "../models/user.model.js";

export const getUser = async (req, res) => {
    
    try {

        const { empCode } = req.params;
        const user = await userModel.findOne({ empCode }).select("-password");
        if (!user) {
            return res.json({ message: "No such user" })
        }
        res.status(200).json(user)
        
    } catch (error) {
        console.log("error in get user profile")
        res.status(500).json({ error: error.message })

    }

}

export const updateUser = async (req, res) => {
    const { designation, department, currentPassword, newPassword, role, ram, systemType, hdd, monitorType, brand, monitorSNo, os, msOffice } = req.body;
    const userId = req.params.id;
    try {
        let user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
            return res.status(400).json({ error: "Please provide both current password and new password" });
        }

        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });
            if (newPassword.length < 6) {
                return res.status(400).json({ error: "Password must be at least 6 characters long" });
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        if (designation) user.designation = designation;
        if (department) user.department = department;
        if (role !== undefined) user.role = role;
        if (ram) user.ram = ram;
        if (systemType) user.systemType = systemType;
        if (hdd) user.hdd = hdd;
        if (monitorType) user.monitorType = monitorType;
        if (brand) user.brand = brand;
        if (monitorSNo) user.monitorSNo = monitorSNo;
        if (os) user.os = os;
        if (msOffice) user.msOffice = msOffice;
        user = await user.save();
        user.password = undefined; 
        return res.status(200).json(user);
    } catch (error) {
        console.log("Error in updateUser: ", error.message);
        res.status(500).json({ error: error.message });
    }
}


export const getUserName = async (req, res) => {

    try {

        const { username } = req.params;
        
        const user = await userModel.findOne({ username }).select("-password");
        if (!user) {
            return res.json({ message: "No such user" })
        }
        res.status(200).json(user)

    } catch (error) {
        console.log("error in getting user profile")
        res.status(500).json({ error: error.message })
    }

}
export const getAllUser = async (req, res) => {
    try {
        const users = await userModel.find().sort({ empCode: -1 }).select("-password");
        if (users.length == 0) {
            return res.json({ message: "NO user" });
        }
        res.status(200).json(users)
    } catch (error) {
        console.log("error in getting all users")
        res.status(500).json({ error: error.message })
    }
}
export const delUser = async (req, res) => {
    try {
        const empCode = req.params.empCode;
        const user = await userModel.findOne({empCode});
        if (!user) {
            return res.json({ message:"no such user" });
        }
        const userID = user._id;
        await userModel.findByIdAndDelete(userID);
        return res.status(200).json({ message: "user deleted" });
        
    } catch (error) {
        console.log("error in getting user profile")
        res.status(500).json({ error: error.message })
    }
}

