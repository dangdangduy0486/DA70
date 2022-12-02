import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import success from "../../images/success.png";
import "./EmailVerify.css";
import Loading from "../loading/loading";
const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const url = "";
  const token = localStorage.getItem("token");
  const opts = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
  useEffect(() => {
    axios.get(url, opts).catch((error) => {
      console.log(error);
      setValidUrl(false);
    });
    setValidUrl(true);
  }, []);

  return (
    <>
      {validUrl ? (
        <div className="container_emailVerify">
          <img src={success} alt="success_img" className="success_img" />
          <h1>Email verified successfully</h1>
          <Link to="/login">
            <button className="green_btn">Login</button>
          </Link>
        </div>
      ) : (
        <Loading error="Something wrong with verify process" />
      )}
    </>
  );
};

export default EmailVerify;
