"use server";
import { InfoType, PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "../../../db";

export const updateInfo = async (formData: FormData) => {
  const infoId = Number(formData.get("id"));
  const data = {
    type: formData.get("type") as InfoType,
    name: formData.get("name") as string,
    content: formData.get("content") as string,
    formUrl: formData.get("formUrl") as string,
    deadline: formData.get("deadline"),
  };
  const dates = formData.getAll("dates") as string[];
  console.log(formData);
  console.log(data.type);
  console.log(dates);
  try {
    await prisma.$transaction(async (tx) => {
      // Infoの更新
      await tx.info.update({
        where: { id: infoId },
        data: data,
      });

      // 既存の日付を削除
      await tx.date.deleteMany({
        where: { infoId: infoId },
      });

      // 新しい日付を追加
      if (dates.length > 0) {
        await tx.date.createMany({
          data: dates.map((date) => ({
            date: date,
            infoId: infoId,
          })),
        });
      }
    });
  } catch (error: any) {
    console.error("Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
  redirect(`/displayInfo/${infoId}`);
};
