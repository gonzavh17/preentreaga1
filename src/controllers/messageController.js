import messageModel from "../models/message.model.js";

const getMessages = async(req, res) => {
    try {
        const message = await messageModel.find();
        res.status(200).send({ resultado: "OK", message: message });
      } catch (error) {
        res.status(400).send({ resultado: "Message not found", message: error });
      }
}

const postMessages = async (req, res) => {
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
}

const messageController = {
    postMessages, 
    getMessages
}

export default messageController