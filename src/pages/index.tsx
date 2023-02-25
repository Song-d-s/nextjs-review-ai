import SurveyForm from "@/components/Survey/SurveyForm";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center ">
      {/* Title */}
      <h1 className="mb-6 text-center text-3xl font-bold">OpenReview</h1>
      {/* Content */}
      <div className="w-11/12 max-w-sm rounded-lg p-3 outline outline-1 outline-base-300 drop-shadow-sm">
        <SurveyForm />
      </div>
    </div>
  );
};

export default Home;
