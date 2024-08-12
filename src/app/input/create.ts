"use server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

export const create = async (formData: FormData) => {
  let redirectRrquested = false;
  console.log(formData);
  const prisma = new PrismaClient();
  try {
    const info = await prisma.info.create({
      data: {
        name: formData.get("name") as string,
        date: new Date(formData.get("date") as string).toISOString(),
        deadline: new Date(formData.get("deadline") as string).toISOString(),
        formUrl: formData.get("formUrl") as string,
      },
    });
    if (info) {
      redirectRrquested = true;
    }
  } catch (error: any) {
    console.error("Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
  if (redirectRrquested) {
    redirect("/");
  }
};
