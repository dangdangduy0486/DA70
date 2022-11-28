import React, { useState } from "react";
import { Tabs, Table, Input } from "antd";
import { FloatButton } from "antd";
import "../Css/trading.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
const TradingToP = () => {
  const [searchName, setSearchName] = useState("");
  return (
    <>
      <NavBar />
      <section className="tradingtopeople bg-light p-2">
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Buy" key="1">
            <Input.Search
              placeholder="Enter name of coin"
              onSearch={(value) => {
                setSearchName(value);
              }}
              onChange={(e) => {
                setSearchName(e.target.value);
              }}
            />
            <Table
              className="table-striped-rows"
              columns={[
                {
                  title: "Name",
                  dataIndex: "name",
                  filteredValue: [searchName],
                  onFilter: (value, record) => {
                    return String(record.name)
                      .toLowerCase()
                      .includes(value.toLowerCase());
                  },
                },
                {
                  title: "Price",
                  dataIndex: "price",
                },
                {
                  title: "Amount",
                  dataIndex: "amount",
                },
                {
                  title: "Currency",
                  dataIndex: "currency",
                },
                {
                  title: "Action",
                  dataIndex: "action",
                },
              ]}
              dataSource={[
                {
                  key: 1,
                  name: "A name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: (
                    <button className="btn btn-primary mx-auto  ">Buy</button>
                  ),
                },
                {
                  key: 2,
                  name: "B name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Buy</button>,
                },
                {
                  key: 3,
                  name: "C name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Buy</button>,
                },
                {
                  key: 4,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Buy</button>,
                },
                {
                  key: 5,
                  name: "E name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Buy</button>,
                },
                {
                  key: 6,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Buy</button>,
                },
                {
                  key: 7,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Buy</button>,
                },
                {
                  key: 8,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Buy</button>,
                },
              ]}
            ></Table>
            <FloatButton.BackTop />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Sell" key="2">
            <Input.Search
              placeholder="Enter name of coin"
              onSearch={(value) => {
                setSearchName(value);
              }}
              onChange={(e) => {
                setSearchName(e.target.value);
              }}
            />
            <Table
              className="table-striped-rows"
              columns={[
                {
                  title: "Name",
                  dataIndex: "name",
                  filteredValue: [searchName],
                  onFilter: (value, record) => {
                    return String(record.name)
                      .toLowerCase()
                      .includes(value.toLowerCase());
                  },
                },
                {
                  title: "Price",
                  dataIndex: "price",
                },
                {
                  title: "Amount",
                  dataIndex: "amount",
                },
                {
                  title: "Currency",
                  dataIndex: "currency",
                },
                {
                  title: "Action",
                  dataIndex: "action",
                },
              ]}
              dataSource={[
                {
                  key: 1,
                  name: "A name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: (
                    <button className="btn btn-primary mx-auto  ">Sell</button>
                  ),
                },
                {
                  key: 2,
                  name: "B name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 3,
                  name: "C name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 4,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 5,
                  name: "E name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 6,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 7,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 8,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 9,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 10,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 10,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 10,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 10,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
              ]}
            ></Table>
            <FloatButton.BackTop />
          </Tabs.TabPane>
        </Tabs>
      </section>
      <Footer />
    </>
  );
};

export default TradingToP;
