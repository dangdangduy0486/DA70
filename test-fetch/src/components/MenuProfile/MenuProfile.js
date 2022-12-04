import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MenuProfile.css";
import profile from "../../images/profile.svg";
import info from "../../images/infor.svg";
import UserInfor from "../../pages/UserInfo/UserInfor";
const MenuProfile = ({ email }) => {
  const [userInfo, setUserInfo] = useState(null);
  function handleMenu() {
    let menuHand = document.querySelector(".sub-menu-wrap");
    menuHand.classList.toggle("open-menu");
  }
  const url = `api/user/user-info/${email}`;
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    const opts = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    axios
      .get(url, opts)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);
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
          <Link to="/user-info" state={{ userInfo }} className="sub-menu-link">
            <img src={info} alt="" />
            <p>{userInfo.fullname}</p>
            <span></span>
          </Link>
          <hr />
          <Link to="/usercart" className="sub-menu-link">
            <img src={info} alt="" />
            <p>Order</p>
            <span></span>
          </Link>
          <hr />
          <Link to="/userbudget" className="sub-menu-link">
            <img src={info} alt="" />
            <p>Wallet</p>
            <span></span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MenuProfile;