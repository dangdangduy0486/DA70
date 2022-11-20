import React from "react";
import NavBar from "../components/NavBar";
import "../Css/userInfo.css";
import profile from "../images/profile.svg";
const UserInfor = () => {
  return (
    <>
      {" "}
      <NavBar />
      <section className="page_userinfo">
        <div className="userinfo_container">
          <div className="card">
            <div className="card-header">
              <img src={profile} alt="" />
            </div>
            <div className="card-body">
              <h3>User Name</h3>
              <form>
                <div className="user-form">
                  <p className="m-1">Your email</p>
                  <input
                    className="w-100"
                    type="email"
                    value="Mouse"
                    disabled
                  />
                </div>
                <div className="user-form">
                  <p className="m-1">Your password</p>
                  <input
                    className="w-100"
                    type="password"
                    value="password"
                    disabled
                  />
                </div>
                <div className="user-form">
                  <p className="m-1">Your address</p>
                  <input
                    className="w-100"
                    type="text"
                    placeholder="Enter your address"
                    name="address"
                    id="address"
                  />
                </div>
                <button className="form-submit btn btn-outline-dark mt-2">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserInfor;