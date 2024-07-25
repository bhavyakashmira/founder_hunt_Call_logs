import mongoose from "mongoose";

const ConnectMongoDb = async (req, res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        
    } catch(error){
        console.log("error : ", error);
        process.exit(1);
    }
}

export default ConnectMongoDb;