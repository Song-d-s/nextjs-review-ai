import { SurveyFormState } from "@/components/Survey/SurveyForm";
import { OpenAIApi } from "openai";

const useQuery = () => {
  const makePrompt = (data: SurveyFormState) => {
    const { menu, type, rating, company, keyword, packet } = data;
    const keywords = keyword?.join();
    const prompt = `Please write a review of the ${menu} in an arrogant and over-decorative tone, as if you are a magazine editor.
    And I hope it is a vivid text that is visually reminiscent. You can also add 3-5 hashtags at the end.
    Here are some details to include:
    - Name of the menu item: ${menu}
    ${type && `- Type of food/beverage (e.g., coffee, noodles, etc.): ${type}`}
    - Overall rating (e.g., out of 5 stars): ${rating} out of 10 stars
    ${keywords && `- Keywords (e.g., savory, sweet, spicy, etc.): ${keywords}`}
    ${company && `- Name of the restaurant or company: ${company}`}

    Please ensure that your review is filled with grandiose language and self-aggrandizing statements, as befits a fashion magazine editor. Thank you!
    `;
    console.log("useQuery Result:", prompt);
    return prompt;
  };

  const postQuery = async (prompt: string) => {
    const response = await fetch("/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorText = await response.text();
      throw new Error(`postQuery error: ${response.status} ${errorText}`);
    }
  };

  return {
    makePrompt,
    postQuery,
  };
};

export default useQuery;
