import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MenuProfile.css";
import profile from "../../images/profile.svg";
import info from "../../images/infor.svg";
import UserInfor from "../../pages/UserInfo/UserInfor";
import { useGetUserQuery } from "../../features/user/userApiSlice";
import Loading from "../../pages/Loading/Loading";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";

const MenuProfile = ({ email }) => {
  function handleMenu() {
    let menuHand = document.querySelector(".sub-menu-wrap");
    menuHand.classList.toggle("open-menu");
  }

  const { data, isLoading, isError } = useGetUserQuery(email);
  const [sendLogout] = useSendLogoutMutation();

  if (!data || isLoading || isError) return <Loading />;

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
          <Link to="/user-info" state={{ data }} className="sub-menu-link">
            <img src={info} alt="" />
            <p>{data.fullname}</p>
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
          <Link style={{ textDecoration: "none" }} to="/">
            <p className="text-danger" onClick={sendLogout}>
              Logout
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MenuProfile;
