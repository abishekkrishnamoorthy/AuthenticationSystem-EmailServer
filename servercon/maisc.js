var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "",
      pass: "",
    },
  });

module.exports=transporter
