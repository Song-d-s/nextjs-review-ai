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
      <h1 className="mb-6 text-center text-3xl font-bold">OpenReview</h1>
      <p>
        openai <div className="badge">davinci-003</div> 모델로 리뷰를
        생성합니다.
      </p>
      {/* Content */}
      <div className="w-11/12 max-w-sm rounded-lg p-3 outline outline-1 outline-base-300 drop-shadow-sm">
        {!page.page ? <SurveyForm /> : <Result />}
      </div>
      <ErrorModal />
      <Footer />
    </div>
  );
};

export default Home;
