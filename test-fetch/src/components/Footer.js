import React from "react";
import "../Css/footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container_footer">
          <div className="footet_left">
            <h5>About us</h5>
            <p>
              It is my website about creating a crypto website. We wish it can
              help you earning money
            </p>
          </div>
          <div className="footet_middle">
            <h5>About coin</h5>
            <Link
              style={{ textDecoration: "none", color: "rgb(178, 174, 174)" }}
              to="/markets"
            >
              Market
            </Link>
            <Link
              style={{ textDecoration: "none", color: "rgb(178, 174, 174)" }}
              to="/converter"
            >
              Converter
            </Link>
          </div>
          <div className="footet_right">
            <h5>Community</h5>
            <Link
              style={{ textDecoration: "none", color: "rgb(178, 174, 174)" }}
              to="/markets"
            >
              Market
            </Link>
            <Link
              style={{ textDecoration: "none", color: "rgb(178, 174, 174)" }}
              to="/converter"
            >
              Converter
            </Link>
          </div>
        </div>
        <div className="copy_right text-center ">@Binance © 2022</div>
      </footer>
    </>
  );
};

export default Footer;
