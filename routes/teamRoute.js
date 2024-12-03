import express from "express";
import { getTeamMembersByManager } from "../controllers/teamController.js";
const teamRouter = express.Router();
teamRouter.get("/:manager_id", getTeamMembersByManager);
export default teamRouter;