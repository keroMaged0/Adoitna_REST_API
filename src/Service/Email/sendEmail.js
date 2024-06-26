import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken';
import { htmlCode } from "./email.template.js";
import { htmlChangePass } from "./chang_password.template.js";


export const sendEmail = async ({ email, type, req }) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.USER_GMAIL,
      pass: process.env.PASSWORD_GMAIL,
    },
  });

  const token = jwt.sign({ email }, process.env.VERIFY_EMAIL_SIGNATURE)
  
  let test = htmlCode({ token: token, req: req })
  if (type == 'forgetPassword') test = htmlChangePass / ({ token: token, req: req })


  const info = await transporter.sendMail({
    from: `"E-commerce App" <${process.env.USER_GMAIL}>`, // sender address
    to: email, // list of receivers
    subject: "can you verify email now", // Subject line
    html: test, // html body

  });

}