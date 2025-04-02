import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a transporter object using Mailjet's SMTP server
const transporter = nodemailer.createTransport({
  host: 'in-v3.mailjet.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILJET_API_KEY,
    pass: process.env.MAILJET_API_SECRET,
  },
});

// Function to send email
export const sendEmail = async ({ to, subject, message }) => {
  try {
    const info = await transporter.sendMail({
      from: 'stickermarket9@gmail.com',
      to,
      subject,
      text: message,
      html: `<p>${message}</p>`,
    });

    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
