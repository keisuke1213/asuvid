import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function createData(req: NextApiRequest, res: NextApiResponse) {
    
    const prisma = new PrismaClient();
    try {
        const info = await prisma.info.findMany();
        res.status(200).json(info);
    } catch (error: any) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    } finally {
        await prisma.$disconnect();
    }
}

