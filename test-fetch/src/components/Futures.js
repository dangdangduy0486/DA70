import React from "react";
import NavBar from "./NavBar";

const Futures = () => {
  return (
    <>
      <NavBar />
      <section className="userBudget">
        <Tabs defaultActiveKey="1" tabPosition="left" className="userBudget">
          <Tabs.TabPane tab="Overview" key="1">
            <Overview />
          </Tabs.TabPane>
          <Tabs.TabPane tab=" Fiat and Spot" key="2" id="fiatspot">
            Content of Tab Pane 2
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<Link to="/userbudget/futures">Futures</Link>}
            key="3"
          >
            <h1>thanhcong</h1>
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

export default Futures;
