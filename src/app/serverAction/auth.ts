"use server";
import { SignupFormSchema, FormState } from "@/app/lib/definitions";
import prisma from "../../../db";
import { createSession } from "../lib/sessions";
import { redirect } from "next/navigation";
import { deleteSession } from "../lib/sessions";
import bcrypt from "bcrypt";
import { SignInFormSchema } from "@/app/lib/definitions";
import { cookies } from "next/headers";
import { decrypt } from "../lib/sessions";

const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

export const signup = async (state: void | FormState, formData: FormData) => {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    isAdmin: formData.get("admin") === "admin" ? true : false,
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { name, email, password, isAdmin } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  let isRedirect = false;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isAdmin,
      },
    });

    await createSession(user.id.toString(), isAdmin, expiresAt);
    isRedirect = true;
  } catch (error) {
    return console.error(
      "An error occurred while signing up. Please try again later."
    );
  } finally {
    await prisma.$disconnect();
  }
  if (isRedirect) redirect("/");
};

export const signin = async (state: FormState, formData: FormData) => {
  const validatedFields = SignInFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  let isRedirect = false;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const isPasswordValid = await bcrypt.compare(password, user!.password);
    if (!user || !isPasswordValid) {
      return {
        message: "Email or password is incorrect.",
      };
    }
    if (isPasswordValid) {
      isRedirect = true;
    }
    await createSession(user.id.toString(), user.isAdmin, expiresAt);
  } catch (error) {
    return {
      message: "An error occurred while signing in. Please try again later.",
    };
  } finally {
    await prisma.$disconnect();
  }
  if (isRedirect) redirect("/");
};

export const verifyAdminSession = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  let isSessionValid = false;

  if (!session?.userId || !session?.isAdmin) {
    console.log("your session is not valid");
  }

  if (session?.userId && session?.isAdmin) {
    console.log("your session is valid");
    isSessionValid = true;
  }

  return isSessionValid;
};

export const logout = async () => {
  deleteSession();
  redirect("/admin/signIn");
};
