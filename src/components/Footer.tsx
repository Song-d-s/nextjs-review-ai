import React from "react";
import { BsGithub } from "react-icons/bs";

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="footer footer-center bg-base-300 p-4 text-base-content">
      <div>
        <a href="https://github.com/Song-d-s/nextjs-review-ai">
          <BsGithub className="text-lg" />
        </a>
      </div>
    </footer>
  );
};
export default Footer;
