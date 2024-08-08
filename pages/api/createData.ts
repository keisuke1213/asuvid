// pages/api/saveData.js
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

function extractSpreadsheetId(url: string) {
  const regex = /\/d\/([a-zA-Z0-9-_]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const prisma = new PrismaClient();

  const { name,date,deadline,formUrl } = req.body;
  console.log(req.body);

  const isoDate = new Date(date).toISOString();
  const isoDeadline = new Date(deadline).toISOString();
 
  try {
    const info =  await prisma.info.create({
      data: {
        name,
        date: isoDate,
        deadline: isoDeadline,
        formUrl,
      },
    });
    res.status(200).json(info);
  } catch (error: any) {
    console.error('Error:', error.message); 
    res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}