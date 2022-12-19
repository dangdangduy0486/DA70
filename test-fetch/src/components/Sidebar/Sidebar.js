import React from "react";
import { Space, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShield,
  faUser,
  faWallet,
  faTableList,
  faPowerOff,
  faUserGroup,
  faFileWaveform,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = (props) => {
  const navigation = useNavigate();
  const { role } = useAuth();
  let items = [];
  if (role === "admin") {
    items = [
      {
        label: "Profile",
        key: "/user-info",
        icon: <FontAwesomeIcon icon={faUser} />,
      },
      {
        label: "Secure",
        key: "/forgot",
        icon: <FontAwesomeIcon icon={faShield} />,
      },
      {
        label: "Transactions",
        key: "/transactions ",
        icon: <FontAwesomeIcon icon={faTableList} />,
      },
      {
        label: "Wallet",
        key: "/userbudget",
        icon: <FontAwesomeIcon icon={faWallet} />,
      },
      {
        label: "User Management",
        key: "/admin/userManagement",
        icon: <FontAwesomeIcon icon={faUserGroup} />,
      },
      {
        label: "Request",
        key: "/request",
        icon: <FontAwesomeIcon icon={faFileWaveform} />,
      },
      {
        label: "Logout",
        key: "/logout",
        icon: <FontAwesomeIcon icon={faPowerOff} />,
        danger: true,
      },
    ];
  } else {
    items = [
      {
        label: "Profile",
        key: "/user-info",
        icon: <FontAwesomeIcon icon={faUser} />,
      },
      {
        label: "Secure",
        key: "/forgot",
        icon: <FontAwesomeIcon icon={faShield} />,
      },
      {
        label: "Transactions",
        key: "/transactions ",
        icon: <FontAwesomeIcon icon={faTableList} />,
      },
      {
        label: "Wallet",
        key: "/userbudget",
        icon: <FontAwesomeIcon icon={faWallet} />,
      },
      {
        label: "Logout",
        key: "/logout",
        icon: <FontAwesomeIcon icon={faPowerOff} />,
        danger: true,
      },
    ];
  }

  return (
    <div
    className="offcanvas offcanvas-start"
      data-bs-scroll="true"
      tabindex="-1"
      id="offcanvasWithBothOptions"
      aria-labelledby="offcanvasWithBothOptionsLabel"
    >
      {/* <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
          Backdroped with scrolling
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div> */}
      <div className="offcanvas-body">
        <Menu
          mode="inline"
          onClick={({ key }) => {
            navigation(key);
          }}
          defaultSelectedKeys={[window.location.pathname]}
          items={items}
        ></Menu>
      </div>
    </div>
  );
};
export default Sidebar;
