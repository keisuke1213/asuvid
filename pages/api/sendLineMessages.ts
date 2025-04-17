import { fetchListData } from "@/app/serverAction/fetchListData";
import { NextApiResponse } from "next";

export default async (res: NextApiResponse) => {
  const info = await fetchListData();
  const infoLen = info.length;

  try {
    const response = await fetch(
      "https://api.line.me/v2/bot/message/broadcast",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          messages: [
            {
              type: "text",
              text: `現在${infoLen}件の活動を募集しています。以下から確認してくださーい！\nhttps://asuvid.vercel.app/`,
            },
          ],
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to send message");
    }
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to send message" });
  }
};
