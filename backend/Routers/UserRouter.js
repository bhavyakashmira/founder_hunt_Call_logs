import express from "express";
const userRouter = express.Router();
userRouter.post("/login");
userRouter.get("/logout");


export default userRouter;