import React from "react";
import { useLocation } from "react-router-dom";
import UserManagement from "../../components/UserManagement/UserManagement";
import profile from "../../images/profile.svg";
import NavBar from "../../components/NavBar/NavBar";
import "./UserInfo.css";
const UserInfor = () => {
  const location = useLocation();
  const userInfo = location.state.userInfo;

  return (
    <>
      <NavBar />
      <section className="page_userinfo ">
        {userInfo.role === "admin" ? (
          <>
            <UserManagement />
          </>
        ) : (
          <>
            <div className="userinfo_container">
              <div className="card">
                <div className="card-header">
                  <img src={process.env.PUBLIC_URL + profile} alt="" />
                </div>
                <div className="card-body">
                  <h3>{userInfo.fullname}</h3>
                  <form>
                    <div className="user-form">
                      <p className="m-1">Your email</p>
                      <input
                        className="w-100"
                        type="email"
                        value={userInfo.email}
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
          </>
        )}
      </section>
    </>
  );
};

export default UserInfor;
