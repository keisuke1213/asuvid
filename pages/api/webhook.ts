import { NextApiRequest, NextApiResponse } from "next";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_API_KEY);
import { PrismaClient } from "@prisma/client";

type Info = {
  title: string;
  deadline: Date | null;
  url: string | null;
  content: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Received request:", req.method);
  if (req.method === "POST") {
    const events = req.body.events;
    const messageText = events[0].message.text;
    const textLength = messageText.length;
    const cleanedText = messageText.replace(/\((.*?)\)/g, "$1");

    const unincludedWord = ["リマインド", "発表", "りまいんど", "Times"];

    if (
      textLength > 80 &&
      !unincludedWord.some((word) => cleanedText.includes(word))
    ) {
      const extractInfo = async () => {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        console.log("Model loaded");

        const prompt = `${cleanedText}この情報の中からタイトル、日時、締め切り、URL、内容を抽出してください。
                      表示形式は以下の通りです。
                      **タイトル:** タイトル
                      **日時:** 日時
                      **締め切り:** 締め切り
                      **内容:** 内容
                      **URL:** URL
                      これは省力しないでください。情報がない場合は空白にしてください。
                        日時、締め切りはiso8601形式に変換してください。
                        時間の出力は不要です。
                        複数の日程がある場合は空白区切りのみで出力してください。
                        内容は柔らかい文章にしてください。
                        内容の文章に改行を含めないでください。
                        毎回の出力形式は固定してください。
                        不要な改行はやめてください。
                        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        console.log(text);
        return text;
      };
      const extractedInfo: string = await extractInfo();

      const titleMatch = extractedInfo.match(/\*\*タイトル:\*\*\s*(.*)/);
      const title = titleMatch ? titleMatch[1].trim() : null;
      console.log(title);

      const contentMatch = extractedInfo.match(/\*\*内容:\*\*\s*(.*)/);
      const content = contentMatch ? contentMatch[1].trim() : null;
      console.log(content);

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
      const updatedDate = dates.map((date) => {
        const dateObj = new Date(date);
        dateObj.setFullYear(dateObj.getFullYear() + 1);
        return dateObj.toISOString();
      });
      console.log(updatedDate);

      const deadlinePattern =
        /\*\*締め切り:\*\*\s*(\d{4}-\d{2}-\d{2}(?:\d{2}:\d{2}:\d{2})?)(?:[,\s/]*(\d{4}-\d{2}-\d{2}(?:\d{2}:\d{2}:\d{2})?))*\s*/g;
      const deadlineMatches = extractedInfo
        .match(deadlinePattern)
        ?.map((date) => date.replace(/\*\*締め切り:\*\*\s*/, "").trim());

      const updateDeadline = deadlineMatches?.map((date) => {
        const dateObj = new Date(date);
        dateObj.setFullYear(dateObj.getFullYear() + 1);
        return dateObj.toISOString();
      });
      const deadline =
        updateDeadline && updateDeadline.length > 0
          ? new Date(updateDeadline[0])
          : null;
      console.log(deadline);

      const urlMatches = extractedInfo.match(
        /\*\*URL:\*\*\s*(https?:\/\/[^\s]*form[^\s]*)/
      );
      const url = urlMatches ? urlMatches[1].trim() : null;
      console.log(url);

      const infoData = {
        title: title!,
        deadline: deadline,
        url: url,
        content: content!,
      };

      const prisma = new PrismaClient();
      const createInfo = async (infoData: Info) => {
        const { title, deadline, url, content } = infoData;
        const info = await prisma.info.create({
          data: {
            name: title,
            deadline: deadline,
            formUrl: url,
            content: content,
          },
        });
        return info;
      };
      const info = await createInfo(infoData);

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
      const date = await createDate(updatedDate, info.id);
    }
    res.status(200).json({ message: "Event received" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};