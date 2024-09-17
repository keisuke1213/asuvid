import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function getInfo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const { id } = req.body;
  console.log("id:", id);


  try {
    const info = await prisma.info.findMany({
      orderBy: [
        {
            id: "desc"
        }
      ],
      where: {
        OR: [
            {status: "RECRUITING"},
            {status: "DEADLINE_APPROACHING"}
        ]
      },
      include: {
        dates: true,
      },
    });

    info.sort((a, b) => {
      if (
        a.status === "DEADLINE_APPROACHING" &&
        b.status !== "DEADLINE_APPROACHING"
      ) {
        return -1;
      }
      if (
        a.status !== "DEADLINE_APPROACHING" &&
        b.status === "DEADLINE_APPROACHING"
      ) {
        return 1;
      }
        return 0;
    });
    res.status(200).json(info);
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
