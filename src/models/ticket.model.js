import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const ticketSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
/*  _ticketId: {
    type: Schema.Types.ObjectId,
    ref: 'tickets',
    required: true
  }, */ 
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
});

ticketSchema.set("timestamps", true); // agrega createdAt, y updateAt para registrar la ultima fecha y hora
const ticketModel = model("tickes", ticketSchema);
export default ticketModel;
