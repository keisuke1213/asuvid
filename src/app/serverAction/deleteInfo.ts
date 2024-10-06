"use server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

export const deleteInfo = async (id: number) => {
  const prisma = new PrismaClient();

  try {
    await prisma.info.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    console.error(e);
  }
  await prisma.$disconnect();
  redirect("/");
};
