"use server";
import { fetchListData } from "./fetchListData";

export const sendLineMessage = async () => {
  console.log("sendLineMessage");
  const info = await fetchListData();
  const infoLen = info.length;
  console.log(infoLen);

  try {
    const res = await fetch("https://api.line.me/v2/bot/message/broadcast", {
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
    });
    const responseBody = await res.json();
    console.log("Response Body:", responseBody);
  } catch (error: any) {
    console.error("Error:", error.message);
  }
};
