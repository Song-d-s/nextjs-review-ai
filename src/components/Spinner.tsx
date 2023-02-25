import React from "react";
import { CgSpinner } from "react-icons/cg";

const Spinner: React.FC = () => {
  return (
    <>
      <CgSpinner fontSize="1.5rem" className="animate-spin" />
    </>
  );
};
export default Spinner;
