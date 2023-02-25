import { Configuration, OpenAIApi } from "openai";

// Initialize the OpenAI API with your API key
console.log("check key status:", process.env.OPENAI_API_KEY);
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Define a function to send a request to the OpenAI API
const generateText = async (prompt: string) => {
  // Define the parameters for the request
  // Send the request to the OpenAI API
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.9,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log("completion result:", response);
    // Return the generated text
    return response.data.choices[0];
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
