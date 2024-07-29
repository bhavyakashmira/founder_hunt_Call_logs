import express from "express";
import dotenv from "dotenv";
import ConnectMongoDb from "./db/connectdb.js";
import userRouter from "./Routers/UserRouter.js";
import authRouter from "./Routers/AuthRouter.js";
import queryRouter from "./Routers/UserQuery.js";
import cookieparser from "cookie-parser";
import systemRouter from "./Routers/SystemRouter.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieparser());
const Port = process.env.PORT;
app.use("/api/user", userRouter);
app.use("/api/query", queryRouter);
app.use("/api/auth", authRouter);
app.use("/api/system", systemRouter);

app.get("/", (req, res) => (
       res.send("homepage")
))


app.listen(Port, () => {
    console.log("app listening")
    ConnectMongoDb()
}) 