// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY) {
  console.error("SENDGRID_API_KEY is not set");
}

if (!process.env.SENDGRID_VERIFIED_SENDER) {
  console.error("SENDGRID_VERIFIED_SENDER is not set");
}

type sendEmailType = (
  to: string,
  subject: string,
  text: string,
) => Promise<void>;

export const sendEmail: sendEmailType = async (to, subject, text) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

  const msg = {
    to,
    from: process.env.SENDGRID_VERIFIED_SENDER as string,
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(error);
  }
};
