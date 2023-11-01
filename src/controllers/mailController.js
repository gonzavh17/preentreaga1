import nodemailer from "nodemailer";
import "dotenv/config";
import { __dirname } from "../path.js";

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "keyapi22@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
    authMethod: "LOGIN",
  },
});

const sendEmail = async (req, res) => {
  const resultado = await transporter.sendMail({
    from: "TestCoder  keyapi22@gmail.com",
    to: "gonzaasis17@gmail.com",
    subject: "Buenas Noches",
    html: `
        <div>
            <h1>Test Email</h1>
        </div>
        `,

    attachments: [
      {
        filename: "rwb.jpeg",
        path: __dirname + "/public/img/rwb.jpeg",
        cid: "rwb.jpeg",
      },
    ],
  });
  console.log("mail enviado");
  res.send({ message: "Mail enviado", response: resultado });
};

const mailController = { sendEmail };
export default mailController;
