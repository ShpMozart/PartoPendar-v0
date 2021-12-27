const fs = require("fs");
const nodemailer = require("nodemailer");
class Email {
  constructor(text) {
    this.text = text;
  }
  setup() {
    const temp = fs.readFileSync(`${__dirname}/../public/email.html`, "utf-8");
    const output = temp.replace("{%TEXT%}", this.text);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "amirshapoori708@gmail.com",
        pass: "amir1381",
      },
    });
    const mailOptions = {
      from: "amirshapoori708@gmail.com",
      to: "amirshapoori707@yahoo.com",
      subject: "New Ticket!",
      html: output,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}

module.exports = Email;
