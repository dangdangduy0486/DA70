import React, { useState } from "react";
import { Tabs, Table, Input, Form, Button, Select } from "antd";
import { FloatButton } from "antd";
import "./TradingToP.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
const TradingToP = () => {
  const [searchName, setSearchName] = useState("");
  const onFinish = (e) => {
    console.log(e);
  };
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
          <Tabs.TabPane tab="Create" key="3" className="tabs_create">
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="I want to Buy" key="1">
                <form className="p-3">
                  <div className="form_buy">
                    <div className="form_buy_swap">
                      <h5>Tai San</h5>
                      <select>
                        <option value="hi">hi</option>
                      </select>
                    </div>
                    <h6 className="form_buy_swap"></h6>
                    <div className="form_buy_swap">
                      <h5>voi Fiat</h5>
                      <select>
                        <option value="hi">hi</option>
                      </select>
                    </div>
                  </div>
                  <hr />
                  <div className="form_buy">
                    <div className="form_buy_text">
                      <p>Gia cua ban</p>
                      <p>1023,555</p>
                    </div>
                    <div className="form_buy_text">
                      <p>Gia cua ban</p>
                      <p>1023,555</p>
                    </div>
                  </div>
                </form>
              </Tabs.TabPane>
              <Tabs.TabPane tab="I want to Sell" key="2">
                <Form
                  className="p-3"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 10,
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item label="Name" name="name">
                    <Input placeholder="name" required></Input>
                  </Form.Item>
                  <Form.Item label="Price" name="price">
                    <Input type="number" placeholder="Price" required></Input>
                  </Form.Item>
                  <Form.Item label="Amount" name="amount">
                    <Input type="number" placeholder="Amount" required></Input>
                  </Form.Item>
                  <Form.Item label="Currency">
                    <Select>
                      <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 10,
                    }}
                  >
                    <Button block type="primary" htmlType="submit">
                      Post
                    </Button>
                  </Form.Item>
                </Form>
              </Tabs.TabPane>
            </Tabs>
            <form></form>
            <FloatButton.BackTop />
          </Tabs.TabPane>
        </Tabs>
      </section>
      <Footer />
    </>
  );
};

export default TradingToP;
