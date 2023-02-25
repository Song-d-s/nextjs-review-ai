import { SurveyFormState } from "@/components/Survey/SurveyForm";

const useQuery = () => {
  const postQuery = async (data: SurveyFormState) => {
    if (!data.menu) {
      throw new Error("menu is required");
    }

    try {
      const requestBody = {
        ...data,
        keyword: data.keyword?.join(),
      };

      const response = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...requestBody }),
      });

      return await response.json();
    } catch (error: any) {
      console.error(`postQuery error: ${error}`);
      throw error;
    }
  };

  return {
    postQuery,
  };
};

export default useQuery;
