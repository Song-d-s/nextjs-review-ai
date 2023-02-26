import { errorState } from "@/atoms/errorAtom";
import React from "react";
import { GoAlert } from "react-icons/go";
import { useRecoilState } from "recoil";
import Spinner from "../Spinner";

type ErrorModalProps = {};

const ErrorModal: React.FC<ErrorModalProps> = () => {
  const [error, setError] = useRecoilState(errorState);

  return (
    <>
      <div
        className={`${error.message && "modal-open"} modal`}
        onClick={() => {
          setError({ message: "" });
        }}
      >
        <div className="modal-box flex w-10/12 max-w-md flex-col items-center justify-center gap-2">
          {error.message ? (
            <>
              <GoAlert size="2rem" />
              <p className="py-2 text-center">{error.message}</p>
              {/* {error.message === "천천히 시도해주세요." && (
                <p className="text-xs">
                  남은 시간 :{" "}
                  {60 -
                    Math.floor(
                      (Date.now() - parseInt(localStorage.timer)) / 1000
                    )}
                  초
                </p>
              )} */}
            </>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </>
  );
};
export default ErrorModal;
