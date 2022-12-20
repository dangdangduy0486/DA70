import React from "react";
import "../Css/Funding.css";
import { Tabs, Table, Input, Form, Button, Select } from "antd";
import { useState } from "react";

import { useGetUserWalletQuery } from "../features/user/userApiSlice";
import Loading from "../pages/Loading/Loading";
import useAuth from "../hooks/useAuth";

const Funding = () => {
  const [searchName, setSearchName] = useState("");

  const { email } = useAuth();
  const { data, error, isLoading } = useGetUserWalletQuery({ email });

  console.log(data);

  if (!data || error || isLoading) return <Loading />;
  return (
    <>
      <section className="container_funding">
        <h1>
          Wallet <span>Funding</span>
        </h1>
        <div className="bg-light container_funding_table p-3">
          <div className="container_estimate_fiat">
            <h5 className="p-3">Estimated Balance</h5>
            <div className="container_amount">
              <div className="container_select">
                <div className="me-2">0.00USDT</div>
              </div>
              <div>= $000.000</div>
            </div>
          </div>
          <div className="table_funding">
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
                  title: "Amount",
                  dataIndex: "amount",
                },
                {
                  title: "Currency",
                  dataIndex: "currency",
                },
              ]}
              dataSource={[
                {
                  key: 1,
                  name: "A name",
                  amount: 2,
                  currency: "USD",
                },
                {
                  key: 2,
                  name: "B name",
                  amount: 2,
                  currency: "USD",
                },
                {
                  key: 3,
                  name: "C name",
                  amount: 2,
                  currency: "USD",
                },
              ]}
            ></Table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Funding;
