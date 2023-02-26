import generateText from "@/lib/openai";
import makePrompt from "@/lib/prompt";
import { englishToKorean, koreanToEnglish } from "@/lib/translate";
import type { NextApiRequest, NextApiResponse } from "next";

interface TranslatableObject {
  [key: string]: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const body: TranslatableObject = req.body;
    // console.log("* INCOMING DATA:", body);

    const translatedObj = await translateObject(body);
    // console.log("* Translated Obj", translatedObj);

    const prompt = makePrompt(translatedObj);
    // console.log("* Prompt:", prompt);

    const result = await generateText(prompt, body.packet);
    // console.log("* Generated Result:", result);

    const translatedResult = await englishToKorean(result);
    // console.log("* Translated Result:", translatedResult);

    return res.status(200).json({ result: translatedResult });
  } catch (error: any) {
    console.error("Error in API handler:", error);
    return res.status(500).json({ error: error.message });
  }
}

async function translateObject(
  obj: TranslatableObject
): Promise<TranslatableObject> {
  const translatedObject: TranslatableObject = {};

  for (const key in obj) {
    if (typeof obj[key] === "string" && key !== "company") {
      translatedObject[key] = await koreanToEnglish(obj[key] as string);
    } else {
      translatedObject[key] = obj[key];
    }
  }

  return translatedObject;
}
