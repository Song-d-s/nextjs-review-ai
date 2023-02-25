import generateText from "@/lib/openai";
import { englishToKorean } from "@/lib/translate";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt } = req.body;
  try {
    // const result = await generateText(body);
    const result = prompt;
    console.log("API received result:", result);
    const translated = await englishToKorean("* Query Delivered *");
    console.log("API received translated", translated);
    return res.status(200).json({ result: result, translated: translated });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
