export const protectAdmin =async (req, res, next) => {
    try {
        const user = req.user;
        if (!user.role) {
            res.status(404).json({ message: "only admin can access" });
        }
        req.user = user;
        next();
        
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}