import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { redirect } from "next/navigation";


export default async function getInfo(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    const { id } = req.body;
    console.log('id:', id);
    let redirectRequested = false;
    
    try {
        const info = await prisma.info.findUnique({
            where: {
                id: id
            },
            include: {
                dates: true
            }
        })
        res.status(200).json(info);
        if (info) {
          redirectRequested = true;
        }

    } catch (error: any) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    } finally {
        await prisma.$disconnect();
    }
    if (redirectRequested) {
      redirect("/input");
    }
}