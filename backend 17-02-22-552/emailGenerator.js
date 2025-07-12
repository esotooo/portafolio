import nodemailer from 'nodemailer'
// import nodemailer from "nodemailer";

const userGmail = "edwinsotos2003@gmail.com";
const passAppGmail = "mupf ahde zsus imgi";

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: userGmail,
    pass: passAppGmail,
  },
});

// Define a route for sending emails
// Set up email options
const mailOptions = {
  from: userGmail,
  to: userGmail,
  subject: "Test Email 222",
  text: "This is a test email from Node.js!",
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  }
  console.log("Email sent: " + info.response);
});

