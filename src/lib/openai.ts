import { Configuration, OpenAIApi } from "openai";

export const TIME_LIMIT = 60 * 1000; //

// Initialize the OpenAI API with your API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Define a function to send a request to the OpenAI API
const generateText = async (prompt: string, packet: number) => {
  // Define the parameters for the request
  // Send the request to the OpenAI API
  try {
    // console.log("openai request delivered", packet, "<< Packet Limit");
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.9,
      max_tokens: Number(packet) * 5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: false,
      n: 1,
    });
    // Return the generated text
    const { text } = response.data.choices[0];
    if (!text) {
      throw new Error("No result from OpenAI");
    }
    return text.trim();
  } catch (error: any) {
    console.error("Error in generateText:", error.message);
    console.error(
      "Error details:",
      error.response?.status,
      error.response?.data
    );

    throw error;
  }
};

export default generateText;
