const mailer = require("nodemailer");

const mailSend = async (to, subject, text) => {
  const transport = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "khairnarlalit08@gmail.com",
      pass: "fjld jawh wjoh dcqu",
    },
  });
  const mailOptions = {
    to: to,
    from: "khairnarlalit08@gmail.com",
    subject: subject,
    //text:text
    html: `<h1>${text}</h1>`
  };

  await transport.sendMail(mailOptions)

};
module.exports = mailSend