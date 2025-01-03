"use server";
import nodemailer from "nodemailer";
import { FormState, MailFormSchema } from "../lib/definitions";
import { createSession } from "../lib/sessions";

export const sendMail = async (state: FormState, formData: FormData) => {
  const validatedFields = MailFormSchema.safeParse({
    email: formData.get("email"),
  });

  const mail = process.env.MAIL_ACCOUNT;
  const password = process.env.MAIL_PASSWORD;

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    const { email } = validatedFields.data;
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    const token = await createSession(email, true, expiresAt);
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: mail,
        pass: password,
      },
    });

    const url = `http://localhost:3000/admin/signUp?token=${token}`;

    await transporter.sendMail({
      from: mail,
      to: email,
      subject: "管理者登録フォームの送信",
      text: "以下のリンクから管理者登録をしてください。",
      html: `<p>以下のリンクから管理者登録をしてください。</p>
            <a href='${url}'>管理者登録</a>`,
    });
  } catch (e: any) {
    console.log(e.message);
  }
};
