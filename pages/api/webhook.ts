import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const events = req.body.events;
    console.log(events);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
