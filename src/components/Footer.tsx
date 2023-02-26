import React from "react";

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="footer footer-center bg-base-300 p-4 text-base-content">
      <div>
        <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
      </div>
    </footer>
  );
};
export default Footer;
