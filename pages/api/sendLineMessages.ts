import { fetchListData } from "@/app/serverAction/fetchListData";
import { NextApiResponse } from "next";
import prisma from "../../db";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getInfo = async () => {
  try {
    const info = await fetchListData();
    const infoLen = info.length;
    return { info, infoLen };
  } catch (error) {
    console.error("Error fetching info:", error);
    throw new Error(`Failed to fetch info ${error}`);
  }
};

const calculateElapsedTimeSinceLastSend = async () => {
  try {
    const data = await prisma.deliveryHistory.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!data) return null;
    const now = new Date();
    const elapsedTime = now.getTime() - new Date(data.createdAt).getTime();
    const elapsedDays = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    return elapsedDays;
  } catch (error) {
    console.error("Error calculating elapsed time:", error);
    throw new Error(`Failed to calculate elapsed time ${error}`);
  }
};

const judgeShouldSendMessage = async (infoLen: number) => {
  const elapsedDays = await calculateElapsedTimeSinceLastSend();
  if (elapsedDays === null) return true;

  if (elapsedDays > 21) {
    return infoLen > 1;
  } else if (elapsedDays > 14) {
    return infoLen > 2;
  } else if (elapsedDays > 7) {
    return infoLen > 3;
  } else {
    return false;
  }
};

const cleanTitle = (title: string) => {
  if (title.includes("ボランティア")) {
    return title.replace("ボランティア", "").trim();
  }
};

const saveDeliveryHistory = async () => {
  try {
    await prisma.deliveryHistory.create({
      data: {
        createdAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Error saving delivery history:", error);
    throw new Error(`Failed to save delivery history ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};

export default async (res: NextApiResponse) => {
  try {
    const { info, infoLen } = await getInfo();
    if (infoLen === 0) return;

    const shouldSendMessage = await judgeShouldSendMessage(infoLen);
    if (!shouldSendMessage) return;

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
              text: `📢現在${infoLen}件の募集があります！`,
            },
            {
              type: "flex",
              altText: "現在募集中の情報があります！",
              contents: {
                type: "carousel",
                contents: info.map((item) => {
                  const buttons = [];

                  if (item.formUrl) {
                    buttons.push({
                      type: "button",
                      style: "primary",
                      color: "#00BFA5",
                      action: {
                        type: "uri",
                        label: "募集フォーム",
                        uri: item.formUrl,
                      },
                    });
                  }

                  buttons.push({
                    type: "button",
                    style: "secondary",
                    color: "#B2DFDB",
                    margin: "md",
                    action: {
                      type: "uri",
                      label: "詳細はこちら",
                      uri: `${NEXT_PUBLIC_BASE_URL}/displayInfo/${item.id}`,
                    },
                  });

                  return {
                    type: "bubble",
                    size: "kilo",
                    body: {
                      type: "box",
                      layout: "vertical",
                      spacing: "md",
                      paddingTop: "15px",
                      paddingStart: "20px",
                      paddingEnd: "20px",
                      paddingBottom: "8px",
                      contents: [
                        {
                          type: "text",
                          text: cleanTitle(item.name) || item.name,
                          weight: "bold",
                          size: "lg",
                          align: "center",
                          wrap: true,
                          color: "#333333",
                          margin: "md",
                        },
                        {
                          type: "separator",
                          margin: "md",
                          paddingBottom: "md",
                        },
                        {
                          type: "box",
                          layout: "vertical",
                          spacing: "sm",
                          margin: "md",
                          contents: buttons,
                        },
                      ],
                    },
                    styles: {
                      body: {
                        backgroundColor: "#FAFAFA",
                      },
                    },
                  };
                }),
              },
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send message");
    }
    await saveDeliveryHistory();
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to send message" });
  }
};
