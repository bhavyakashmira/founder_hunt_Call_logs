import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { protectAdmin } from "../middlewares/protectAdmin.js";
import { getUser ,getUserName ,getAllUser,delUser , updateUser} from "../controllers/user.controller.js";

const userRouter = express.Router();
userRouter.get("/all" , protectRoute,protectAdmin ,getAllUser);
userRouter.get("/:empCode", protectRoute, protectAdmin, getUser);
userRouter.get("/users/:username", protectRoute, protectAdmin, getUserName);
userRouter.delete("/:empCode", protectRoute, protectAdmin, delUser);
userRouter.post("/modify/:id", protectRoute, protectAdmin, updateUser);



export default userRouter;