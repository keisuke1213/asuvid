import { NextApiRequest, NextApiResponse } from "next";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_API_KEY);
import { InfoType, Status } from "@prisma/client";
import prisma from "../../db";

type Info = {
  title: string;
  deadline: string | null;
  url: string | null;
  content: string;
};

const extractInfo = async (cleanedText: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const prompt = `${cleanedText}この情報の中からタイトル、日時、締め切り、URL、内容を抽出してください。
                  ${cleanedText}の内容をもとに、活動募集か連絡かの分類を判断してください。
                  表示形式は以下の通りです。
                  **分類:** 分類
                  **タイトル:** タイトル
                  **日時:** 日時
                  **締め切り:** 締め切り
                  **内容:** 内容
                  **URL:** URL
                  これは省力しないでください。情報がない場合は空白にしてください。
                    タイトルは名詞にしてください。
                    タイトルは具体的なものにしてください。
                    現在の年は${currentYear}年です。
                    現在の月は${currentMonth}月です。
                    日時、締め切りはiso8601形式で日本のタイムゾーンで出力してください。
                    日時に関しては、時間の取得はしないでください。
                    複数の日程がある場合は空白区切りのみで出力してください。
                    11/20~11/25のような表現がある場合は、間の日程も出力してください。
                    日時が明記されていない場合は、活動日時は出力しないでください。
                    「まで」などの表現がある場合は、締め切りとして出力してください。
                    締め切りは、23:59:59.999までとしてください。
                    締め切りは1つのみ出力してください。
                    活動日時があり、締め切りが推測できない場合は、活動日時の2日前までとしてください。
                    内容は柔らかい文章にして、読みやすいようにしてください。
                    内容は280字以内にしてください。
                    内容の文章に改行を含めないでください。
                    時間が書いてある場合は、必ず内容に含めてください。
                    連絡先が書いてある場合は、内容に含めてください。
                    URLは内容に含めないでください。
                    毎回の出力形式は固定してください。
                    不要な改行はやめてください。
                    `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
  return text;
};

const getParameters = (extractedInfo: string) => {
  const typeMatch = extractedInfo.match(/\*\*分類:\*\*\s*(.*)/);
  const type = typeMatch ? typeMatch[1].trim() : null;

  const titleMatch = extractedInfo.match(/\*\*タイトル:\*\*\s*(.*)/);
  const title = titleMatch ? titleMatch[1].trim() : null;

  const contentMatch = extractedInfo.match(/\*\*内容:\*\*\s*(.*)/);
  const content = contentMatch ? contentMatch[1].trim() : null;

  const dayPattern =
    /\*\*日時:\*\*\s*(\d{4}-\d{2}-\d{2}(?:\d{2}:\d{2}:\d{2})?)(?:[,\s/]*(\d{4}-\d{2}-\d{2}(?:\d{2}:\d{2}:\d{2})?))*\s*/g;
  const dateMatches = extractedInfo
    .match(dayPattern)
    ?.map((date) => date.replace(/\*\*日時:\*\*\s*/, "").trim());

  let dates: string[] = [];
  const pattern = /,\s*|\s+|\/\s*/;
  if (dateMatches) {
    dates = dateMatches[0].split(pattern);
  }

  const parsedDate = dates.map((date) => {
    const dateObj = new Date(date);
    return dateObj.toISOString();
  });

  const deadlinePattern =
    /\*\*締め切り:\*\*\s*(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2})(?:[,\s/]*(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}))*\s*/g;

  const deadlineMatches = extractedInfo
    .match(deadlinePattern)
    ?.map((date) => date.replace(/\*\*締め切り:\*\*\s*/, "").trim());

  let deadline: string | null = null;

  deadlineMatches && deadlineMatches.length > 0
    ? (deadline = deadlineMatches[0])
    : null;

  const urlMatches = extractedInfo.match(/\*\*URL:\*\*\s*(https?:\/\/[^\s]*)/);
  const url = urlMatches ? urlMatches[1].trim() : null;

  return { type, title, content, parsedDate, deadline, url };
};

const createInfo = async (
  infoData: Info,
  status: Status,
  infoType: InfoType
) => {
  const { title, deadline, url, content } = infoData;
  const info = await prisma.info.create({
    data: {
      type: infoType,
      name: title,
      deadline: deadline,
      formUrl: url,
      content: content,
      status: status,
    },
  });
  return info;
};

const createDate = async (dates: string[], infoId: number) => {
  const date = await prisma.date.createMany({
    data: dates.map((date) => {
      return {
        date: date,
        infoId: infoId,
      };
    }),
  });
  return date;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  console.log("req.body", req.body);
  const events = req.body.events;
  console.log("events", events);
  const messageType = events[0].message.type;

  try {
    if (messageType !== "text") {
      throw new Error("Invalid message type");
    }

    const messageText = events[0].message.text;
    const textLength = messageText.length;
    const cleanedText = messageText.replace(/\((.*?)\)/g, "$1");
    const unincludedWord = ["リマインド", "りまいんど", "Times"];

    if (
      textLength < 80 ||
      unincludedWord.some((word) => cleanedText.includes(word))
    ) {
      throw new Error("Invalid text length or content");
    }

    const extractedInfo: string = await extractInfo(cleanedText);
    const { type, title, deadline, url, content, parsedDate } =
      getParameters(extractedInfo);

    const infoData: Info = {
      title: title!,
      deadline: deadline,
      url: url,
      content: content!,
    };

    const status = type === "活動募集" ? Status.RECRUITING : Status.NULL;
    const infoType =
      type === "活動募集" ? InfoType.RECRUITMENT : InfoType.CONTACT;

    const info = await createInfo(infoData, status, infoType);

    await createDate(parsedDate, info.id);
    res.status(200).json({ message: "Event received" });
  } catch (error) {
    console.error("Error processing event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
