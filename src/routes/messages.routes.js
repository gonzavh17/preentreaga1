import { Router } from "express";
import messageModel from "../models/message.model.js";

const messageRouter = Router();

messageRouter.get("/", async (req, res) => {
  try {
    const message = await messageModel.find();
    res.status(200).send({ resultado: "OK", message: message });
  } catch (error) {
    res.status(400).send({ resultado: "Message not found", message: error });
  }
});

messageRouter.post("/", async (req, res) => {
  const { email, message } = req.body;
  try {
    const respuesta = await messageModel.create({
      email,
      message,
    });
    res.status(200).send({ resultado: "OK", message: respuesta });
  } catch (error) {
    res
      .status(400)
      .send({ resultado: "Error al consultar mensaje", message: error });
  }
});

export default messageRouter;