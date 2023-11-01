import ticketModel from "../models/ticket.model.js";
import { v4 as uuidv4 } from 'uuid';

const getTickets = async (req, res) => {
  try {
    const findTicket = await ticketModel.find();

    res.status(200).send({ response: findTicket });
  } catch (error) {
    res.status(500).send({ message: `Error al consultar ticket ${error}` });
  }
};

const createTicket = async (req, res) => {
  const { amount, email } = req.body;
  try {
    const ticket = {
        code: uuidv4(),
        amount: amount,
        purchaser: email,
    };
    await ticketModel.create(ticket);
    const generatedTicket = await ticketModel.findOne({ code: ticket.code });
    res
      .status(201)
      .send({
        response: "Ticket generado exitosamente",
        message: generatedTicket,
      });
  } catch (error) {
    res.status(500).send({ message: `Error al crear ticket ${error}` });
  }
};

const ticketController = { createTicket, getTickets };
export default ticketController
