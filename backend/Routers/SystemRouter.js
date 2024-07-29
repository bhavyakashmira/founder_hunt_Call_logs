import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { protectAdmin } from "../middlewares/protectAdmin.js";
import { addSystem, deleteSystem, getSystemById, getSystems, updateSystem } from "../controllers/system.controller.js";
const systemRouter = express.Router();

systemRouter.post("/add", protectRoute, protectAdmin, addSystem);
systemRouter.get("/",protectRoute,protectAdmin,  getSystems);
systemRouter.get("/:id",protectRoute,protectAdmin, getSystemById);
systemRouter.put("/:id",protectRoute,protectAdmin, updateSystem);
systemRouter.delete("/:id",protectRoute,protectAdmin, deleteSystem);


export default systemRouter;