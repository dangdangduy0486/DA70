import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Css/menuprofile.css";
import profile from "../images/profile.svg";
import info from "../images/infor.svg";
import UserInfor from "../pages/UserInfor";
const MenuProfile = ({ email }) => {
  const [userInfo, setUserInfo] = useState(null);
  function handleMenu() {
    let menuHand = document.querySelector(".sub-menu-wrap");
    menuHand.classList.toggle("open-menu");
  }
  const url = `api/user/user-info/${email}`;
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);
  console.log(userInfo);
  if (!userInfo) return null;
  return (
    <>
      <img className="img_user" src={profile} alt="" onClick={handleMenu}></img>
      <div className="sub-menu-wrap" id="menu-toggle">
        <div className="sub-menu">
          <div className="user-info">
            <img src={profile} alt=""></img>
            <h5>User</h5>
          </div>
          <hr />
          <Link to="/userinfo" state={{ userInfo }} className="sub-menu-link">
            <img src={info} alt="" />
            <p>{userInfo.fullname}</p>
            <span></span>
          </Link>
          <hr />
          <Link to="/usercart" className="sub-menu-link">
            <img src={info} alt="" />
            <p>Your cart</p>
            <span></span>
          </Link>
          <hr />
          <Link to="/userbudget" className="sub-menu-link">
            <img src={info} alt="" />
            <p>Your budget</p>
            <span></span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MenuProfile;
