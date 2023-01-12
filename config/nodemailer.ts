import nodemailer from "nodemailer";
const email = process.env.EMAILUSER;
const pass = process.env.EMAILPASS;

export const transporter = nodemailer.createTransport({
  host: "smtp.ionos.co.uk",
  port: 587,
  secure: false,
  auth: {
    user: email,
    pass: pass,
  },
});
export const mailOptions = {
  from: email,
  to: process.env.SENTTOEMAIL,
};
