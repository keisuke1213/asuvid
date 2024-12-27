"use server";
import prisma from "../../../db";
import { redirect } from "next/navigation";

export const deleteInfo = async (id: number) => {
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
