import jwt from "jsonwebtoken";


export const generateTokenandCookie = (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '15d'
        });
        res.cookie("jwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000, 
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'production' 
        });
    } catch (error) {
        console.error("Error generating token or setting cookie:", error);
       
    }
}