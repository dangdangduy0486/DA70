import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Tabs } from "antd";
import Overview from "../components/Overview";
import { BankOutlined } from "@ant-design/icons";
import "../Css/userBudget.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Fiat from "../components/Fiat";
import Funding from "../components/Funding";
const UserBudget = () => {
  // const history = useHistory();
  // const handleTabClick = (key) => {
  //   history.push(`/${key}`);
  // };
  return (
    <>
      <NavBar />
      <section className="userBudget">
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          className="userBudget"
          // onChange={handleTabClick}
        >
          <Tabs.TabPane tab="Overview" key="1">
            <Overview />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Fiat and Spot" key="2" id="fiatspot">
            <Fiat />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Futures" key="3">
            Content of Tab Pane 3
          </Tabs.TabPane>
          <Tabs.TabPane tab="Funding" key="4">
            <Funding />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Transaction History" key="5">
            Content of Tab Pane 3
          </Tabs.TabPane>
        </Tabs>
      </section>
      <Footer />
    </>
  );
};

export default UserBudget;
