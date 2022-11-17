import React, { useEffect } from "react";
import "../Css/menuprofile.css";
import profile from "../images/profile.svg";
import info from "../images/infor.svg";
import { Link } from "react-router-dom";
const MenuProfile = () => {
  function handleMenu() {
    let menuHand = document.querySelector(".sub-menu-wrap");
    menuHand.classList.toggle("open-menu");
    console.log(menuHand);
  }
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
          <Link to="/userinfo" className="sub-menu-link">
            <img src={info} alt="" />
            <p>Your information</p>
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
