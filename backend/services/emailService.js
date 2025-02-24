import dotenv from "dotenv";
dotenv.config()

// emailService.js
import nodemailer from "nodemailer";


// Create a transporter object using your email service (e.g., Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail or any other service
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});


/**
 * Send an email
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Email body (plain text)
 * @param {string} html - Email body (HTML)
 */


export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email address
      to, // Recipient email address
      subject, // Email subject
      text, // Plain text body
      html, // HTML body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};