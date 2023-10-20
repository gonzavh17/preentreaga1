import { Router } from "express";
import messageModel from "../models/message.model.js";
import messageController from "../controllers/messageController.js";

const messageRouter = Router();

messageRouter.get("/", messageController.getMessages);

messageRouter.post("/", messageController.postMessages);

export default messageRouter;