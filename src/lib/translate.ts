import { TranslationServiceClient } from "@google-cloud/translate";

const translationClient = new TranslationServiceClient({
  credentials: {
    type: process.env.GOOGLE_TYPE,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  },
});
// Define the text to be translated and the target language
type Language = "kr" | "en";

const translate = async (text: string, source: Language, target: Language) => {
  const validClient = await translationClient.getSupportedLanguages();

  console.log("check translationClient", validClient);
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
    const [response] = await translationClient.translateText(request);
    const result = response?.translations;
    return result;
  } catch (error) {
    // console.log("** check Credentials", {
    //   type: process.env.GOOGLE_TYPE,
    //   client_id: process.env.GOOGLE_CLIENT_ID,
    //   client_email: process.env.GOOGLE_CLIENT_EMAIL,
    //   private_key: process.env.GOOGLE_PRIVATE_KEY,
    // });
    // console.log(translationClient);
    console.error("** Error translating text:", error);
    throw new Error("Failed to translate text");
  }
};

const koreanToEnglish = async (text: string) => {
  try {
    const result = await translate(text, "kr", "en");
    return result;
  } catch (error) {
    console.error("Error translating Korean to English:", error);
    throw new Error("Failed to translate Korean to English");
  }
};
const englishToKorean = async (text: string) => {
  console.log("inputText", text);

  try {
    const result = await translate(text, "en", "kr");
    return result;
  } catch (error) {
    console.error("Error translating English to Korean:", error);
    throw new Error("Failed to translate English to Korean");
  }
};

export { koreanToEnglish, englishToKorean };
