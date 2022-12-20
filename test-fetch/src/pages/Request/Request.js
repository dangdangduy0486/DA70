import { Tabs } from "antd";

import NavBar from "../../components/NavBar/NavBar";

import "./Request.css";
import FundingRequest from "./FundingRequest";
import SpotRequest from "./SpotRequest";
const Request = () => {
  return (
    <>
      <NavBar className="mb-4" />
      <div className="container request-title">
        <Tabs defaultActiveKey="1" className="request">
          <Tabs.TabPane tab="Funding" key="1">
            <FundingRequest />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Spot" key="2">
            <SpotRequest />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Transaction History" key="5">
            Content of Tab Pane 3
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default Request;
