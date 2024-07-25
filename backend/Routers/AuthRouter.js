import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { getMe, login ,signUp, logout} from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.get("/me", protectRoute, getMe)
authRouter.post("/signup", signUp)
authRouter.post("/login", login)
authRouter.post("/logout", logout)

export default authRouter;
