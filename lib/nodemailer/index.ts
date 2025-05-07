"use server";

import nodemailer from "nodemailer";
import { EmailContent, EmailProductInfo, NotificationType } from "@/types";

const Notification = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
  LOWEST_PRICE: "LOWEST_PRICE",
  THRESHOLD_MET: "THRESHOLD_MET",
};

export async function generateEmailBody(
  product: EmailProductInfo,
  type: NotificationType
) {
  const THRESHOLD_PERCENTAGE = 40;
  const shortenedTitle =
    product.title.length > 20
      ? `${product.title.substring(0, 20)}...`
      : product.title;

  let subject = "";
  let body = "";

  switch (type) {
    case Notification.WELCOME:
      subject = `Welcome to Price Tracking for ${shortenedTitle}`;
      body = `
        <div>
          <h2>Welcome to DealDynamo 🚀</h2>
          <p>You are now tracking ${product.title}.</p>
          <p>Here's an example of how you'll receive updates:</p>
          <div style="border: 1px solid #ccc; padding: 10px; background-color: #f8f8f8;">
            <h3>${product.title} is back in stock!</h3>
            <p>Don't miss out - <a href="${product.url}" target="_blank">buy it now</a>!</p>
            <img src="https://i.ibb.co/pwFBRMC/Screenshot-2023-09-26-at-1-47-50-AM.png" alt="Product" style="max-width: 100%;" />
          </div>
        </div>
      `;
      break;

    case Notification.CHANGE_OF_STOCK:
      subject = `${shortenedTitle} is now back in stock!`;
      body = `<h4>Hey, ${product.title} is now restocked! <a href="${product.url}" target="_blank">Grab yours</a>.</h4>`;
      break;

    case Notification.LOWEST_PRICE:
      subject = `Lowest Price Alert for ${shortenedTitle}`;
      body = `<h4>${product.title} hit its lowest price! <a href="${product.url}" target="_blank">Get it now</a>.</h4>`;
      break;

    case Notification.THRESHOLD_MET:
      subject = `Discount Alert: ${shortenedTitle} > ${THRESHOLD_PERCENTAGE}% off`;
      body = `<h4>${product.title} is over ${THRESHOLD_PERCENTAGE}% off! <a href="${product.url}" target="_blank">Buy here</a>.</h4>`;
      break;

    default:
      throw new Error("Invalid notification type.");
  }

  return { subject, body };
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_USERNAME,
    pass: process.env.PASSWORD,
  },
});

export const sendEmail = async (
  emailContent: EmailContent,
  sendTo: string[]
) => {
  const mailOptions = {
    from: process.env.SENDER_USERNAME,
    to: sendTo,
    subject: emailContent.subject,
    html: emailContent.body,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
