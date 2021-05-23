export default function (req, res) {
  if (req.method === "POST") {
    const nodemailer = require("nodemailer");
    const { from, to, subject, message } = JSON.parse(req.body);
    const mailData = {
      from: from,
      to: to,
      subject: subject,
      text: message,
    };
    let transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.SMTP_MAILTRAP_USER, // put your Mailtrap User in env local
        pass: process.env.SMTP_MAILTRAP_PASS, // put your Mailtrap pass in env local
      },
    });
    transport.sendMail(mailData, (err, info) => {
      if (err) {
        console.log(err);
      }
      console.log(info);
    });
    res.status(200);
  } else {
    res.status(405).end("Method not allowed");
  }
}
