import prisma from "../../db";
import { subYears } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";

const deleteOldData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const currentDate = new Date();
    const oneYearAgo = subYears(currentDate, 1);

    await prisma.info.deleteMany({
      where: {
        createdAt: {
          lt: oneYearAgo,
        },
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default deleteOldData;
