require("dotenv").config();
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
OAuth2_client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
})

module.exports = async (email, subject, text) => {
  const accessToken = OAuth2_client.getAccessToken();
  try {
    const transporter = nodemailer.createTransport({
      // host: process.env.HOST,
      service: process.env.SERVICE,
      post: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        type: "OAuth2",
        user: process.env.USER,
        pass: process.env.PASSWORD,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    await transporter.sendMail({
      from: process.env.USER + "ADMIN",
      to: email,
      subject: subject,
      text: text,
    });
    console.log("Email sent Succressfully");
  } catch (error) {
    console.log("Email not sent");
    console.log(error);
  }
};
