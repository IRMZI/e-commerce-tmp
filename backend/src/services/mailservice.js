import nodemailer from "nodemailer";
import smtpconfig from "../config/smtp.js";
import dotenv from "dotenv";
import { debug, info, error } from "../helpers/logger.js"; // Import logger
dotenv.config();
const transporter = nodemailer.createTransport({
  host: smtpconfig.host,
  port: smtpconfig.port,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
export const sendEmail = async (to, subject, htmlContent, attachmentPath) => {
  try {
    debug(`sendEmail called with to: ${to}, subject: ${subject}`);
    await transporter.sendMail({
      from: `"Cogumelos Campestre" <${smtpconfig.user}>`, // Nome e e-mail do remetente
      to, // Destinatário
      subject, // Assunto do e-mail
      html: htmlContent, // Conteúdo em HTML
      attachments: [
        {
          filename: "E-book-Cogumelos.pdf", // Nome do arquivo no e-mail
          path: attachmentPath, // Caminho do arquivo no sistema
        },
      ],
    });
    info(`Email sent to: ${to}`);
    return { success: true };
  } catch (err) {
    error(`Error sending email to ${to}: ${err.message}`);
    console.error("Erro ao enviar e-mail:", err);
    return { success: false, error: err.message };
  }
};
