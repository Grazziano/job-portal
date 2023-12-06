import nodemailer from 'nodemailer';

interface EmailRequest {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export const sendEmail = async ({ to, subject, text, html }: EmailRequest) => {
  try {
    const transporter = await nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: 'Jobs Portal',
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
