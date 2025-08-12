import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT||587), secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

export async function sendEmail({ toList, subject, html }:{toList:string[];subject:string;html:string;}) {
  const results = [];
  for (const to of toList) {
    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to, subject, html
    });
    results.push({ to, id: info.messageId });
  }
  return results;
}
