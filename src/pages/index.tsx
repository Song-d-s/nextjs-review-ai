import Result from "@/components/Result/Result";
import SurveyForm from "@/components/Survey/SurveyForm";
import { NextPage } from "next";
import ErrorModal from "@/components/Modal/ErrorModal";
import { useRecoilValue } from "recoil";
import { pageState } from "@/atoms/pageAtom";
import Footer from "@/components/Footer";

const Home: NextPage = () => {
  const page = useRecoilValue(pageState);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center ">
      {/* Title */}
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-y-auto">
        <div className="mb-6">
          <h1 className="mb-6 animate-pulse text-center text-3xl font-extrabold">
            OpenReview
          </h1>
          <p className="badge text-xs opacity-80">
            openai davinci-003 모델로 리뷰를 생성합니다.
          </p>
        </div>
        {/* Content */}
        <div className="w-11/12 max-w-sm rounded-lg p-3 outline outline-1 outline-base-300 drop-shadow-sm">
          {!page.page ? <SurveyForm /> : <Result />}
        </div>
      </div>
      <Footer />
      <ErrorModal />
    </div>
  );
};

export default Home;
