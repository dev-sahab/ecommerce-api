import nodemailer from "nodemailer";

export const sendMail = ({ to, sub, msg }) => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  transport.sendMail({
    from: `Wolmart <${process.env.MAIL_USER}>`,
    to: to,
    subject: sub,
    text: msg,
  });
};
