import { TranslationServiceClient } from "@google-cloud/translate";

const translationClient = new TranslationServiceClient({
  credentials: {
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
  },
});
// Define the text to be translated and the target language
type Language = "ko" | "en";

const translate = async (text: string, source: Language, target: Language) => {
  if (text.length < 1 || Number.isSafeInteger(text)) {
    return text;
  }
  // console.log("** Translating **");

  // Construct the request object
  const request = {
    parent: `projects/${process.env.GOOGLE_PROJECT_ID}/locations/global`,
    contents: [text],
    mimeType: "text/plain",
    sourceLanguageCode: source,
    targetLanguageCode: target,
  };
  // Call the translateText method with the request object
  try {
    // console.log("** Translate Processing 1 **");
    const [response] = await translationClient.translateText(request);
    // console.log("** Translate Processing 2 **");

    const result = response.translations?.[0]?.translatedText;

    // console.log(text, "=>", result);

    return result;
  } catch (error) {
    console.error("** Error translating text:", error);
    throw new Error("Failed to translate text");
  }
};

const koreanToEnglish = async (text: string) => {
  try {
    const result = await translate(text, "ko", "en");
    return result;
  } catch (error) {
    console.error("Error translating Korean to English:", error);
    throw new Error("Failed to translate Korean to English");
  }
};
const englishToKorean = async (text: string) => {
  try {
    const result = await translate(text, "en", "ko");
    return result;
  } catch (error) {
    console.error("Error translating English to Korean:", error);
    throw new Error("Failed to translate English to Korean");
  }
};

export { koreanToEnglish, englishToKorean };
