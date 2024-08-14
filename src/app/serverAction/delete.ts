"use server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

export const deleteInfo = async (formData: FormData) => {
  console.log("formData:", formData);
  let redirectRrquested = false;
  const prisma = new PrismaClient();
  try {
    const info = await prisma.info.delete({
      where: {
        id: parseInt(formData.get("id") as string),
      },
    });
    console.log(info);
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