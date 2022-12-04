import React from "react";
import NavBar from "../components/NavBar";
import "../Css/userBudget.css";
const UserBudget = () => {
  return (
    <>
      <NavBar />
      <section className="userBudget">
        <Tabs defaultActiveKey="1" tabPosition="left" className="userBudget">
          <Tabs.TabPane tab="Overview" key="1">
            <Overview />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Fiat and Spot" key="2" id="fiatspot">
            Content of Tab Pane 2
          </Tabs.TabPane>
          <Tabs.TabPane tab="Futures" key="3">
            Content of Tab Pane 3
          </Tabs.TabPane>
          <Tabs.TabPane tab="Funding" key="4">
            Content of Tab Pane 3
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
