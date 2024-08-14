"use server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

export const update = async (formData: FormData) => {
  console.log("formData:", formData);
  let redirectRrquested = false;
  const prisma = new PrismaClient();
  try {
    const info = await prisma.info.update({
      where: {
        id: parseInt(formData.get("id") as string),
      },
      data: {
        name: formData.get("name") as string,
        date: new Date(formData.get("date") as string).toISOString(),
        deadline: new Date(formData.get("deadline") as string).toISOString(),
        formUrl: formData.get("formUrl") as string,
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
