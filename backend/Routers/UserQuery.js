import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { createPost, getAllpost, getUsersQuery, updateStatus , addFeedback,addremark,  getmyquery , deleteQuery ,deleteAdmin } from "../controllers/query.controller.js";
import { protectAdmin } from "../middlewares/protectAdmin.js";

const queryRouter = express.Router();

queryRouter.post("/create", protectRoute, createPost);
queryRouter.get("/all", protectRoute,protectAdmin, getAllpost);
queryRouter.get("/user/:empCode", protectRoute, protectAdmin, getUsersQuery);
queryRouter.get("/myquery", protectRoute, getmyquery)
queryRouter.delete("/delete/:id", protectRoute, deleteQuery);
queryRouter.delete("/delete/admin/:id", protectAdmin, deleteAdmin);
queryRouter.post("/feedback/:id", protectRoute, addFeedback);
queryRouter.post("/remark/:id", protectRoute, protectAdmin, addremark);
queryRouter.post("/updatestatus/:id", protectRoute, protectAdmin, updateStatus);

export default queryRouter;