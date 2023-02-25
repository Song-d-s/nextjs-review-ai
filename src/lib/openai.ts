import { Configuration, OpenAIApi } from "openai";

// Initialize the OpenAI API with your API key
console.log("check key status:", process.env.OPENAI_API_KEY);
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Define a function to send a request to the OpenAI API
const generateText = async (prompt: string, packet: number) => {
  // Define the parameters for the request
  // Send the request to the OpenAI API
  try {
    console.log("openai request delivered", packet, "<< Packet Limit");
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: Number(packet),
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    // Return the generated text
    const { text } = response.data.choices[0];
    if (!text) {
      throw new Error("NO result on openai");
    }
    return text.trim();
  } catch (error: any) {
    console.log("generateText Error");
    if (error.response) {
      console.log("-", error.response.status);
      console.log("-", error.response.data);
    } else {
      console.log("-", error.message);
    }
  }
};

export default generateText;
