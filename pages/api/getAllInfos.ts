import prisma from "../../db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getAllInfos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const info = await prisma.info.findMany({
      include: {
        dates: true,
      },
    });
    console.log(info);
    res.status(200).json(info);
  } catch (error: any) {
    console.error("Error:", error.message);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}
